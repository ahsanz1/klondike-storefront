/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react'
import { AppContext } from 'libs/context'
import CartDropdownItem from 'components/molecules/cart-dropdown-item'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import './style.scss'

const CartDropdown = () => {
  const {
    //  cartItems,
    isModalVisible,
    closeModal,
    subTotal,
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

  return (
    isModalVisible && (
      // size > 768 &&
      <>
        <img
          className="mobile-nav-logo"
          src="static/images/mbl-logo.png"
          alt=""
        />
        <div className="cart-header"></div>
        <div
          className="cart-overlay"
          onClick={() => {
            closeModal()
          }}
        ></div>
        <div className="cart-dropdown">
          <div className="cart-header"></div>
          <div className="cart-dropdown-header">
            <div className="cart-name-and-no-of-items">
              <div className="cart-name-and-no-of-items">
                <div>
                  <Label className="cart-text">CART</Label>
                </div>
                <div className="cart-dropdown-header-item-no">
                  {/* <p> */}
                  {cartItems.length} Items
                  {/* </p> */}
                </div>
              </div>
            </div>
            <Image
              src="/static/icons/closecrosswhite.svg"
              alt="close-cross"
              className="cart-dropdown-header-icon"
              onClick={closeModal}
            />
          </div>
          <div className="free-shipping-banner">
            <p className="free-shipping-banner-text">
              You are <p className="free-shipping-banner-text-price">$20</p>
              away from free shipping
            </p>
          </div>
          <div className="cart-dropdown-items">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((cartItem, id) => {
                return <CartDropdownItem {...cartItem} key={id} />
              })
            ) : (
              <Label className="no-item">No items are in your cart.</Label>
            )}
          </div>

          {cartItems && cartItems.length > 0 ? (
            <div className="cart-dropdown-checkout-container">
              <div className="cart-dropdown-checkout-details">
                <div className="order-subtotal-and-checkout-btn">
                  <p className="subtotal-title">Subtotal</p>
                  <p className="subtotal-price">${subTotal}</p>
                </div>
                <div className="cart-dropdown-checkout">CHECKOUT</div>
              </div>
            </div>
          ) : null
          // (
          //   <Link
          //     className="cart-dropdown-checkout"
          //     to="/collections/all-bars"
          //     onClick={() => closeModal()}
          //   >
          //     SHOP NOW
          //   </Link>
          // )
          }
        </div>
      </>
    )
  )
}
export default CartDropdown
