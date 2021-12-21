/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-unescaped-entities */
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

  const [subTotal, setSubTotal] = useState(0)
  const [cartState, setCartState] = useState(getCartItems)
  const [isPackagedFree, setIsPackagedFree] = useState(false)
  const [isBulkFree, setIsBulkFree] = useState(false)
  const [freePkgDiff, setFreePkgDiff] = useState(900)
  const [freeBulkDiff, setFreeBulkDiff] = useState(500)

  useEffect(() => {
    setCartState(getCartItems)
    setSubTotal(getCartItems?.totalAmount?.amount.toFixed(2) || 0.0)
  }, [getCartItems])

  useEffect(() => {
    if (cartState.hasPackaged) {
      if (cartState.totalPackagedOrderLitres >= 900) {
        setIsPackagedFree(true)
      } else {
        setFreePkgDiff(
          parseFloat(900 - cartState.totalPackagedOrderLitres).toFixed(2),
        )
      }
    } else if (cartState.quantity >= 500) {
      setIsBulkFree(true)
    } else {
      setFreeBulkDiff(500 - cartState.quantity)
    }
  }, [cartState])

  return isModalVisible ? (
    <div className="cart-dropdown-container">
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
                {`${
                  cartState?.items && cartState?.items?.length > 0
                    ? cartState?.items?.length
                    : ''
                } ${
                  cartState?.items && cartState?.items?.length === 0
                    ? ''
                    : cartState?.items?.length < 2
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
        <div className="free-shipping-banner-container">
          {cartState && cartState.hasPackaged && isPackagedFree && (
            <span>Congratulations, you've got free shipping</span>
          )}
          {cartState && cartState.hasPackaged && !isPackagedFree && (
            <span>
              You are{' '}
              <span className="free-litre-pkg">{`${freePkgDiff}L`}</span> away
              from free shipping
            </span>
          )}
          {cartState && !cartState.hasPackaged && isBulkFree && (
            <span>Congratulations, you've got free shipping.</span>
          )}
          {cartState && !cartState.hasPackaged && !isBulkFree && (
            <span>
              You are{' '}
              <span className="free-litre-bulk">{`${freeBulkDiff} ltrs`}</span>{' '}
              away from free shipping
            </span>
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
              <Label className="no-item">Your cart is empty</Label>
            )}
          </div>
        )}
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
                ) : null}
              <div className="cart-dropdown-checkout">
                <Link className="cart-dropdown-checkout" to="/checkout">
                  CHECKOUT
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : null
}
CartDropdown.propTypes = {
  loading: PropTypes.func,
}
export default CartDropdown
