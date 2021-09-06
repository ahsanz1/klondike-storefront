/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react'
import { AppContext } from 'libs/context'
import CartDropdownItem from 'components/molecules/cart-dropdown-item'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import Link from 'components/atoms/link'
import './style.scss'

const CartDropdown = () => {
  const { cartItems, isModalVisible, closeModal, subTotal } = useContext(
    AppContext,
  )
  const [size] = useWindowSize()
  return (
    isModalVisible &&
    size > 768 && (
      <>
        <div
          className="cart-overlay"
          onClick={() => {
            closeModal()
          }}
        ></div>

        <div className="cart-dropdown">
          <div className="cart-dropdown-header">
            <Link className="cart-dropdown-header-label" to="/cart">
              Your Cart
            </Link>
            <Image
              src="/static/icons/close-cross.svg"
              alt="close-cross"
              className="cart-dropdown-header-icon"
              onClick={closeModal}
            />
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
          {subTotal && parseFloat(subTotal) > 0 && (
            <div className="cart-dropdown-total">
              <span className="cart-dd-total-label">Total</span>
              <span className="cart-dropdown-total-amount">$ {subTotal}</span>
            </div>
          )}

          {cartItems && cartItems.length > 0 ? (
            <Link className="cart-dropdown-checkout" to="/checkout">
              Checkout
            </Link>
          ) : (
            <Link
              className="cart-dropdown-checkout"
              to="/collections/all-bars"
              onClick={() => closeModal()}
            >
              SHOP NOW
            </Link>
          )}
        </div>
      </>
    )
  )
}
export default CartDropdown
