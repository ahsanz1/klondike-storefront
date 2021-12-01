/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from 'libs/context'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import Link from 'components/atoms/link'
import './style.scss'

const CartPopUP = ({ loading }) => {
  const {
    cartData,
    cartPopupModal,
    getCartItems,
    closePopUpModal,
    showModal,
    pdpProductData,
    setCartAmount,
  } = useContext(AppContext)

  const handleClick = () => {
    closePopUpModal()
    showModal()
    loading()
    showModal()
    // loading()
    closePopUpModal()
  }
  console.log('cartData', cartData)
  useEffect(() => {
    setCartAmount(getCartItems?.totalAmount?.amount)
    window.scrollTo(0, 0)
  }, [getCartItems])

  console.log('check cart data:', getCartItems)
  return (
    cartPopupModal && (
      // size > 768 &&
      <>
        <div
          className="cart-overlay"
          onClick={() => {
            closePopUpModal()
          }}
        ></div>

        <div className="cart-pop-Up">
          <div className="cart-message-and-image">
            {pdpProductData?.images?.map((img, i) => (
              <Image
                src={img?.source[0]?.url}
                key={i}
                className="pop-up-image"
              />
            ))}
            <Label className="pop-up-text">Added to cart</Label>
          </div>
          <div className="subtotal-and-free-delivery-info">
            <div className="subtotal-section">
              <Label className="subtotal-section-text">
                Cart Subtotal ({getCartItems?.items?.length} items):
              </Label>
              <Label className="subtotal-section-price">
                ${parseFloat(getCartItems?.totalAmount?.amount).toFixed(2)}
              </Label>
            </div>
            {getCartItems?.hasPackaged ? (
              getCartItems?.totalPackagedOrderLitres >= 900 ? (
                <Label className="free-shipping-banner">
                  Congrats! You have got the free shipping!
                </Label>
              ) : (
                <Label className="free-shipping-banner">
                  You are
                  <Label className="free-shipping-banner-text-price">{`${parseFloat(
                    900 - getCartItems?.totalPackagedOrderLitres,
                  ).toFixed(2)}L`}</Label>
                  away from free shipping
                </Label>
              )
            ) : getCartItems?.quantity >= 500 ? (
              <Label className="free-shipping-banner">
                Congrats! You have got the free shipping!
              </Label>
            ) : (
              <Label className="free-shipping-banner">
                You are
                <Label className="free-shipping-banner-text-price">
                  {`${
                    getCartItems?.quantity
                      ? parseFloat(500 - getCartItems?.quantity || 0)
                      : 500
                  }`}{' '}
                  ltrs{' '}
                </Label>
                away from free shipping
              </Label>
            )}
          </div>
          <div className="viewcart-and-checkout-btn">
            <Button
              onClick={() => {
                handleClick()
              }}
              className="viewcartBtn"
            >
              VIEW CART
            </Button>
            <Link
              to="/Checkoutsection"
              onClick={closePopUpModal}
              className="CheckoutBtn"
            >
              PROCEED TO CHECKOUT
            </Link>
          </div>

          <Image
            src="/static/icons/closecrosswhite.svg"
            alt="close-cross"
            className="cart-pop-header-icon"
            onClick={closePopUpModal}
          />
        </div>
      </>
    )
  )
}
CartPopUP.propTypes = {
  loading: PropTypes.func,
}

export default CartPopUP
