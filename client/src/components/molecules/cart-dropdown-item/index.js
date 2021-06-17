import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './styles.scss'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'

import useRemoveFromCart from 'libs/api-hooks/useRemoveFromCart'

const CartDropdownItem = ({
  mainImage,
  title,
  size,
  price,
  quantity,
  lineItemId,
  totalBars,
}) => {
  const [removing, setRemoving] = useState(false)
  const { removeFromCart, error } = useRemoveFromCart()

  const removeItem = async () => {
    setRemoving(true)
    await removeFromCart(lineItemId)
    setRemoving(false)
    if (!error || error) {
      setRemoving(false)
    }
  }

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <Image src={mainImage} />
      </div>
      <div className="cart-item-details">
        <Label className="cart-item-title">{title}</Label>
        <div className="cart-item-subdetails">
          {size && (
            <Label className="cart-item-subdetails-label"> size: {size}</Label>
          )}
          {totalBars && (
            <Label className="cart-item-subdetails-label">{`${totalBars} bars`}</Label>
          )}
          <Label className="cart-item-subdetails-label">
            {' '}
            Quantity: {quantity}
          </Label>
        </div>
      </div>
      <div className="cart-item-pricing">
        <Label className="cart-item-pricing-label">
          ${(quantity * price).toFixed(2)}
        </Label>
        <Button
          onClick={removeItem}
          disabled={removing && true}
          className="cart-item-pricing-label"
        >
          {removing ? 'Removing' : 'Remove'}
        </Button>
      </div>
    </div>
  )
}

CartDropdownItem.propTypes = {
  lineItemId: PropTypes.number,
  mainImage: PropTypes.string,
  singleCartItem: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  totalBars: PropTypes.number,
}

export default CartDropdownItem
