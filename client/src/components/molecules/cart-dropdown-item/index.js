// export default CartDropdownItem

import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import './styles.scss'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'

import { InputNumber, Modal } from 'antd'
import { removeItemFromCart, updateCartApi } from 'libs/services/api/cart'
import { AppContext } from 'libs/context'
import { setUserCart } from 'libs/utils/user-cart'

const CartDropdownItem = (cartData, key) => {
  const { setGetCartItemsState, creditLimit, getCartItems } = useContext(
    AppContext,
  )

  const [cart, setCart] = useState(cartData)
  const [removing, setRemoving] = useState(false)
  const [updating, setUpdating] = useState(false)
  const [cartItemQty, setCartItemQty] = useState(null)

  const ENTER_KEY = 'Enter'

  useEffect(() => {
    setCart(cartData)
  }, [cartData])

  const error = err => {
    Modal.error({
      title: 'This is an error message',
      content:
        err || 'Due to some technical reasons, this request cannot be sent.',
    })
  }

  const onChangeQty = async (qty, cart) => {
    if (qty === null) {
      return
    }

    let totalAmount = 0
    let existingAmount = getCartItems?.totalAmount?.amount

    if (cart?.quantity > qty) {
      // minimizing
      totalAmount = 0
    } else {
      let nQty = Math.abs(cart?.quantity - qty)
      totalAmount = Math.floor(existingAmount + cart?.price?.base * nQty)
    }

    if (getCartItems?.hasPackaged && creditLimit <= totalAmount) {
      error('You are exceeding your credit limit')
    }

    let updateCartPayload = {
      items: [
        {
          lineItemId: cart?.lineItemId,
          itemId: cart?.itemId,
          quantity: qty === '' ? 0 : qty,
          price: cart?.price,
        },
      ],
    }

    setUpdating(true)
    await updateCartApi(cart?.cartId, updateCartPayload)
    setGetCartItemsState(await setUserCart())
    setUpdating(false)
  }

  const removeItem = async (cartId, lineItemId) => {
    setRemoving(true)
    const removeItemRes = await removeItemFromCart(cartId, lineItemId)
    if (removeItemRes && removeItemRes.data) {
      const userCartRes = await setUserCart()
      setGetCartItemsState(userCartRes)
    }
    setRemoving(false)
  }

  const handleCartItemQtyChange = qty => {
    setCartItemQty(qty)
  }

  const onSubmitUpdatedQty = (e, cart) => {
    if (e && e.key === ENTER_KEY) {
      onChangeQty(e.target.value, cart)
    }
  }

  return (
    <div className="mini-cart-item" key={key}>
      <div className="cart-item">
        <div className="cart-image-container">
          <img src={cart?.image} className="cart-item-image" alt="" />
        </div>
        <div>
          <div className="item-desc-and-price">
            <div className="item-desc">
              <Label className="item-title notranslate">{cart?.title}</Label>
              <div className="product-detail-info-cart">
                <Label className="item-info">
                  SIZE <Label className="item-subInfo">{cart?.size}</Label>
                </Label>

                <Label className="item-info">
                  {cart?.percase ? 'PER CASE' : ''}
                  <Label className="item-subInfo">{cart?.percase}</Label>
                </Label>
                <Label className="item-info">
                  PART NUM{' '}
                  <Label className="item-subInfo">{cart?.partnumber}</Label>
                </Label>
              </div>
            </div>

            <div className="product-price-info">
              <Label className="product-price">
                <p className="product-price-mobile ">PRICE</p>$
                {Number(cart?.price?.base.toFixed(2)).toLocaleString() || ''}
              </Label>
            </div>
          </div>
          <span
            style={{
              fontSize: '14px',
              opacity: updating ? 1 : 0,
              paddingLeft: '23.5vw',
              paddingTop: '1vw',
            }}
          >
            Please Wait...
          </span>
        </div>
        <div className="total-and-quantity-cart-MOBILE">
          <span
            style={{
              fontSize: '14px',
              opacity: updating ? 1 : 0,
              paddingLeft: '7vw',
            }}
          >
            Please Wait...
          </span>
          <div className="total-and-quantity-cart-and-remove-btn">
            <div className="product-price-info">
              <Label className="product-price">
                Price
                <Label className="product-price-mobile mobile-pricing">
                  ${Number(cart?.price?.base.toFixed(2)).toLocaleString() || ''}
                </Label>
              </Label>
            </div>
            <div className="quantity-box">
              <Label className="product-quantity-mobile">QTY:</Label>
              <InputNumber
                className="product-quantity-spinner"
                min={1}
                // max={1000}
                type="number"
                disabled={updating}
                defaultValue={cart?.quantity}
                value={cartItemQty || cart?.quantity}
                onChange={value => handleCartItemQtyChange(value)}
                onKeyDown={e => onSubmitUpdatedQty(e, cart)}
              />
            </div>
            <Label className="total-price">
              <p className="product-total-mobile">TOTAL PRICE</p>
              <span className="product-total-amount">
                $
                {Number(
                  cart?.totalPrice?.amount?.toFixed(2),
                ).toLocaleString() || ''}
              </span>
            </Label>
          </div>
          <div className="removebtn-div">
            <Button
              className="remove-button"
              onClick={e => removeItem(cart?.cartId, cart?.lineItemId)}
              disabled={removing}
            >
              {removing ? 'Removing...' : 'Remove'}
            </Button>
          </div>
        </div>
      </div>
      <div className="total-and-quantity-cart">
        <div className="removebtn">
          <Button
            className="remove_button"
            onClick={e => removeItem(cart?.cartId, cart?.lineItemId)}
            disabled={removing}
          >
            {removing ? 'Removing...' : 'Remove'}
          </Button>
        </div>
        <div className="quantity-block">
          <div className="quantity-box">
            <Label className="product-quantity-mobile">QTY:</Label>
            <InputNumber
              className="product-quantity-spinner desktop cart-dropdown-qty-desktop"
              min={1}
              // max={1000}
              disabled={updating}
              type="number"
              value={cart?.quantity}
              onChange={e => onChangeQty(e, cart)}
              onKeyDown={e => e.preventDefault()}
            />
          </div>
          <Label className="total-price-desktop">
            <p className="product-total-desktop">TOTAL PRICE</p>$
            {Number(cart?.totalPrice?.amount?.toFixed(2)).toLocaleString() ||
              ''}
          </Label>
        </div>
      </div>
    </div>
  )
}

CartDropdownItem.DefaultProps = {
  lineItemId: 0,
  mainImage: '',
  title: '',
  size: '',
  price: 0,
  quantity: 1,
}

CartDropdownItem.propTypes = {
  lineItemId: PropTypes.number,
  mainImage: PropTypes.string,
  singleCartItem: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
}

export default CartDropdownItem
