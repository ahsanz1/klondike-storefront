/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useState } from 'react'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
import './style.scss'
import { useNavigate } from '@reach/router'

import {
  Radio,
  Button,
  Input,
  Modal,
  // Result,
  Row,
  Col,
  Divider,
  List,
  Tooltip,
  // Typography,
} from 'antd'
import {
  addShippingWithLineItems,
  addPickupAndShippingWithLineItems,
  getCartByUserId,
} from 'libs/services/api/cart'
import { AppContext } from 'libs/context'
import {
  getAllShippingMethods,
  createShipTo,
  checkout,
  // retreivePickupPoints,
  getPickupPoints,
} from 'libs/services/api/checkout'
import LinkIcon from 'components/atoms/link-icon'
import Axios from 'axios'
import ENDPOINTS from 'libs/services/endpoints'
import { apiDomain } from 'libs/general-config'
import HEADERS from 'libs/services/axios/headers'
// import { LeftOutlined } from '@ant-design/icons'
// import AccordionComponent from 'components/molecules/accordionComponent'
// import { Link } from 'react-router-dom'

const Checkoutsection = () => {
  // let cart
  const {
    user,
    personalInfo,
    creditLimit,
    setCheckoutData,
    setGetCartItemsState,
    getCartItems,
  } = useContext(AppContext)
  console.log('user', user)
  console.log('personalInfo', personalInfo)
  console.log('getcartitems', getCartItems)
  const navigate = useNavigate()
  const [size] = useWindowSize()

  // const { checkData } = checkoutData
  const [cartPayload, setCartPayloadState] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false)
  // const [cartId] = useState('617fb67c3d8494000801e3f0')
  // const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [delivery, setDelivery] = useState(true)
  // const [value, setValue] = useState(1)
  let zipCode = 'R3G 2T3'
  const [poNumber, setPONumber] = useState(zipCode)
  const [isCartLoading, setIsCartLoading] = useState(true)
  console.log({ cartPayload })
  const [inputField, setInputField] = useState(false)
  const [cartItemIds, setCartItemIds] = useState([])
  const [validatePO, setValidatePO] = useState(false)
  const [availablePickupLocations, setAvaiablePickupLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState({})
  const [tooltipVisible, setTooltipVisible] = useState(false)
  console.log({ cartItemIds })
  const [shippingDetails, setShippingDetails] = useState({})
  // console.log({ availableLocations })
  let freeShippingAmount = 900
  let freeShippingQuantity = 500

  const address = {
    street1: '1510 Wall Street NW ',
    city: 'Winnipeg',
    state: 'MB',
    country: 'Canada',
    zipCode: poNumber,
    // zipCode: 'R3G 2T3',
    kind: 'shipping',
    name: {
      first: personalInfo?.firstName,
      last: personalInfo?.lastName,
    },
    email: personalInfo?.email,
    phone: {
      number: '844-883-4645',
      kind: 'Mobile',
    },
  }

  const secondtext = (
    <div className="toltip-container">
      <h1>Error!</h1>
      <p>
        Pickup orders have a $500 minimum requirement. You need to meet this
        requirement in order to place order as Pickup.
      </p>{' '}
    </div>
  )

  const getCart = async () => {
    if (user !== null) {
      console.log('token', user?.accessToken)
      let res = await getCartByUserId(user?.accessToken)
      console.log('responsefromcart', res)
      if (res && res?.data && !res?.error) {
        let data = {
          ...res?.data,
          itemsTotal: res?.data?.totalAmount?.amount,
          currency: res?.data?.totalAmount?.currency,
        }
        let tempArr = getCartItemIds(res?.data?.items)
        await setCartItemIds(tempArr)
        await setCartPayloadState(data)
        let availableLocations = []
        for (var i = 0; i < tempArr?.length; i++) {
          let resp = await getPickupPoints(tempArr[i]?.itemId)
          let locations = resp?.data?.locations
          console.log({ locations })
          availableLocations.push(...locations)
        }
        console.log(availableLocations, 'filter')
        const result = []
        const map = new Map()
        for (const item of availableLocations) {
          if (!map.has(item._id)) {
            map.set(item._id, true) // set any value to Map
            result.push(item)
          }
        }
        console.log(result, 'filtered')
        await setAvaiablePickupLocations(result)
        setIsCartLoading(false)
      } else navigate('/category')
    }
  }

  const getCartItemIds = (items = []) => {
    let newArr = []
    items?.length &&
      items?.map(item => {
        newArr.push({
          itemId: item?.itemId,
        })
      })
    console.log({ newArr })
    return newArr
  }

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      getCart()
    } else {
      navigate('/account/login')
    }
  }, [])

  useEffect(() => {
    if (!isCartLoading) {
      retreiveShippingMethods()
    }
  }, [isCartLoading])

  const mapItemsWithShipping = async shipToId => {
    let data = []
    await cartPayload?.items?.map((item, i) => {
      data.push({
        itemId: item?.itemId,
        lineItemId: item?.lineItemId,
        shipToId: shipToId,
      })
    })
    console.log('dataaa', data)
    let res

    res = await addShippingWithLineItems(cartPayload?._id, data)
    console.log('line items res', res)
    return res
  }

  const mapItemsWithPickUpandShipping = async shipMethodId => {
    let req = {
      shipToType: delivery ? 'BOPIS' : 'STORE_PICKUP',
      shipMethod: shipMethodId,
      taxCode: 'FR020000',
      warehouseId: selectedLocation?._id,
      isPickup: true,
      pickupPerson: {
        name: {
          first: personalInfo?.firstName,
          last: personalInfo?.lastName,
        },
        email: personalInfo?.email,
        phone: {
          number: address?.phone?.number,
          kind: 'Mobile',
        },
      },
      altPickupPerson: {
        name: {
          first: 'Yousaf',
          last: 'Khan',
        },
        email: 'yousaf.khan@shopdev.co',
        phone: {
          number: '8087769338',
          kind: 'Mobile',
        },
      },
    }
    let response = await addPickupAndShippingWithLineItems(
      cartPayload?._id,
      req,
    )
    console.log({ response })
    return response
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const getItemsTaxes = async items => {
    console.log({ items })
    let newArray = []
    await items?.map((item, i) => {
      newArray.push({
        lineItemId: item?.lineItemId,
        amount: 0,
      })
    })
    return newArray
  }

  const getShipToTaxes = async items => {
    let newArray = []
    await items?.map((item, i) => {
      newArray.push({
        shipToId: item?.shipTo?._id,
        amount: 0,
      })
    })
    return newArray
  }

  const attachInvoiceURL = async (cart = {}) => {
    const { _id } = cart
    try {
      const response = await Axios.get(
        `${apiDomain}${ENDPOINTS.GET.getAllOrderLevelAttributes}`,
        {
          headers: HEADERS.common,
        },
      )
      const { attributes = [] } = response.data
      const invoiceURLattribute = attributes.find(
        attr => attr.name.toLowerCase().trim() === 'invoice url',
      )
      if (invoiceURLattribute) {
        const payload = {
          attributeId: invoiceURLattribute._id,
          attributeValue:
            'https://www.clickdimensions.com/links/TestPDFfile.pdf',
        }

        try {
          const response = await Axios.patch(
            `${apiDomain}${ENDPOINTS.PATCH.addAttributeToCart(_id)}`,
            [payload],
            {
              headers: {
                ...HEADERS.common,
                Authorization: user.accessToken || '',
              },
            },
          )
          if (response.data) {
            console.log('Invoice URL added to cart successfully', response)
          }
        } catch (error) {
          console.log('Failed to add Invoice URL to cart', error)
        }
      } else throw new Error('Invoice URL attribute not found')
    } catch (error) {
      console.log('Failed to fetch all order level attributes', error)
    }
  }

  const finalCheckout = async (shipToResponse, shipMethodCost) => {
    console.log({ shipToResponse })
    var itemsTaxes = await getItemsTaxes(shipToResponse?.data?.items)
    var shipToTaxes = await getShipToTaxes(shipToResponse?.data?.items)
    let req = {
      cartId: cartPayload?._id,
      customerEmail: personalInfo?.email,
      paymentDetails: [
        {
          transactionDetails: {
            paymentType: 'NON_CARD',
            tokenizedPaymentMethod: null,
          },
          paymentIdentifier: {
            cardIdentifier: 'QWfXNQNFXWp07Xu2',
          },
          paymentMethod: 'PURCHASE_ORDER',
          paymentKind: 'PURCHASE_ORDER',
          amount: delivery
            ? parseFloat(shipToResponse?.data?.totalAmount?.amount) +
              shipMethodCost
            : parseFloat(shipToResponse?.data?.totalAmount?.amount),
          currency: 'USD',
          conversion: 1,
          billToAddress: address,
        },
      ],
      estimatedTax: {
        itemsTaxes: itemsTaxes,
        shipToTaxes: shipToTaxes,
      },
    }
    await attachInvoiceURL(cartPayload)
    let finalResponse = await checkout(req)
    console.log({ finalResponse })
    if (finalResponse?.data?.checkoutComplete) {
      setCheckoutData({
        orderId: finalResponse?.data?.orderId,
        totalAmount: delivery
          ? parseFloat(shipToResponse?.data?.totalAmount?.amount) +
            shipMethodCost
          : parseFloat(shipToResponse?.data?.totalAmount?.amount),
        selectedLocation: selectedLocation,
        poNumber: poNumber,
      })
      setIsLoading(false)
      setGetCartItemsState([])
      navigate('checkout-success')
    } else error()
  }

  const retreiveShippingMethods = async () => {
    let req = {}
    try {
      let shippingMethods = await getAllShippingMethods()
      console.log('shippingMethods', shippingMethods)
      if (shippingMethods?.data?.length) {
        let selectedShipping = shippingMethods?.data[0]
        req = {
          address: address,
          shipToType: 'SHIP_TO_ADDRESS',
          shipMethod: {
            shipMethodId: selectedShipping?.shippingMethodId,
            shipmentCarrier: selectedShipping?.name,
            shipmentMethod: selectedShipping?.description,
            cost: {
              currency: 'USD',
              amount: await getAmount(selectedShipping),
            },
          },
          taxCode: selectedShipping?.taxCode,
        }
        setShippingDetails(req)
      } else error('No Shipping Method Available!')
    } catch (e) {
      error('Error in getting shipping methods!')
    }
  }

  const getAmount = selectedShipping => {
    let amount
    if (getCartItems?.hasPackaged) {
      amount =
        Number(getCartItems?.totalAmount?.amount) >= Number(freeShippingAmount)
          ? 0
          : selectedShipping?.cost
    } else {
      amount =
        Number(getCartItems?.quantity) >= Number(freeShippingQuantity)
          ? 0
          : selectedShipping?.cost
    }
    return amount
  }

  const createShipping = async () => {
    setIsLoading(true)

    let response
    if (delivery) {
      response = await createShipTo(cartPayload?._id, shippingDetails)
    } else {
      response = await mapItemsWithPickUpandShipping(
        shippingDetails?.shipMethod?.shipMethodId,
      )
    }
    console.log({ response })
    try {
      if (response?.status === 200) {
        let shipToId = response?.data?._id
        // let shipMethodId = response?.data?.shipMethod?.shipMethodId
        let shipMethodCost = response?.data?.shipMethod?.cost?.amount
        console.log({ shipToId })
        let responseofLineItems
        responseofLineItems = await mapItemsWithShipping(shipToId)
        console.log({ responseofLineItems })
        if (responseofLineItems?.error === false) {
          await finalCheckout(responseofLineItems, shipMethodCost)
        } else error()
      } else error()
    } catch (e) {
      error()
    }
  }

  const onChange = async e => {
    console.log('radio', e.target.value)
    setDelivery(prev => !prev)
    setInputField(false)
    setPONumber(zipCode)
    setSelectedLocation({})
    // setValue(e.target.value)
  }

  const handlePOChange = () => {
    setPONumber('')
    setInputField(true)
  }

  const handlePOInput = e => {
    setPONumber(e.target.value)
    if (e.target.value) {
      var regex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
      var reg = new RegExp(regex)
      let res = reg.test(e.target.value)
      console.log('regex', res)
      setValidatePO(res)
    }
  }

  const handlePickUpClick = () => {
    setIsModalVisible(true)
  }
  const onListClick = item => {
    setSelectedLocation(item)
    setIsModalVisible(false)
  }

  const error = () => {
    setIsLoading(false)
    Modal.error({
      title: 'Error! Please try again.',
      content: 'Due to Some technical reason there is an error!',
    })
  }
  const goBack = () => {
    window.history.go(-1)
  }

  const redirectToHome = () => {
    window.location.href = '/'
  }

  return (
    <div>
      <Modal
        // title="Basic Modal"
        visible={isModalVisible}
        // onOk={handleOk}
        // centered
        className="locations-modal"
        onCancel={handleCancel}
        bodyStyle={{
          background: 'white',
          padding: '10px 15px 20px 25px',
          maxHeight: '36vh',
          overflowY: 'scroll',
        }}
      >
        <List
          // header={<div>Header</div>}
          // footer={<div>Footer</div>}
          // bordered
          dataSource={availablePickupLocations || []}
          renderItem={item =>
            item ? (
              <List.Item
                onClick={() => onListClick(item)}
                className="list-item"
              >
                <List.Item.Meta
                  title={item?.name}
                  description={
                    <p>
                      {`${item?.address?.street1},`}
                      <br />
                      {`${item?.address?.city}, ${item?.address?.state} ${item?.address?.zipCode}`}
                      <br />
                      {`${item?.address?.phone?.number || ''}`}
                    </p>
                  }
                />
              </List.Item>
            ) : (
              <List.Item
                onClick={() => onListClick(item)}
                className="list-item"
              >
                No Locations Found!
              </List.Item>
            )
          }
        />
      </Modal>
      <div className="checkout-wrapper">
        {window.innerWidth > 768 ? (
          <div>
            <Row justify="center" align="center" className="checkoutHeader">
              <Col>
                <LinkIcon link="/" src="static\images\klondike.png" alt="pic" />
              </Col>
            </Row>
            <Row className="checkout-heading-padding">
              <Col>
                <div className="page-title">
                  {/* <Link to="/plp"> */}
                  <Button onClick={goBack} className="goback">
                    <img
                      className="checkout-back-icon"
                      src="/static/images/arrowleft.png"
                      alt="pic"
                    />
                  </Button>
                  <h1 className="checkout-title"> Checkout</h1>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <Row className="checkoutHeader">
              <Col>
                <div className="page-title">
                  <Button onClick={goBack} className="goback">
                    <img
                      className="checkout-back-icon"
                      src="/static/images/arrowleft.png"
                      alt="pic"
                    />
                  </Button>
                  <h1 className="checkout-title"> Checkout</h1>
                </div>
              </Col>
              <Col>
                {/* <LinkIcon
                  className="checkout-logo"
                  link="/"
                  src="static\images\klondike.png"
                  alt="pic"
                /> */}
                <Button
                  onClick={redirectToHome}
                  className="checkout-logo-button"
                >
                  <img
                    className="checkout-logo-image"
                    src="static\images\klondike.png"
                    alt="pic"
                  />
                </Button>
              </Col>
            </Row>
          </div>
        )}

        {isCartLoading ? (
          <Row justify="center" align="center">
            <h1 style={{ color: 'gray' }}>Loading...</h1>
          </Row>
        ) : (
          <Row className="checkout-padding">
            <Col xs={{ span: 24 }} lg={{ span: 16 }}>
              <div className="radio-group">
                <Radio.Group
                  // value={value}
                  defaultValue={1}
                  size="large"
                  optionType="button"
                  onChange={onChange}
                >
                  <Radio
                    value={1}
                    style={{
                      color: delivery ? 'white' : 'rgba(244, 244, 244, 0.5)',
                    }}
                    className="radio-btn"
                    onMouseEnter={() => setTooltipVisible(false)}
                  >
                    DELIVERY
                  </Radio>
                  <Tooltip
                    placement="bottomLeft"
                    visible={tooltipVisible}
                    title={secondtext}
                  >
                    <Radio
                      value={2}
                      style={{
                        color: delivery ? 'rgba(244, 244, 244, 0.5)' : 'white',
                      }}
                      className="radio-btn"
                      disabled={cartPayload?.itemsTotal < 500}
                      onMouseEnter={() =>
                        setTooltipVisible(cartPayload?.itemsTotal < 500)
                      }
                      onMouseLeave={() => setTooltipVisible(false)}
                    >
                      PICKUP
                    </Radio>
                  </Tooltip>
                </Radio.Group>
              </div>
              <div className="checkout-info">
                <span
                  style={{ fontWeight: 'bold' }}
                >{`${personalInfo?.email}`}</span>
              </div>
              {delivery ? (
                <div className="checkout-info-second">
                  <div className="checkout-po">
                    <span>
                      <strong>{`${personalInfo?.firstName} ${personalInfo?.lastName}`}</strong>
                      <br />
                      <span>{`${address?.street1},`}</span>
                      <br />
                      <span>{`${address?.city}, ${address?.state} ${address?.zipCode}`}</span>
                      <br />
                      <span>{`${address?.phone?.number}`}</span>
                    </span>
                  </div>
                </div>
              ) : (
                <div className="checkout-info-second">
                  {Object.keys(selectedLocation).length === 0 ? (
                    <div className="checkout-po">
                      <span>Please choose location!</span>
                      {/* <span>
                        <strong>{`${personalInfo?.firstName} ${personalInfo?.lastName}`}</strong>
                        <br />
                        {`${address?.street1},`}
                        <br />
                        {`${address?.city}, ${address?.state} ${address?.zipCode}`}
                        <br />
                        {`${address?.phone?.number}`}
                      </span> */}
                    </div>
                  ) : (
                    <div className="checkout-po">
                      <span>
                        <strong>{`${selectedLocation?.name}`}</strong>
                        <br />
                        <span>{`${selectedLocation?.address?.street1},`}</span>
                        <br />
                        <span>{`${selectedLocation?.address?.city}, ${selectedLocation?.address?.state} ${selectedLocation?.address?.zipCode}`}</span>
                        <br />
                        <span>{`${selectedLocation?.address?.phone?.number ||
                          ''}`}</span>
                      </span>
                    </div>
                  )}
                  <Button
                    ghost
                    className="change-button"
                    onClick={handlePickUpClick}
                  >
                    CHOOSE PICKUP LOCATION
                  </Button>
                </div>
              )}
              <div className="checkout-info-third">
                <div>
                  <span className="checkout-po">
                    PO Number:{' '}
                    <strong className="poNumber">{`${poNumber}`}</strong>
                  </span>
                </div>
                <div className="checkout-po-button">
                  <Button
                    ghost
                    className="change-button"
                    onClick={handlePOChange}
                  >
                    CHANGE
                  </Button>
                </div>
              </div>
              <>
                {inputField && (
                  <div className="checkout-info h-127">
                    <div className="checkout-po">
                      <span className="checkout-po-span">
                        Custom PO Number:
                      </span>
                      <div className="checkout-po-input">
                        <Input
                          placeholder="Enter Custom PO Number"
                          onChange={handlePOInput}
                          maxLength={7}
                          // defaultValue={`R3G`}
                          className="inputStyle"
                        />
                        {inputField && !validatePO && (
                          <p
                            style={{ color: '#f2a900' }}
                            className="invalid-po-number"
                          >
                            {poNumber?.length === 0
                              ? 'Required!'
                              : 'Invalid PO Number'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </>
              {size > 768 && (
                <div className="checkout-btn">
                  <Button
                    className="placeorder-btn"
                    onClick={createShipping}
                    loading={isLoading}
                    disabled={
                      (!delivery && !Object.keys(selectedLocation).length) ||
                      (inputField && !validatePO) ||
                      (getCartItems.items || []).length === 0
                    }
                  >
                    PLACE ORDER
                  </Button>
                </div>
              )}
            </Col>
            <Col
              xs={{ span: 24 }}
              lg={{ span: 8 }}
              className="checkout-summary"
            >
              <div>
                <h2 className="summary-title">ORDER SUMMARY</h2>
              </div>
              <div className="item">
                <span>{`Items (${cartPayload?.items?.length || 0})`}</span>
                {(getCartItems.items || []).length === 0 ? (
                  <span>{`$0.00`}</span>
                ) : (
                  <span>
                    {`$${Number(
                      parseFloat(cartPayload?.itemsTotal).toFixed(2),
                    ).toLocaleString()}`}
                  </span>
                )}
              </div>
              <div className="item">
                <span>Shipping &amp; Handling</span>
                <span>
                  {(getCartItems.items || []).length === 0
                    ? 'TBD'
                    : delivery
                      ? `$${Number(
                        parseFloat(
                          shippingDetails?.shipMethod?.cost?.amount || 0,
                        ).toFixed(2),
                      ).toLocaleString()}`
                      : 'TBD'}
                </span>
              </div>
              <div className="item">
                <span>Credit Limit</span>
                <span>${Number(creditLimit.toFixed(2)).toLocaleString()}</span>
              </div>
              <Divider style={{ border: '1px solid #fff' }} />
              <div className="item">
                <span className="total-price">Total</span>
                {(getCartItems.items || []).length === 0 ? (
                  <span className="total-amount">{`$0.00`}</span>
                ) : delivery ? (
                  <span className="total-amount">
                    {`$${Number(
                      parseFloat(
                        delivery
                          ? parseFloat(
                            Number(cartPayload?.itemsTotal) +
                                Number(
                                  shippingDetails?.shipMethod?.cost?.amount,
                                ) || 0,
                          ).toFixed(2)
                          : cartPayload?.itemsTotal,
                      ).toFixed(2),
                    ).toLocaleString()}`}
                  </span>
                ) : (
                  <span className="total-amount">
                    {`$${Number(
                      parseFloat(cartPayload?.itemsTotal).toFixed(2),
                    ).toLocaleString()}`}
                  </span>
                )}
              </div>
            </Col>
            <div>
              {size <= 768 && (
                <div className="checkout-btn">
                  <Button
                    className="placeorder-btn"
                    onClick={createShipping}
                    loading={isLoading}
                    disabled={
                      (!delivery && !Object.keys(selectedLocation).length) ||
                      (inputField && !validatePO) ||
                      (getCartItems.items || []).length === 0
                    }
                  >
                    PLACE ORDER
                  </Button>
                </div>
              )}
            </div>
          </Row>
        )}
      </div>
    </div>
  )
}
export default Checkoutsection
