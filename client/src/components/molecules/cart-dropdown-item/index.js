// export default CartDropdownItem

import React from 'react'
import PropTypes from 'prop-types'

import './styles.scss'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'

import { InputNumber } from 'antd'
// import useRemoveFromCart from 'libs/api-hooks/useRemoveFromCart'

const CartDropdownItem = ({ mainImage, title, size, price, quantity }) => {
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
          <Image src={mainImage} className="cart-item-image" />
        </div>
        <div>
          <div className="item-desc-and-price">
            <div className="item-desc">
              <Label className="item-title">{title}</Label>
              <div className="product-detail-info-cart">
                <Label className="item-info">
                  SIZE: <Label className="item-subInfo">{size}</Label>
                </Label>

                <Label className="item-info">
                  PER CASE: <Label className="item-subInfo">{price}</Label>
                </Label>
                <Label className="item-info">
                  PART NUM:
                  {/* <p className="item-subInfo">{props['Part Number']}</p> */}
                </Label>
              </div>
            </div>

            <div className="product-price-info">
              <Label className="product-price">
                <p className="product-price-mobile">PRICE</p>${price}
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
              {/* <Label className="items-quanity">{quantity}</Label>
            <div className="quantity-buttons">
              <ImageOnlyButton
                onClick={() => updateCartApiCall(itemId, 1)}
                id={itemId}
                imgSrc="/static/icons/arrow-up.png"
                // imgAlt={imageAlt}
                className="quantity-increase-btn"
              />
              <ImageOnlyButton
                onClick={() => updateCartApiCall(itemId, -1)}
                id={itemId}
                imgSrc="/static/icons/arrow-down.png"
                disabled={quantity === 1}
                className="quantity-increase-btn"
              />
            </div> */}

              <p className="product-quantity-mobile">QTY:</p>
              <InputNumber
                className="product-quantity-spinner"
                min={1}
                max={1000}
                defaultValue={quantity}
                // onChange={onChange}
              />
            </div>
            <Label className="total-price">
              <p className="product-total-mobile">TOTAL PRICE</p>$
              {(quantity * price).toFixed(2)}
            </Label>
          </div>
        </div>
        <div className="total-and-quantity-cart-MOBILE">
          <div className="total-and-quantity-cart-and-remove-btn">
            <div className="product-price-info">
              <Label className="product-price">
                <Label className="product-price-mobile">PRICE</Label>${price}
              </Label>
            </div>
            <div className="quantity-box">
              {/* <Label className="items-quanity">{quantity}</Label>
            <div className="quantity-buttons">
              <ImageOnlyButton
                onClick={() => updateCartApiCall(itemId, 1)}
                id={itemId}
                imgSrc="/static/icons/arrow-up.png"
                // imgAlt={imageAlt}
                className="quantity-increase-btn"
              />
              <ImageOnlyButton
                onClick={() => updateCartApiCall(itemId, -1)}
                id={itemId}
                imgSrc="/static/icons/arrow-down.png"
                disabled={quantity === 1}
                className="quantity-increase-btn"
              />
            </div> */}

              <Label className="product-quantity-mobile">QTY:</Label>
              <InputNumber
                className="product-quantity-spinner"
                min={1}
                max={1000}
                defaultValue={quantity}
                // onChange={onChange}
              />
            </div>
            <Label className="total-price">
              <p className="product-total-mobile">TOTAL PRICE</p>$
              {(quantity * price).toFixed(2)}
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
