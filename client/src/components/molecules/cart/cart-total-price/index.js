import React, { useContext } from 'react'
import './style.scss'

import { AppContext } from 'libs/context'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'

const TotalCartPrice = () => {
  const { subTotal } = useContext(AppContext)
  return (
    <div className="checkout-div">
      <Label className="sub-total">SUBTOTAL</Label>
      <Label className="total-price">${subTotal}</Label>
      <br />
      <Label className="instructions">
        Shipping taxes calculated at checkout
      </Label>
      <Link className="checkout-btn" to="/checkout">
        CHECK OUT
      </Link>
    </div>
  )
}

export default TotalCartPrice
