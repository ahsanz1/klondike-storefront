import React from 'react'
import MobileDesktopCartPage from 'components/molecules/cart/cart-page-mobile-desktop'
import PropTypes from 'prop-types'

const CartPage = ({
  emptyCartPageTitle,
  emptyCartPageSubtitle,
  emptyCartBtnText,
  emptyCartBtnLink,
}) => {
  return (
    <MobileDesktopCartPage
      emptyCartBtnText={emptyCartBtnText}
      emptyCartBtnLink={emptyCartBtnLink}
      emptyCartPageTitle={emptyCartPageTitle}
      emptyCartPageSubtitle={emptyCartPageSubtitle}
    />
  )
}

CartPage.propTypes = {
  emptyCartPageTitle: PropTypes.string,
  emptyCartPageSubtitle: PropTypes.string,
  emptyCartBtnText: PropTypes.string,
  emptyCartBtnLink: PropTypes.string,
}

export default CartPage
