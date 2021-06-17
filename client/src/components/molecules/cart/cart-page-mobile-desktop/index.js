import React, { useContext } from 'react'
import './style.scss'

import { AppContext } from 'libs/context'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
import Label from 'components/atoms/label'
import DesktopCartPageItem from 'components/molecules/cart/desktop-cart-page-item'
import MobileCartPageItem from 'components/molecules/cart/mobile-cart-page-item'
import TotalCartPrice from 'components/molecules/cart/cart-total-price'
import EmptyCartMessage from 'components/molecules/cart/empty-cart-message'
import PropTypes from 'prop-types'

const MobileDesktopCartPage = ({
  emptyCartPageTitle,
  emptyCartPageSubtitle,
  emptyCartBtnText,
  emptyCartBtnLink,
}) => {
  const { cartItems } = useContext(AppContext)
  console.log(cartItems, 'cartItems from cart page')
  const [size] = useWindowSize()
  return (
    <div className="cart-page">
      <div className="cart-header">
        {cartItems.length > 0 ? (
          <>
            <div className="cart-top">
              <Label className="your-cart">Your Cart</Label>
              <div className="cart-specs">
                <Label className="spec align-left">Price</Label>
                <Label className="spec align-center">Quantity</Label>
                <Label className="spec align-right">Total</Label>
              </div>
            </div>
            {cartItems.map((cartItem, i) =>
              size > 768 ? (
                <DesktopCartPageItem {...cartItem} key={i} />
              ) : (
                <MobileCartPageItem {...cartItem} key={i} />
              ),
            )}
            <TotalCartPrice />
          </>
        ) : (
          <EmptyCartMessage
            emptyCartBtnText={emptyCartBtnText}
            emptyCartBtnLink={emptyCartBtnLink}
            emptyCartPageTitle={emptyCartPageTitle}
            emptyCartPageSubtitle={emptyCartPageSubtitle}
          />
        )}
      </div>
    </div>
  )
}

MobileDesktopCartPage.propTypes = {
  emptyCartPageTitle: PropTypes.string,
  emptyCartPageSubtitle: PropTypes.string,
  emptyCartBtnText: PropTypes.string,
  emptyCartBtnLink: PropTypes.string,
}

export default MobileDesktopCartPage
