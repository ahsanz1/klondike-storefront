import Label from 'components/atoms/label'
import React from 'react'
import './style.scss'
const Confirmation = () => {
  return (
    <>
      <div className="confirmation-wrap">
        <div className="heading-confirmation">
          <Label className="show-sms">Thank you for shopping with us.</Label>
          <Label className="order-mail">
            Your order has been recieved. We will send an order confirmation at
            john@example.com
          </Label>
        </div>
        <div className="deitail">
          <div className="order-deitail">
            <Label>Order Number:</Label>
            <Label>PO NUMBER:</Label>
            <Label>Order Date:</Label>
            <Label>Order Total:</Label>
          </div>

          <div className="shaping-adress">
            <h2>Shipping Address</h2>
            <div className="ship-warp">
              <Label>Lorem ipsum</Label>
              <Label>123 Neque, odio purus, Id duis</Label>
              <Label>Tincidunt neque</Label>
              <Label>1234567890</Label>
            </div>
          </div>
          {/* <div className="change-order">
            <Label>
              If you need to make changes to your order, please email
              clientcare@klondikelubricants.com or call 1-877-293-4691
              immediately.
            </Label>
          </div> */}
        </div>
      </div>
    </>
  )
}
export default Confirmation
