import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
import './style.scss'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'
import { getItemsBySkus } from 'libs/services/api/item'

const Accounts = ({ orders }) => {
  const [size] = useWindowSize()
  const [fetchedOrders, setFetchedOrders] = useState('')

  useEffect(() => {
    let fetchImages = async orders => {
      let skus = []
      let orderPayload = []

      await orders.map((data, i) => {
        skus.push(data.items[0].sku)
      })

      let images = []
      let itemRes = await getItemsBySkus(skus)
      await orders.map(async (order, j) => {
        await itemRes.data.map((item, i) => {
          if (order.items[0].sku === item.sku) {
            images.push(item.images[0].source[0]?.url)
          }
        })
      })

      await orders.map((data, i) => {
        orderPayload.push({
          ...data,
          image: images[i],
        })
      })

      setFetchedOrders(orderPayload)
    }

    fetchImages(orders)
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
                      src={order.image}
                      alt=""
                    />
                  </div>

                  <div className="account-review-block">
                    <Label className="account-image-block__orderNumber">
                      {order.orderReference}
                    </Label>
                    <Button className="account-image-block__orderCart">
                      Quantity: {order.totalQuantity}
                    </Button>
                    <Button className="account-image-block__orderReview">
                      Reorder
                    </Button>
                  </div>
                  <div className="account-price-block">
                    <Label className="account-image-block__orderPrice">
                      ${order.orderTotal}
                    </Label>
                    <Button className="account-image-block__orderReorder">
                      {order.status.replace('_', ' ')}
                    </Button>
                  </div>
                  <div className="account-date-block">
                    <Label className="account-image-block__orderDate">
                      Items ({order.items.length})
                    </Label>
                    {/* <Label className="account-image-block__orderFullPrice">

                    </Label> */}
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
                      src={order.image}
                      alt=""
                    />
                  </div>
                  <div className="account-mobile-description">
                    {size < 768 && (
                      <p className="account-mobile-label">
                        {order.orderReference}
                      </p>
                    )}
                    <Label className="account-mobile-orderPrice">
                      $ {order.orderTotal}
                    </Label>
                    <Button className="account-mobile-orderCart">
                      Quantity: {order.totalQuantity}
                    </Button>
                    <Button className="account-mobile-orderCart">
                      Items ({order.items.length})
                    </Button>
                    <Button className="account-mobile-orderCart">
                      Status: {order.status.replace('_', ' ')}
                    </Button>
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
