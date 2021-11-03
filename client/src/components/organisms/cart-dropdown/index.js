/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'libs/context'
import CartDropdownItem from 'components/molecules/cart-dropdown-item'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import './style.scss'
import { getCartByUserId } from 'libs/api/cart'

const CartDropdown = () => {
  const { isModalVisible, closeModal } = useContext(AppContext)

  const { user } = useContext(AppContext)
  let [cartItems, setCartItemsState] = useState('')

  useEffect(() => {
    const getCart = async () => {
      let res = await getCartByUserId(user.accessToken)
      setCartItemsState(res.data)
    }

    getCart()
  }, [])

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
                  {cartItems?.items?.length} Items
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
            {cartItems.items && cartItems.items.length > 0 ? (
              cartItems.items.map((cartItem, id) => {
                return <CartDropdownItem {...cartItem} key={id} />
              })
            ) : (
              <Label className="no-item">No items are in your cart.</Label>
            )}
          </div>

          {cartItems.items && cartItems.items.length > 0 ? (
            <div className="cart-dropdown-checkout-container">
              <div className="cart-dropdown-checkout-details">
                <div className="order-subtotal-and-checkout-btn">
                  <p className="subtotal-title">Subtotal</p>
                  <p className="subtotal-price">
                    {cartItems?.totalAmount?.amount}{' '}
                    {cartItems?.totalAmount?.currency}
                  </p>
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
