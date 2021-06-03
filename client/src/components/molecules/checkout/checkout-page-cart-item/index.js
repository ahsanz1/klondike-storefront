import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'

const CheckoutPageCartItem = ({ mainImage, title, size, price, quantity }) => {
  return (
    <div className="checkout-page-cart-item">
      <div className="img-qty-box">
        <div className="img-qty-box-wrapper">
          <Image src={mainImage} alt="alt" className="box-img" />
        </div>
        <span className="box-qty">{quantity}</span>
      </div>
      <div className="info-box">
        <Label className="product-title">{title}</Label>
        {size && <Label className="product-bar-quantity">size: {size}</Label>}
        <Label className="product-bar-quantity">Quantity: {quantity}</Label>
      </div>
      <Label className="item-price">${price.toFixed(2) * quantity}</Label>
    </div>
  )
}

CheckoutPageCartItem.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  size: PropTypes.string,
  title: PropTypes.string,
  mainImage: PropTypes.string,
}

export default CheckoutPageCartItem
