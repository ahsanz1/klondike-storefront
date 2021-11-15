import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
import './style.scss'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'

const Accounts = ({ orders }) => {
  const [size] = useWindowSize()
  const [fetchedOrders, setFetchedOrders] = useState('')

  useEffect(() => {
    setFetchedOrders(orders)
  }, [orders])

  return (
    <div className="account-page">
      {size > 768 ? (
        <div className="account-sections">
          {fetchedOrders &&
            fetchedOrders.map((order, i) => {
              return (
                <div className="account-section-block" key={i}>
                  <div className="account-image-block">
                    <Image
                      className="account-image-block__image"
                      src=""
                      alt=""
                    />
                  </div>

                  <div className="account-review-block">
                    <Label className="account-image-block__orderNumber">
                      {order.orderReference}/
                    </Label>
                    <Button className="account-image-block__orderCart">
                      {order.totalQuantity}
                    </Button>
                    <Button className="account-image-block__orderReview">
                      234
                    </Button>
                  </div>
                  <div className="account-price-block">
                    <Label className="account-image-block__orderPrice">
                      12,000 USD
                    </Label>
                    <Button className="account-image-block__orderReorder">
                      {order.status}
                    </Button>
                  </div>
                  <div className="account-date-block">
                    <Label className="account-image-block__orderDate">12</Label>
                    <Label className="account-image-block__orderFullPrice">
                      ${order.orderTotal}
                    </Label>
                    <Label className="account-image-block__orderStatus">
                      Status: {order.status.replace('_', ' ')}
                    </Label>
                  </div>
                </div>
              )
            })}
        </div>
      ) : (
        <>
          {fetchedOrders &&
            fetchedOrders.map((order, i) => {
              return (
                <div className="account-sections" key={i}>
                  <div className="account-image-block">
                    <Image
                      className="account-image-block__image"
                      src=""
                      alt=""
                    />
                  </div>
                  <div className="account-mobile-description">
                    {size < 768 && (
                      <p className="account-mobile-label">
                        Vestibulum aliquam, magnis, Size Medium
                      </p>
                    )}
                    <Label className="account-mobile-orderPrice">
                      $ {order.orderTotal}
                    </Label>
                    <Button className="account-mobile-orderCart">1</Button>
                    <Button className="account-mobile-orderCart">2</Button>
                    <Button className="account-mobile-orderCart">3</Button>
                  </div>
                </div>
              )
            })}
        </>
      )}
    </div>
  )
}
Accounts.defaultProps = {
  orders: '',
}
Accounts.propTypes = {
  orders: PropTypes.string,
}
export default Accounts
