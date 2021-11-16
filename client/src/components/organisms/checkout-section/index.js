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
  // Typography,
} from 'antd'
import {
  addShippingWithLineItems,
  addPickupAndShippingWithLineItems,
  getCartByUserId,
} from 'libs/services/api/cart'
import { AppContext } from 'libs/context'
import {
  // getAllShippingMethods,
  createShipTo,
  checkout,
  // retreivePickupPoints,
  getPickupPoints,
} from 'libs/services/api/checkout'
import LinkIcon from 'components/atoms/link-icon'
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
  } = useContext(AppContext)
  console.log({ personalInfo })
  console.log({ user })
  const navigate = useNavigate()
  const [size] = useWindowSize()

  // const { checkData } = checkoutData
  const [cartPayload, setCartPayloadState] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  // const [cartId] = useState('617fb67c3d8494000801e3f0')
  // const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [delivery, setDelivery] = useState(true)
  const [value, setValue] = useState(1)
  const [poNumber, setPONumber] = useState('R3G 2T3')
  const [isCartLoading, setIsCartLoading] = useState(true)
  console.log({ cartPayload })
  const [inputField, setInputField] = useState(false)
  const [cartItemIds, setCartItemIds] = useState([])
  const [validatePO, setValidatePO] = useState(false)
  const [availablePickupLocations, setAvaiablePickupLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState({})
  console.log({ cartItemIds })
  // console.log({ availableLocations })

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

  const getCart = async () => {
    if (user !== null) {
      console.log('token', user?.accessToken)
      let res = await getCartByUserId(user?.accessToken)
      console.log({ res })
      if (res && res?.data) {
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
        const filteredLocations = await [
          ...new Map(
            availableLocations.map(item => [item['_id'], item]),
          ).values(),
        ]
        console.log(filteredLocations, 'filtered')
        await setAvaiablePickupLocations(filteredLocations)
        setIsCartLoading(false)
      } else navigate('/plp-page')
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
      shipToType: 'BOPIS',
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

  const finalCheckout = async (shipToResponse, shipMethodCost) => {
    console.log({ shipToResponse })
    var itemsTaxes = await getItemsTaxes(shipToResponse?.data?.items)
    var shipToTaxes = await getShipToTaxes(shipToResponse?.data?.items)
    let req = {
      cartId: cartPayload?._id,
      customerEmail: 'haseeb.shaukat@shopdev.co',
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
      })
      setIsLoading(false)
      setGetCartItemsState([])
      navigate('checkout-success')
    } else error()
  }

  const createShipping = async () => {
    setIsLoading(true)
    let req = {
      address: address,
      shipToType: 'SHIP_TO_ADDRESS',
      shipMethod: {
        shipMethodId: 10009,
        shipmentCarrier: 'KLONDIKE - Delivery Shipping ',
        shipmentMethod: 'Next Day',
        cost: {
          currency: 'USD',
          amount: 39,
        },
      },
      taxCode: 'FR020000',
    }
    console.log({ req })
    let response
    if (delivery) {
      response = await createShipTo(cartPayload?._id, req)
    } else {
      response = await mapItemsWithPickUpandShipping(
        req?.shipMethod?.shipMethodId,
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

  const onChange = e => {
    if (e.target.value) {
      setValue(e.target.value)
      setDelivery(!delivery)
    }
  }

  const handlePOChange = () => {
    setInputField(true)
  }

  const handlePOInput = e => {
    if (e.target.value) {
      var regex = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
      setPONumber(e.target.value)
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

  return (
    <>
      <Modal
        // title="Basic Modal"
        visible={isModalVisible}
        // onOk={handleOk}
        centered
        onCancel={handleCancel}
        bodyStyle={{ background: 'white', padding: 10 }}
        width={600}
      >
        <List
          // header={<div>Header</div>}
          // footer={<div>Footer</div>}
          bordered
          dataSource={availablePickupLocations}
          renderItem={item => (
            <List.Item onClick={() => onListClick(item)}>
              <List.Item.Meta
                title={item.name}
                description={
                  <p>
                    {`${item?.address?.street1},`}
                    <br />
                    {`${item?.address?.city}, ${item?.address?.state} ${item?.address?.zipCode}`}
                    <br />
                    {`${item?.address?.phone?.number || '000-000-000'}`}
                  </p>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
      <div className="checkout-wrapper">
        <Row justify="center" align="center" className="checkoutHeader">
          <Col>
            <LinkIcon link="/" src="static\images\klondike.png" alt="pic" />
          </Col>
        </Row>
        <Row className="checkout-heading-padding">
          <Col>
            <div className="page-title">
              {/* <Link to="/plp"> */}
              <a href="/plp-page">
                <img
                  className="checkout-back-icon"
                  src="/static/images/arrowleft.png"
                  alt="pic"
                />
              </a>
              <h1 className="checkout-title"> Checkout</h1>
            </div>
          </Col>
        </Row>
        {isCartLoading ? (
          <Row justify="center" align="center">
            <h1 style={{ color: 'gray' }}>Loading...</h1>
          </Row>
        ) : (
          <Row className="checkout-padding">
            <Col xs={{ span: 24 }} lg={{ span: 16 }}>
              <div style={{ margin: '0 0 36px 1vw' }} className="radio-group">
                <Radio.Group
                  onChange={onChange}
                  value={value}
                  defaultValue={1}
                  size="large"
                  optionType="button"
                >
                  <Radio
                    value={1}
                    style={{
                      color: delivery ? 'white' : 'rgba(244, 244, 244, 0.5)',
                    }}
                    className="radio-btn"
                  >
                    DELIVERY
                  </Radio>
                  <Radio
                    value={2}
                    style={{
                      color: delivery ? 'rgba(244, 244, 244, 0.5)' : 'white',
                    }}
                    className="radio-btn"
                  >
                    PICKUP
                  </Radio>
                </Radio.Group>
              </div>
              <div className="checkout-info">
                <span>{personalInfo?.email}</span>
              </div>
              <div className="checkout-info-second">
                {delivery ? (
                  <div className="checkout-po">
                    <span>
                      <strong>{`${personalInfo?.firstName} ${personalInfo?.lastName}`}</strong>
                      <br />
                      {`${address?.street1},`}
                      <br />
                      {`${address?.city}, ${address?.state} ${address?.zipCode}`}
                      <br />
                      {`${address?.phone?.number}`}
                    </span>
                  </div>
                ) : (
                  <div className="checkout-po">
                    {Object.keys(selectedLocation).length === 0 ? (
                      <span>Please choose location!</span>
                    ) : (
                      <span>
                        {`${selectedLocation?.address?.street1},`}
                        <br />
                        {`${selectedLocation?.address?.city}, ${selectedLocation?.address?.state} ${selectedLocation?.address?.zipCode}`}
                        <br />
                        {`${selectedLocation?.address?.phone?.number ||
                          '000-000-000'}`}
                      </span>
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
              </div>
              <div className="checkout-info-third">
                <div>
                  <span className="checkout-po">
                    PO Number: <strong>{`${poNumber}`}</strong>
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
              {inputField && (
                <div className="checkout-info">
                  <div className="checkout-po">
                    <span>Custom PO Number:</span>
                    <div>
                      <Input
                        placeholder="Enter Custom PO Number"
                        onChange={handlePOInput}
                        maxLength={7}
                        defaultValue={`R3G`}
                        className="inputStyle"
                      />
                      {!validatePO && (
                        <p style={{ color: '#f2a900' }}>Invalid PO Number</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {size > 768 && (
                <div className="checkout-btn">
                  <Button
                    className="placeorder-btn"
                    onClick={createShipping}
                    loading={isLoading}
                    disabled={
                      !delivery && !Object.keys(selectedLocation).length
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
                <span>Items ({cartPayload?.items?.length})</span>
                <span>
                  {`$${parseFloat(cartPayload?.itemsTotal).toFixed(2)}`}
                </span>
              </div>
              <div className="item">
                <span>Shipping &amp; Handling</span>
                <span>{delivery ? `$39.00` : 'TBD'}</span>
              </div>
              <div className="item">
                <span>Credit Limit</span>
                <span>${creditLimit}</span>
              </div>
              <Divider style={{ border: '1px solid #fff' }} />
              <div className="item">
                <span className="total-price">Total Amount</span>
                <span className="total-amount">
                  {`$${parseFloat(cartPayload?.itemsTotal + 39).toFixed(2)}`}
                </span>
              </div>
            </Col>
            {size <= 768 && (
              <div className="checkout-btn">
                <Button
                  className="placeorder-btn"
                  onClick={createShipping}
                  loading={isLoading}
                  disabled={!delivery && !Object.keys(selectedLocation).length}
                >
                  PLACE ORDER
                </Button>
              </div>
            )}
          </Row>
        )}
      </div>
    </>
  )
}
export default Checkoutsection
