import React, { useContext, useEffect } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import './style.scss'
import Image from 'components/atoms/image'
import Link from 'components/atoms/link'
import { getItem } from 'libs/services/localStorage'
import { clearCart } from 'libs/services/cart-service'

const CheckoutSuccess = () => {
  const { checkoutEmail, personalInfo, clearLocalCart } = useContext(AppContext)

  useEffect(() => {
    clearCart()
    clearLocalCart()
  }, [])

  return (
    <div className="checkout-success">
      <div className="iconHolder">
        <Image
          src="https://images.vexels.com/media/users/3/157931/isolated/preview/604a0cadf94914c7ee6c6e552e9b4487-curved-check-mark-circle-icon-by-vexels.png"
          alt="alt"
          className="tick-icon"
        />
      </div>
      <div className="text-section">
        <h3>Thank you for your purchase!</h3>
        <span className="text">
          A confirmation email has been sent to{' '}
          {personalInfo && Object.keys(personalInfo).length > 0
            ? personalInfo.email
            : checkoutEmail.isEmail}{' '}
          Order#
          {getItem('orderID')}{' '}
        </span>
        <Link to="/collections/all-bars">Continue shopping</Link>
        {/* <Link>Print receipt</Link> */}
      </div>
    </div>
  )
}

CheckoutSuccess.propTypes = {
  price: PropTypes.number,
  quantity: PropTypes.number,
  size: PropTypes.string,
  title: PropTypes.string,
  mainImage: PropTypes.string,
}

export default CheckoutSuccess
