import React, { useState } from 'react'
import { checkoutData } from './data'
import './style.scss'
import Label from 'components/atoms/label'
import { Radio, Button, Input } from 'antd'
import AccordionComponent from 'components/molecules/accordionComponent'
const Checkoutsection = () => {
  const { checkData } = checkoutData
  const [isActive, setIsAcive] = useState(true)
  console.log('datacheckout', checkData)

  const handleClick = () => {
    setIsAcive(!isActive)
  }
  return (
    <>
      <div className="chectout-wraper">
        <div className="checkout-data">
          <h1>Checkout</h1>
          <div className="radio-btn">
            <Radio.Group className="radio-delivery">
              <Radio>DELIVERY</Radio>
              <Radio>PICK UP</Radio>
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
                </div>
                <div className="ckeckout-po">
                  <p>PO Number:{data.ponumber}</p>
                </div>
              </>
            )
          })}
          <Label className="costom-po">
            <p>Custom PO Number:</p>
            <Input placeholder="Enter custom PO number"></Input>
          </Label>
          <Button className="order-btn">PLACE ORDER</Button>
        </div>
        <AccordionComponent
          className="accordian-mobile"
          title={'Total : $1509'}
          onClick={handleClick}
          isActive={isActive}
        >
          <div className="checkout-summary">
            <Label className="order-summary">
              <p>Order summary</p>{' '}
            </Label>
            <Label className="order-handling">
              <p> Items (3</p>
              <p>$3,450.00</p>
            </Label>
            <Label className="order-credit">
              <p> Shippling&Handling</p>
              <p>TBD</p>
            </Label>
            <Label className="order-items">
              <p>Credit Limit </p>
              <p>$44,435</p>
            </Label>
            <Label className="order-total">
              <p>Total </p>
              <p>$1,970.00</p>
            </Label>
          </div>
        </AccordionComponent>
      </div>
    </>
  )
}
export default Checkoutsection
