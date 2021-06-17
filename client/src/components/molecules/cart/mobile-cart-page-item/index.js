import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './style.scss'
// import { AppContext } from 'libs/context'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'
import ImageOnlyButton from 'components/atoms/image-only-button'
import useRemoveFromCart from 'libs/api-hooks/useRemoveFromCart'
import useUpdateCart from 'libs/api-hooks/useUpdateCart'

const MobileCartPageItem = ({
  lineItemId,
  mainImage,
  title,
  size,
  price,
  itemId,
  quantity,
  totalBars,
}) => {
  // const { apiButtonCalled } = useContext(AppContext)
  const [removing, setRemoving] = useState(false)
  const { removeFromCart, error } = useRemoveFromCart()
  const { updateCartApiCall } = useUpdateCart()

  const removeItem = async () => {
    setRemoving(true)
    await removeFromCart(lineItemId)
    setRemoving(false)
    if (!error || error) {
      setRemoving(false)
    }
  }

  return (
    <div className="mobile-cart">
      <div className="mobile-cart-page-item">
        <Image src={mainImage} alt="alt" className="cart-item-image" />
        <div className="product-desc">
          <Label className="product-title">{title}</Label>
          {size && <Label className="product-bar-quantity">size: {size}</Label>}
          {totalBars && (
            <Label className="product-bar-quantity">{size} Bars</Label>
          )}
          <Button
            className="remove-button"
            onClick={removeItem}
            disabled={removing && true}
          >
            {removing ? 'Removing' : 'Remove'}
          </Button>
        </div>
        <div className="price">
          <Label className="price-label">PRICE</Label>
          <Label className="product-price">${price.toFixed(2)}</Label>
        </div>
        <div className="quantity">
          <Label className="button-label">QUANTITY</Label>
          <div className="button-controls">
            <Label className="items-quanity">{quantity}</Label>

            <ImageOnlyButton
              className="quantity-decrease-btn"
              imgAlt="alt"
              imgSrc="/static/icons/decrease-quantity.svg"
              disabled={quantity === 1}
              onClick={() => updateCartApiCall(itemId, -1)}
            />

            <ImageOnlyButton
              className="quantity-increase-btn"
              imgAlt="alt"
              imgSrc="/static/icons/increase-quantity.svg"
              onClick={() => updateCartApiCall(itemId, 1)}
            />
          </div>
        </div>
        <div className="total">
          <Label className="total-label">TOTAL</Label>
          <Label className="total-price">
            ${(quantity * price).toFixed(2)}
          </Label>
        </div>
      </div>
    </div>
  )
}

MobileCartPageItem.propTypes = {
  lineItemId: PropTypes.number,
  itemId: PropTypes.number,
  mainImage: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  totalBars: PropTypes.number,
}

export default MobileCartPageItem
