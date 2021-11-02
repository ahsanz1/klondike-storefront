import React, { useContext, useEffect, useState } from 'react'
import { checkoutData } from './data'
import './style.scss'
import Label from 'components/atoms/label'

import { Radio, Button, Input, Modal } from 'antd'
import { Link } from '@reach/router'
import {
  // addShippingWithLineItems,
  getCartByUserId,
} from 'libs/services/api/cart'
import { AppContext } from 'libs/context'
import { getAllShippingMethods, createShipTo } from 'libs/services/api/checkout'
// import AccordionComponent from 'components/molecules/accordionComponent'
const Checkoutsection = () => {
  // let cart
  const { user } = useContext(AppContext)
  const { checkData } = checkoutData
  let [cartPayload, setCartPayloadState] = useState('')
  const [visible, setVisible] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [cartId, setCartId] = useState('617fb67c3d8494000801e3f0')
  setCartId('617fb67c3d8494000801e3f0')

  // const [isActive, setIsAcive] = useState(true)
  // const [pickup, setPickup] = useState(false)
  // const [delivery, setDelivery] = useState(false)

  useEffect(async () => {
    if (user !== null) {
      let res = await getCartByUserId(user.accessToken)
      let r = getAllShippingMethods()
      console.log({ r })
      // cart = res.data
      let data = {
        itemsTotal: res.data.totalAmount.amount,
        currency: res.data.totalAmount.currency,
        totalItems: res.data.quantity,
        totalPrice: '12,000',
      }

      setCartPayloadState(data)
    }
  }, [])

  // const mapItemsWithShipping = async () => {
  //   let data = []

  //   cart.map((i, v) => {
  //     data.push({
  //       itemId: 1000000012,
  //       lineItemId: 1,
  //       shipToId: '5e99dd58fcef0314e06b64fe',
  //     })
  //   })

  //   let res = await addShippingWithLineItems(cart.cartId, data)
  //   console.log('line items res', res)
  // }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const createShipping = async () => {
    let req = {
      address: {
        street1: '1510 Wall Street NW ',
        city: 'Winnipeg',
        state: 'MB',
        country: 'Canada',
        zipCode: 'R3G 2T3',
        kind: 'shipping',
        name: {
          first: 'Haseeb',
          last: 'Shaukat',
        },
        email: 'haseeb.shaukat@shopdev.co',
        phone: {
          number: '844-883-4645',
          kind: 'Mobile',
        },
      },
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
    let response = await createShipTo(cartId, req)
    console.log({ response })
  }

  // const [value, setValue] = useState(1)

  // const handleClick = () => {
  //   setIsAcive(!isActive)
  // }
  // const onChange = e => {
  //   setValue(e.target.value)
  // }
  // const radioChangeBULK = () => {
  //   setPickup(false)
  //   setDelivery(true)
  // }

  // const radioChangePACKAGE = () => {
  //   setDelivery(false)
  //   setPickup(true)
  // }

  return (
    <>
      <div className="checkout-header">
        <img src="static\images\klondike.png" alt="pic" />
        <Link className="link" to="/collections/all-bars">
          <img src="static\images\chevron-right.png" alt="pic" />
          <div className="header-h">
            <h1> checkout</h1>
            <img src="static\images\headerlogo.png" alt="pic" />
          </div>
        </Link>
      </div>
      <div className="chectout-wraper">
        <div className="checkout-data">
          <div className="desktop-heading">
            <Link to="/collections/all-bars">
              <img
                className="img"
                src="static\images\chevron-right.png"
                alt="pic"
              />
            </Link>
            <h1>Checkout</h1>
          </div>
          <div className="radio-btn">
            <Radio.Group
              // value={value}
              className="radio-delivery"
            >
              <Radio onClick={() => setVisible(false)} value={1}>
                DELIVERY
              </Radio>
              <Radio onClick={() => setVisible(true)} value={2}>
                PICK UP
              </Radio>
            </Radio.Group>
          </div>
          {checkData.map((data, i) => {
            return (
              <>
                <div className="checkout-gmail">
                  <p>{data.gmail}</p>
                </div>
                <div className="ckeckout-name">
                  <p>{data.name}</p>
                  {visible && (
                    <Button onClick={showModal} className="btn-location">
                      CHOOSE PICK UP LOCATION
                    </Button>
                  )}
                </div>
                <div className="ckeckout-po">
                  <p>
                    PO Number:{' '}
                    <span className="checkout-value">{data.ponumber}</span>
                  </p>
                </div>
              </>
            )
          })}
          <Label className="costom-po">
            <p>Custom PO Number:</p>
            <Input
              // disabled={delivery}
              className="input-po"
              placeholder="Enter custom PO number"
            ></Input>
          </Label>
          <Button className="order-btn" onClick={createShipping}>
            PLACE ORDER
          </Button>
        </div>

        <div className="checkout-summary">
          <Label className="order-summary">
            <p>Order summary</p>
          </Label>
          <Label className="order-handling">
            <p> Items ({cartPayload.totalItems})</p>
            <p>
              {cartPayload.itemsTotal} {cartPayload.currency}
            </p>
          </Label>
          <Label className="order-credit">
            <p> SHIPPING & Handling</p>
            <p>TBD</p>
          </Label>

          <Label className="order-items">
            <p>Credit Limit </p>
            <p>$44,435</p>
          </Label>

          <Label className="order-total">
            <p className="total">Total </p>
            <p>
              {cartPayload.totalPrice} {cartPayload.currency}
            </p>
          </Label>
          <Button className="mobile-btn" onClick={createShipping}>
            PLACE ORDER
          </Button>
        </div>
      </div>
      <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}
export default Checkoutsection
