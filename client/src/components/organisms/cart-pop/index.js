/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react'
import { AppContext } from 'libs/context'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import Link from 'components/atoms/link'
import './style.scss'

const CartPopUP = () => {
  const {
    //  cartItems,
    cartData,
    cartPopupModal,
    closePopUpModal,
    showModal,
    // subTotal,
  } = useContext(AppContext)

  const cartItems = [
    {
      mainImage: 'static/images/klondike4.png',
      itemId: 0,
      title: '15W-40 CK-4 Advanced Formula',
      size: 208,
      price: 110,
      partnum: 'KL-GL1390',
      percase: 12,
      quantity: 3,
    },
    {
      mainImage: 'static/images/klondike2.png',
      itemId: 1,
      title: '85W-140 GL-5',
      size: 946,
      partnum: 'KL-HD0540',
      percase: 12,
      price: 110,
      quantity: 2,
    },
  ]

  const latestItem = cartItems[cartItems.length - 1]
  const handleClick = () => {
    closePopUpModal()
    showModal()
  }
  console.log({ cartData })
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
            <Image className="pop-up-image" src={latestItem.mainImage} />
            <Label className="pop-up-text">Added to cart</Label>
          </div>
          <div className="subtotal-and-free-delivery-info">
            <div className="subtotal-section">
              <Label className="subtotal-section-text">
                Cart Subtotal ({cartData?.quantity} items):
              </Label>
              <Label className="subtotal-section-price">
                ${cartData?.totalAmount?.amount}
              </Label>
            </div>
            <Label className="free-shipping-banner">
              You are
              <Label className="free-shipping-banner-text-price"> $20 </Label>
              away from free shipping
            </Label>
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
            <Link to="/Checkoutsection" className="CheckoutBtn">
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
