/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect } from 'react'
import { AppContext } from 'libs/context'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import Link from 'components/atoms/link'
import './style.scss'

const CartPopUP = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  const {
    //  cartItems,
    cartPopupModal,
    getCartItems,
    closePopUpModal,
    showModal,
    pdpProductData,
    setCartAmount,
    // subTotal,
  } = useContext(AppContext)

  const freeShippingAmount = 500

  // const cartItems = [
  //   {
  //     mainImage: 'static/images/klondike4.png',
  //     itemId: 0,
  //     title: '15W-40 CK-4 Advanced Formula',
  //     size: 208,
  //     price: 110,
  //     partnum: 'KL-GL1390',
  //     percase: 12,
  //     quantity: 3,
  //   },
  //   {
  //     mainImage: 'static/images/klondike2.png',
  //     itemId: 1,
  //     title: '85W-140 GL-5',
  //     size: 946,
  //     partnum: 'KL-HD0540',
  //     percase: 12,
  //     price: 110,
  //     quantity: 2,
  //   },
  // ]

  // const latestItem = cartItems[cartItems.length - 1]
  const handleClick = () => {
    closePopUpModal()
    showModal()
  }
  useEffect(() => {
    setCartAmount(getCartItems?.totalAmount?.amount)
  }, [getCartItems])
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
            {getCartItems?.totalAmount?.amount >= freeShippingAmount ? (
              <Label className="free-shipping-banner">
                Congrats! You have got the free shipping!
              </Label>
            ) : (
              <Label className="free-shipping-banner">
                You are
                <Label className="free-shipping-banner-text-price">{`$${parseFloat(
                  freeShippingAmount - getCartItems?.totalAmount?.amount,
                ).toFixed(2)}`}</Label>
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
export default CartPopUP
