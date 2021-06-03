import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './style.scss'
// import { AppContext } from 'libs/context'
import useRemoveFromCart from 'libs/api-hooks/useRemoveFromCart'
import useUpdateCart from 'libs/api-hooks/useUpdateCart'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'
import ImageOnlyButton from 'components/atoms/image-only-button'

const DesktopCartPageItem = ({
  mainImage,
  title,
  size,
  price,
  quantity,
  itemId,
  lineItemId,
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
    <div className="cart-page-item">
      <Image src={mainImage} className="cart-item-image" />
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
      <Label className="product-price">${price.toFixed(2)}</Label>
      <div className="quantity-buttons">
        <Label className="items-quanity">{quantity}</Label>
        <ImageOnlyButton
          onClick={() => updateCartApiCall(itemId, -1)}
          id={itemId}
          imgSrc="/static/icons/decrease-quantity.svg"
          disabled={quantity === 1}
          className="quantity-increase-btn"
        />
        <ImageOnlyButton
          onClick={() => updateCartApiCall(itemId, 1)}
          id={itemId}
          imgSrc="/static/icons/increase-quantity.svg"
          // imgAlt={imageAlt}
          className="quantity-increase-btn"
        />
      </div>
      <Label className="total-price">${(quantity * price).toFixed(2)}</Label>
    </div>
  )
}

DesktopCartPageItem.propTypes = {
  itemId: PropTypes.number,
  lineItemId: PropTypes.number,
  mainImage: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  totalBars: PropTypes.number,
}

export default DesktopCartPageItem
