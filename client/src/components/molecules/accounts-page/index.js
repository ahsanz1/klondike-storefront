import React, { useContext, useEffect, useState } from 'react'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
import './style.scss'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import { Pagination, Skeleton } from 'antd'
import { getItemsBySkus } from 'libs/services/api/item'
import { AppContext } from 'libs/context'
import { getOrdersByUser } from 'libs/services/api/orders.api'

const Accounts = () => {
  const perPageItems = 3
  const { user } = useContext(AppContext)
  const [size] = useWindowSize()
  const [fetchedOrders, setFetchedOrders] = useState('')
  const [orders, setOrders] = useState({})
  const [totalOrders, setTotalOrders] = useState(0)

  useEffect(() => {
    fetchOrders(0)
  }, [])

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

  const fetchOrders = async offset => {
    const ordersByUser = await getOrdersByUser(
      user.accessToken,
      offset,
      perPageItems,
    )
    let data = ordersByUser.response.data
    setOrders(data.orders)
    setTotalOrders(data?.query?.count)
  }

  return (
    <div className="account-page">
      {size > 768 ? (
        <div className="account-sections">
          {!fetchedOrders ? (
            <>
              {[1, 2, 3].map(index => (
                <div className="order-history-skeleton" key={index}>
                  <Skeleton.Image />
                  <Skeleton active title={false} paragraph={{ rows: 5 }} />
                </div>
              ))}
            </>
          ) : null}
          {fetchedOrders &&
            fetchedOrders.length > 0 &&
            fetchedOrders.map((order, i) => {
              return (
                <div className="account-section-block" key={i}>
                  <div className="account-image-block">
                    {order.image && (
                      <Image
                        className="account-image-block__image"
                        src={order.image || ''}
                        alt=""
                      />
                    )}
                  </div>

                  <div className="account-review-block">
                    <Label className="account-image-block__orderNumber">
                      Order Number :
                    </Label>
                    {order.orderReference && (
                      <Label className="account-image-block__orderNumberDetail">
                        {order.orderReference}
                      </Label>
                    )}
                  </div>
                  <div className="account-date-block">
                    {order.items && (
                      <Label className="account-image-block__orderDate">
                        Items ({order.items.length})
                      </Label>
                    )}
                    {order.createdAt && (
                      <Label className="account-image-block__orderDate">
                        {order.createdAt.slice(0, 10)}
                      </Label>
                    )}
                    {order.orderTotal && (
                      <Label className="account-image-block__orderPricee">
                        ${order.orderTotal}
                      </Label>
                    )}
                    {order.status && (
                      <Label className="account-image-block__orderStatus">
                        Status: {order.status.replace('_', ' ')}
                      </Label>
                    )}
                    <a
                      href="https://www.google.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Invoice
                    </a>
                  </div>
                </div>
              )
            })}
          <div className="page-no" key="pagination-order-desktop">
            <Pagination
              defaultCurrent={1}
              pageSize={perPageItems}
              total={totalOrders}
              onChange={e => fetchOrders(e)}
            />
          </div>
        </div>
      ) : (
        <>
          {!fetchedOrders ? (
            <>
              {[1, 2, 3].map(index => (
                <div className="order-history-skeleton" key={index}>
                  <Skeleton.Image />
                  <Skeleton active title={false} paragraph={{ rows: 3 }} />
                </div>
              ))}
            </>
          ) : null}
          {fetchedOrders &&
            fetchedOrders.length > 0 &&
            fetchedOrders.map((order, i) => {
              return (
                <div key={i}>
                  {order.items && (
                    <Label className="item-and-amount">
                      Items ({order.items.length})
                    </Label>
                  )}
                  <div className="account-sections">
                    {/* {order.items && (
                     <Label className="account-image-block__orderDate">
                       Items ({order.items.length})
                     </Label>
                   )} */}
                    <div className="account-image-block">
                      {order.image && (
                        <Image
                          className="account-image-block__image"
                          src={order.image}
                          alt=""
                        />
                      )}
                    </div>
                    <div className="account-mobile-description">
                      {size < 768 && order.orderReference && (
                        <div>
                          <p className="account-mobile-label">Order Number :</p>
                          <p className="account-mobile-label">
                            {order.orderReference}
                          </p>
                        </div>
                      )}
                      {order.orderTotal && (
                        <Label className="account-mobile-orderPrice">
                          $ {order.orderTotal}
                        </Label>
                      )}
                      {/* {order.totalQuantity && (
                       <Button className="account-mobile-orderCart">
                         Quantity: {order.totalQuantity}
                       </Button>
                     )}
                     {order.items && (
                       <Button className="account-mobile-orderCart">
                         Items ({order.items.length})
                       </Button>
                     )}
                     {order.status && (
                       <Button className="account-mobile-orderCart">
                         Status: {order.status.replace('_', ' ')}
                       </Button>
                     )} */}
                    </div>
                  </div>
                </div>
              )
            })}
          <div className="page-no" key="pagination-order-mobile">
            <Pagination
              defaultCurrent={1}
              pageSize={perPageItems}
              total={totalOrders}
              onChange={e => fetchedOrders(e)}
            />
          </div>
        </>
      )}
    </div>
  )
}
Accounts.defaultProps = {}
Accounts.propTypes = {}
export default Accounts
