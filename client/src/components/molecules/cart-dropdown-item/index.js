// export default CartDropdownItem

import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'

import { InputNumber } from 'antd'
// import useRemoveFromCart from 'libs/api-hooks/useRemoveFromCart'

const CartDropdownItem = cart => {
  // const [removing, setRemoving] = useState(false)
  // const { removeFromCart, error } = useRemoveFromCart()

  // const removeItem = async () => {
  //   setRemoving(true)
  //   await removeFromCart(lineItemId)
  //   setRemoving(false)
  //   if (!error || error) {
  //     setRemoving(false)
  //   }
  // }

  return (
    <div className="mini-cart-item">
      <div className="cart-item">
        <div>
          <img src="abc.jpg" className="cart-item-image" alt="" />
        </div>
        <div>
          <div className="item-desc-and-price">
            <div className="item-desc">
              <Label className="item-title notranslate">{cart?.title}</Label>
              <div className="product-detail-info-cart">
                <Label className="item-info">
                  SIZE: <Label className="item-subInfo">{cart?.sku}</Label>
                </Label>

                <Label className="item-info">
                  PER CASE:{' '}
                  <Label className="item-subInfo">
                    {cart?.price?.base} {cart?.price?.currency}
                  </Label>
                </Label>
              </div>
            </div>

            <div className="product-price-info">
              <Label className="product-price">
                <p className="product-price-mobile">PRICE</p>
                {cart?.totalPrice?.amount} {cart?.totalPrice?.currency}
              </Label>
            </div>
          </div>
          <div className="total-and-quantity-cart">
            <div className="removebtn-div">
              <Button
                className="remove-button"
                //   onClick={removeItem}
                //   disabled={removing && true}
              >
                {/* {removing ? 'Removing' : 'Remove'} */}
                Remove
              </Button>
            </div>
            <div className="quantity-box">
              <Label className="product-quantity-mobile">QTY:</Label>
              <InputNumber
                className="product-quantity-spinner"
                min={1}
                max={1000}
                defaultValue={cart?.quantity}
                // onChange={onChange}
              />
            </div>
            <Label className="total-price">
              <p className="product-total-mobile">TOTAL PRICE</p>
              {cart?.totalPrice?.amount} {cart?.totalPrice?.currency}
            </Label>
          </div>
        </div>
        <div className="total-and-quantity-cart-MOBILE">
          <div className="total-and-quantity-cart-and-remove-btn">
            <div className="product-price-info">
              <Label className="product-price">
                PRICE
                <Label className="product-price-mobile">
                  {cart?.price?.base} {cart?.price?.currency}
                </Label>
              </Label>
            </div>
            <div className="quantity-box">
              <Label className="product-quantity-mobile">QTY:</Label>
              <InputNumber
                className="product-quantity-spinner"
                min={1}
                max={1000}
                defaultValue={cart?.quantity}
                // onChange={onChange}
              />
            </div>
            <Label className="total-price">
              <p className="product-total-mobile">TOTAL PRICE</p>
              {cart?.totalPrice?.amount} {cart?.totalPrice?.currency}
            </Label>
          </div>
          <div className="removebtn-div">
            <Button
              className="remove-button"
              //   onClick={removeItem}
              //   disabled={removing && true}
            >
              {/* {removing ? 'Removing' : 'Remove'} */}
              Remove
            </Button>
          </div>
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
