import React from 'react'

import './style.scss'
import Image from 'components/atoms/image'
import Link from 'components/atoms/link'
import CartCollapse from 'components/molecules/checkout/cart-collapse'
import CheckoutBreadcrumbs from 'components/molecules/checkout/checkout-breadcrumbs'

const CheckoutHeader = () => {
  return (
    <div className="checkout-header">
      <Link to="/">
        <div className="header-image-box">
          <Image
            src="https://cdn.shopify.com/s/files/1/1682/9837/files/IQ-Logo.png?24146"
            alt="img"
            className="header-img"
          />
        </div>
      </Link>
      <CartCollapse />
      <CheckoutBreadcrumbs />
    </div>
  )
}

export default CheckoutHeader
