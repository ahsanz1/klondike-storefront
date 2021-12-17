/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import CartDropdownItem from 'components/molecules/cart-dropdown-item'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import Image from 'components/atoms/image'
import './style.scss'
import { Skeleton } from 'antd'

const CartDropdown = () => {
  const {
    isModalVisible,
    miniCartLoading,
    closeModal,
    getCartItems,
  } = useContext(AppContext)

  let [subTotal, setSubTotal] = useState(0)
  let [cartState, setCartState] = useState(getCartItems)

  useEffect(() => {
    setCartState(getCartItems)
    setSubTotal(getCartItems?.totalAmount?.amount.toFixed(2) || 0.0)
  }, [getCartItems])

  return (
    isModalVisible && (
      // size > 768 &&
      <>
        {/*  <img
          className="mobile-nav-logo"
          src="static/images/mbl-logo.png"
          alt=""
        /> */}
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
                  {`${cartState?.items && cartState?.items?.length} ${
                    cartState?.items && cartState?.items?.length < 2
                      ? 'Item'
                      : 'Items'
                  }`}
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
            {cartState?.hasPackaged ? (
              cartState?.totalPackagedOrderLitres >= 900 ? (
                <p className="free-shipping-banner-text">
                  Congrats! You have got the free shipping!
                </p>
              ) : (
                <p className="free-shipping-banner-text">
                  You are
                  <span className="free-shipping-banner-text-price">{`${parseFloat(
                    900 - cartState?.totalPackagedOrderLitres,
                  ).toFixed(2)}L`}</span>
                  away from free shipping
                </p>
              )
            ) : cartState?.quantity >= 500 ? (
              <p className="free-shipping-banner-text">
                Congrats! You have got the free shipping!
              </p>
            ) : (
              <p className="free-shipping-banner-text">
                You are
                <span className="free-shipping-banner-text-price">
                  {`${
                    cartState?.quantity
                      ? parseFloat(500 - cartState?.quantity || 0)
                      : 500
                  }`}{' '}
                  ltrs{' '}
                </span>
                away from free shipping
              </p>
            )}
          </div>
          {miniCartLoading ? (
            <div className="cart-dropdown-skeleton">
              <Skeleton.Image />
              <Skeleton active paragraph={{ rows: 3 }} />
            </div>
          ) : (
            // <h1 style={{ color: 'gray' }}>Loading...</h1>
            <div className="cart-dropdown-items">
              {cartState?.items && cartState?.items.length > 0 ? (
                cartState?.items.map((cartItem, id) => {
                  let cart = { cartId: cartState?._id, ...cartItem }
                  return <CartDropdownItem {...cart} key={id} />
                })
              ) : (
                <Label className="no-item">No items are in your cart.</Label>
              )}
            </div>
          )}

          {/* {getCartItems?.items?.length &&
          !getCartItems?.hasPackaged &&
          getCartItems?.quantity < 500 ? (
              <div
                style={{
                  display: 'flex',
                  'justify-content': 'flex-end',
                  'margin-right': '65px',
                  'font-size': '16px',
                }}
              >
                <span style={{ color: 'rgb(250, 146, 0)' }}>
                Orders below 500L are subject to an under-a-minimum fee.
                </span>
              </div>
            ) : (
              ''
            )} */}
          {cartState?.items && cartState?.items.length > 0 ? (
            <div className="cart-dropdown-checkout-container">
              <div className="cart-dropdown-checkout-details">
                <div className="order-subtotal-and-checkout-btn">
                  <p className="subtotal-title">Subtotal</p>
                  <p className="subtotal-price">
                    {console.log('updating', subTotal)}
                    <span>{`$${Number(subTotal).toLocaleString()}`}</span>
                  </p>
                </div>
                {cartState?.items?.length &&
                !cartState?.hasPackaged &&
                cartState?.quantity < 500 ? (
                    <div className="message-style">
                      <span style={{ color: 'rgb(250, 146, 0)' }}>
                      Orders below 500L are subject to an under-a-minimum fee.
                      </span>
                    </div>
                  ) : (
                    ''
                  )}
                <div className="cart-dropdown-checkout">
                  <Link
                    className="cart-dropdown-checkout"
                    to="/Checkoutsection"
                  >
                    CHECKOUT
                  </Link>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </>
    )
  )
}
CartDropdown.propTypes = {
  loading: PropTypes.func,
}
export default CartDropdown
