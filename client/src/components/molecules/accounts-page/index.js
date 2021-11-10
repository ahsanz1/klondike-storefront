import React from 'react'
import PropTypes from 'prop-types'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
import './style.scss'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'

const Accounts = ({ order, orderCart, orderReview, orderReorder }) => {
  const [size] = useWindowSize()
  return (
    <div className="account-page">
      {size > 768 ? (
        <>
          <div className="account-image-block">
            <Image className="account-image-block__image" src="" alt="" />
          </div>

          <div className="account-review-block">
            <Label className="account-image-block__orderNumber">#123378</Label>
            <Button className="account-image-block__orderCart">
              {orderCart}
            </Button>
            <Button className="account-image-block__orderReview">
              {orderReview}
            </Button>
          </div>
          <div className="account-price-block">
            <Label className="account-image-block__orderPrice">
              12,000 USD
            </Label>
            <Button className="account-image-block__orderReorder">
              Untracked
            </Button>
          </div>
          <div className="account-date-block">
            <Label className="account-image-block__orderDate">2020-12-09</Label>
            <Label className="account-image-block__orderFullPrice">
              15000 USD
            </Label>
            <Label className="account-image-block__orderStatus">
              Status: Completed
            </Label>
          </div>
        </>
      ) : (
        <>
          <div className="account-image-block">
            <Image className="account-image-block__image" src="" alt="" />
          </div>
          <div className="account-mobile-description">
            {size < 768 && (
              <p className="account-mobile-label">
                Vestibulum aliquam, magnis, Size Medium
              </p>
            )}
            <Label className="account-mobile-orderPrice">12,000 USD</Label>
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
  order: '',
  orderCart: '',
  orderReview: '',
  orderDate: '',
}
Accounts.propTypes = {
  order: PropTypes.string,
  orderCart: PropTypes.string,
  orderReview: PropTypes.string,
  orderReorder: PropTypes.string,
}
export default Accounts
