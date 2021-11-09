import React from 'react'
import PropTypes from 'prop-types'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
import './style.scss'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'

const Accounts = ({
  orderImage,
  orderNumber,
  orderCart,
  orderReview,
  orderPrice,
  orderReorder,
  orderDate,
  orderFullPrice,
  orderStatus,
}) => {
  const [size] = useWindowSize()
  return (
    <div className="account-page">
      {size > 768 ? (
        <>
          <div className="account-image-block">
            <Image
              className="account-image-block__image"
              src={orderImage.url}
              alt={orderImage.altText}
            />
          </div>

          <div className="account-review-block">
            <Label className="account-image-block__orderNumber">
              {orderNumber}
            </Label>
            <Button className="account-image-block__orderCart">
              {orderCart}
            </Button>
            <Button className="account-image-block__orderReview">
              {orderReview}
            </Button>
          </div>
          <div className="account-price-block">
            <Label className="account-image-block__orderPrice">
              ${orderPrice}
            </Label>
            <Button className="account-image-block__orderReorder">
              {orderReorder}
            </Button>
          </div>
          <div className="account-date-block">
            <Label className="account-image-block__orderDate">
              {orderDate}
            </Label>
            <Label className="account-image-block__orderFullPrice">
              ${orderFullPrice}
            </Label>
            <Label className="account-image-block__orderStatus">
              Status:{orderStatus}
            </Label>
          </div>
        </>
      ) : (
        <>
          <div className="account-image-block">
            <Image
              className="account-image-block__image"
              src={orderImage.url}
              alt={orderImage.altText}
            />
          </div>
          <div className="account-mobile-description">
            {size < 768 && (
              <p className="account-mobile-label">
                Vestibulum aliquam, magnis, Size Medium
              </p>
            )}
            <Label className="account-mobile-orderPrice">${orderPrice}</Label>
            <Button className="account-mobile-orderCart">{orderCart}</Button>
            <Button className="account-mobile-orderCart">{orderReorder}</Button>
            <Button className="account-mobile-orderCart">{orderReview}</Button>
          </div>
        </>
      )}
    </div>
  )
}
Accounts.defaultProps = {
  orderImage: {},
  orderNumber: '',
  orderCart: '',
  orderReview: '',
  orderPrice: '',
  orderReorder: '',
  orderDate: '',
  orderFullPrice: '',
  orderStatus: '',
}
Accounts.propTypes = {
  orderImage: PropTypes.object,
  orderNumber: PropTypes.string,
  orderCart: PropTypes.string,
  orderReview: PropTypes.string,
  orderPrice: PropTypes.string,
  orderReorder: PropTypes.string,
  orderDate: PropTypes.string,
  orderFullPrice: PropTypes.string,
  orderStatus: PropTypes.string,
}
export default Accounts
