import React from 'react'
import './style.scss'

import Label from 'components/atoms/label'
import Button from 'components/atoms/button'
import PropTypes from 'prop-types'
import Link from 'components/atoms/link'

const EmptyCartMessage = ({
  emptyCartPageTitle,
  emptyCartPageSubtitle,
  emptyCartBtnText,
  emptyCartBtnLink,
}) => {
  return (
    <div className="empty-cart-message">
      <Label className="empty-cart-message-heading">
        {emptyCartPageTitle || 'SHOPPING CART'}
      </Label>
      <Label className="empty-cart-message-text">
        {emptyCartPageSubtitle || 'Your cart is currently empty.'}
      </Label>
      <Link to={emptyCartBtnLink || '/collections/all-bars'}>
        <Button className="empty-cart-message-btn">
          {emptyCartBtnText || 'SHOP NOW'}
        </Button>
      </Link>
    </div>
  )
}

EmptyCartMessage.propTypes = {
  emptyCartPageTitle: PropTypes.string,
  emptyCartPageSubtitle: PropTypes.string,
  emptyCartBtnText: PropTypes.string,
  emptyCartBtnLink: PropTypes.string,
}

export default EmptyCartMessage
