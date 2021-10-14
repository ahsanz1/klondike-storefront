import React, { useState } from 'react'
import { checkoutData } from './data'
import './style.scss'
import Label from 'components/atoms/label'

import { Radio, Button, Input, Modal } from 'antd'
import { Link } from '@reach/router'
// import AccordionComponent from 'components/molecules/accordionComponent'
const Checkoutsection = () => {
  const { checkData } = checkoutData
  // const [isActive, setIsAcive] = useState(true)
  console.log('datacheckout', checkData)
  // const [pickup, setPickup] = useState(false)
  // const [delivery, setDelivery] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
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
                  <p>PO Number: {data.ponumber}</p>
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
          <Button className="order-btn">PLACE ORDER</Button>
        </div>

        <div className="checkout-summary">
          <Label className="order-summary">
            <p>Order summary</p>
          </Label>
          <Label className="order-handling">
            <p> Items (3)</p>
            <p>$3,450.00</p>
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
            <p>$1,970.00</p>
          </Label>
          <Button className="mobile-btn">PLACE ORDER</Button>
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