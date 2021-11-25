// export default CartDropdownItem

import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'

import './styles.scss'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'

import { InputNumber, Modal } from 'antd'
import { removeItemFromCart, updateCartApi } from 'libs/services/api/cart'
import { AppContext } from 'libs/context'
import { setUserCart } from 'libs/utils/user-cart'

const CartDropdownItem = cart => {
  const { setGetCartItemsState, creditLimit, getCartItems } = useContext(
    AppContext,
  )

  const [removing, setRemoving] = useState(false)
  const [updating, setUpdating] = useState(false)

  const error = err => {
    Modal.error({
      title: 'This is an error message',
      content:
        err || 'Due to some technical reasons, this request cannot be sent.',
    })
  }

  const onChange = async (qty, cart) => {
    if (qty === null) {
      return
    }

    let totalAmount = 0
    let existingAmount = getCartItems?.totalAmount?.amount

    if (cart?.quantity > qty) {
      // minimizing
      totalAmount = Math.floor(existingAmount - cart?.price?.base * qty)
    } else {
      let nQty = Math.abs(cart?.quantity - qty)
      totalAmount = Math.floor(existingAmount + cart?.price?.base * nQty)
    }

    if (getCartItems?.hasPackaged && creditLimit <= totalAmount) {
      error('You are exceeding your credit limit')
      return
    }

    let updateCartPayload = {
      items: [
        {
          lineItemId: cart?.lineItemId,
          itemId: cart?.itemId,
          quantity: qty,
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
    await removeItemFromCart(cartId, lineItemId)
    setGetCartItemsState(await setUserCart())
    setRemoving(false)
  }

  return (
    <>
      <div className="mini-cart-item">
        <div className="cart-item">
          <div>
            <img src={cart?.image} className="cart-item-image" alt="" />
          </div>
          <div>
            <div className="item-desc-and-price">
              <div className="item-desc">
                <Label className="item-title notranslate">{cart?.title}</Label>
                <div className="product-detail-info-cart">
                  <Label className="item-info">
                    SIZE: <Label className="item-subInfo">{cart?.size}</Label>
                  </Label>

                  <Label className="item-info">
                    {cart['QTY PER CASE'] ? 'PER CASE:' : ''}
                    <Label className="item-subInfo">
                      {cart['QTY PER CASE']}
                    </Label>
                  </Label>
                  <Label className="item-info">
                    PART NUM:{' '}
                    <Label className="item-subInfo">{cart?.partnumber}</Label>
                  </Label>
                </div>
              </div>

              <div className="product-price-info">
                <Label className="product-price">
                  <p className="product-price-mobile">PRICE</p>$
                  {cart?.price?.base.toFixed(2)}
                </Label>
              </div>
            </div>
          </div>
          <div className="total-and-quantity-cart-MOBILE">
            <div className="total-and-quantity-cart-and-remove-btn">
              <div className="product-price-info">
                <Label className="product-price">
                  PRICE
                  <Label className="product-price-mobile">
                    ${cart?.price?.base.toFixed(2)}
                  </Label>
                </Label>
              </div>
              <div className="quantity-box">
                <Label className="product-quantity-mobile">QTY:</Label>
                <InputNumber
                  className="product-quantity-spinner"
                  min={1}
                  max={1000}
                  type="number"
                  disabled={updating}
                  defaultValue={cart?.quantity}
                  onChange={e => onChange(e, cart)}
                />
              </div>
              <Label className="total-price">
                <p className="product-total-mobile">TOTAL PRICE</p>$
                {cart?.totalPrice?.amount?.toFixed(2)}
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
          <div className="removebtn-div">
            <Button
              className="remove-button"
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
                className="product-quantity-spinner"
                min={1}
                max={1000}
                disabled={updating}
                type="number"
                defaultValue={cart?.quantity}
                onChange={e => onChange(e, cart)}
              />
            </div>
            <Label className="total-price-desktop">
              <p className="product-total-desktop">TOTAL PRICE</p>$
              {cart?.totalPrice?.amount?.toFixed(2)}
            </Label>
          </div>
        </div>
      </div>
    </>
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
