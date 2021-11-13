/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useState } from 'react'
import './style.scss'
import { useNavigate } from '@reach/router'

import {
  Radio,
  Button,
  Input,
  Modal,
  Result,
  Row,
  Col,
  Divider,
  List,
  Typography,
} from 'antd'
import {
  addShippingWithLineItems,
  getCartByUserId,
} from 'libs/services/api/cart'
import { AppContext } from 'libs/context'
import {
  // getAllShippingMethods,
  createShipTo,
  checkout,
  retreivePickupPoints,
} from 'libs/services/api/checkout'
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

  // const { checkData } = checkoutData
  const [cartPayload, setCartPayloadState] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  // const [cartId] = useState('617fb67c3d8494000801e3f0')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [delivery, setDelivery] = useState(true)
  const [value, setValue] = useState(1)
  const [poNumber, setPONumber] = useState('R3G 2T3')
  const [isCartLoading, setIsCartLoading] = useState(true)
  console.log({ cartPayload })
  const [inputField, setInputField] = useState(false)
  const [cartItemIds, setCartItemIds] = useState([])
  const [availableLocations, setAvaiableLocations] = useState([])
  console.log({ cartItemIds })
  console.log({ availableLocations })

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

  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ]

  // const [isActive, setIsAcive] = useState(true)
  // const [pickup, setPickup] = useState(false)
  // const [delivery, setDelivery] = useState(false)
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
          // totalItems: res?.data?.quantity,
          // totalPrice: '12,000',
        }
        let tempArr = getCartItemIds(res?.data?.items)
        await setCartItemIds(tempArr)
        await setCartPayloadState(data)
        if (tempArr?.length) {
          let pickUpPoints = retreivePickupPoints(1)
          pickUpPoints
            .then(res => {
              setAvaiableLocations(res?.data?.locations)
            })
            .catch(err => console.log({ err }))
          console.log({ pickUpPoints })
        }
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

    let res = await addShippingWithLineItems(cartPayload?._id, data)
    console.log('line items res', res)
    return res
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
          amount:
            parseFloat(shipToResponse?.data?.totalAmount?.amount) +
            shipMethodCost,
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
        orderId: shipToResponse?.data?.orderId,
        totalAmount:
          parseFloat(shipToResponse?.data?.totalAmount?.amount) +
          shipMethodCost,
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
    let response = await createShipTo(cartPayload?._id, req)
    console.log({ response })
    try {
      if (response?.status === 200) {
        let shipToId = response?.data?._id
        let shipMethodCost = response?.data?.shipMethod?.cost?.amount
        console.log({ shipToId })
        let responseofLineItems = await mapItemsWithShipping(shipToId)
        console.log({ responseofLineItems })
        if (responseofLineItems?.error === false) {
          await finalCheckout(responseofLineItems, shipMethodCost)
        } else error()
      } else error()
    } catch (e) {
      error()
    }
  }

  const handleClose = () => {
    setIsSuccess(false)
  }
  const onChange = e => {
    setValue(e.target.value)
    if (e.target.value === 1) {
      setDelivery(true)
    } else {
      setDelivery(false)
    }
  }

  const handlePOChange = () => {
    setInputField(true)
  }

  const handlePOInput = e => {
    if (e.target.value) {
      setPONumber(e.target.value)
    }
  }

  const handlePickUpClick = () => {
    setIsModalVisible(true)
  }
  const onListClick = item => {
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
      {isSuccess && (
        <Modal
          title="Basic Modal"
          visible={isSuccess}
          // onOk={handleOk}
          onCancel={handleClose}
        >
          <Result
            status="success"
            title="Order Placed Successfully!"
            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
          />
        </Modal>
      )}
      <Modal
        // title="Basic Modal"
        visible={isModalVisible}
        // onOk={handleOk}
        // centered
        onCancel={handleCancel}
        bodyStyle={{ background: 'white', padding: 10 }}
      >
        <List
          // header={<div>Header</div>}
          // footer={<div>Footer</div>}
          bordered
          dataSource={data}
          renderItem={item => (
            <List.Item onClick={() => onListClick(item)}>
              <Typography.Text mark>[WAREHOUSE]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </Modal>
      <div className="checkout-wrapper">
        <Row justify="center" align="center" className="checkoutHeader">
          <Col>
            <img src="static\images\klondike.png" alt="pic" />
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
            <Col xs={{ span: 23 }} lg={{ span: 16 }}>
              <div style={{ margin: '0 0 3vw 1vw' }} className="radio-group">
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
                  {!delivery && (
                    <Button
                      ghost
                      className="change-button"
                      onClick={handlePickUpClick}
                    >
                      CHOOSE PICKUP LOCATION
                    </Button>
                  )}
                </div>
              </div>
              <div className="checkout-info-third">
                <div className="checkout-po">
                  <span>
                    PO Number: <strong>{`${poNumber}`}</strong>
                  </span>
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
                    <Input
                      placeholder="Enter Custom PO Number"
                      onChange={handlePOInput}
                    />
                  </div>
                </div>
              )}
              <div className="checkout-btn">
                <Button
                  className="placeorder-btn"
                  onClick={createShipping}
                  loading={isLoading}
                >
                  PLACE ORDER
                </Button>
              </div>
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
                  {`$${(parseFloat(cartPayload?.itemsTotal) + 39).toFixed(2)}`}
                </span>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </>
  )
}
export default Checkoutsection
