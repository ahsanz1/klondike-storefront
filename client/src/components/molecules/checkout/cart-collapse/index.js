/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useState } from 'react'

import { AppContext } from 'libs/context'
import './style.scss'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import CheckoutPageCart from 'components/molecules/checkout/checkout-page-cart'

const CartCollapse = () => {
  const [open, setOpen] = useState(false)
  const { subTotal, step } = useContext(AppContext)

  const toggleCollapse = () => {
    return setOpen(!open)
  }

  const totalCheckoutCost = parseFloat(subTotal)
  return (
    step !== 4 && (
      <div className="cart-collapse-width">
        <div className="cart-collapse-section">
          <div className="cart-collapse" onClick={toggleCollapse}>
            <div className="cart-border">
              {open ? (
                <>
                  <Image
                    src="/static/icons/cart-icon.svg"
                    alt="cart-icon"
                    className="cart-icon"
                  />
                  <Label className="order-summary-label">
                    {' '}
                    Hide order summary
                  </Label>
                  <Image
                    src="/static/icons/cart-collapse-up.svg"
                    alt="cart-icon"
                    className="cart-icon-up-down"
                  />
                  <Label className="cart-collapse-total">
                    ${totalCheckoutCost}
                  </Label>
                </>
              ) : (
                <>
                  <Image
                    src="/static/icons/cart-icon.svg"
                    alt="cart-icon"
                    className="cart-icon"
                  />
                  <Label className="order-summary-label">
                    {' '}
                    Show order summary
                  </Label>
                  <Image
                    src="/static/icons/cart-collapse-down.svg"
                    alt="cart-icon"
                    className="cart-icon-up-down"
                  />
                  <Label className="cart-collapse-total">
                    ${parseFloat(subTotal)}
                  </Label>
                </>
              )}
            </div>
          </div>
          {open && <CheckoutPageCart />}
        </div>
      </div>
    )
  )
}

export default CartCollapse
