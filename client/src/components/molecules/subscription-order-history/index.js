/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useContext, useState } from 'react'
import { AppContext } from 'libs/context'
import { getOrdersByUser } from 'libs/services/api/orders.api'
import { Skeleton } from 'antd'
import './style.scss'
import { navigate } from '@reach/router'

const OrderHistory = () => {
  const { user } = useContext(AppContext)
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const [allOrders, setAllOrders] = useState([])
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  useEffect(() => {
    setLoading(true)
    const gett = async () => {
      const userAuthToken =
        user && Object.keys(user).length > 0 && user.accessToken
      const getOrders =
        userAuthToken &&
        userAuthToken.length &&
        (await getOrdersByUser(userAuthToken))
      getOrders &&
        setAllOrders(
          getOrders &&
            getOrders.response &&
            getOrders.response.data &&
            getOrders.response.data.orders,
        )
      getOrders && console.log({ getOrders })
      const ord =
        getOrders &&
        getOrders.response &&
        getOrders.response.data &&
        getOrders.response.data.orders.map(order => {
          return {
            orderId: order.orderId,
            date: order.createdAt,
            total: order.orderTotal,
            paymentStatus: order.payments[0].paymentStatus,
            billingAddress: order.payments[0].billToAddress,
            shippingAddress: order.shipTo,
          }
        })
      ord && ord.length && setOrders(ord)
      setLoading(false)
    }
    gett()
  }, [])

  const goto = orderId => {
    const singleOrder =
      allOrders &&
      allOrders.length &&
      allOrders.filter(order => order.orderId === orderId)
    singleOrder &&
      singleOrder.length > 0 &&
      navigate('/account/singleorderdetail', { state: { singleOrder } })
  }

  return (
    <div className="table-holder">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Order</th>
            <th>Date</th>
            <th>Payment Status</th>
            <th>Fulfillment Status</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <Skeleton active paragraph={false} />
          ) : (
            orders &&
            orders.length &&
            orders.map((order, i) => {
              return (
                <tr className="responsive-table-row" key={i}>
                  <td data-label="order">
                    <div
                      // to={orderLink || `/account/singleorderdetail?orderId=${}`}
                      className="order-history-item-link"
                      onClick={() => goto(order.orderId)}
                    >
                      #ID-{order.orderId}
                    </div>
                  </td>
                  <td data-label="Date">
                    {new Date(order.date).toLocaleDateString(
                      'en-US',
                      dateOptions,
                    )}
                  </td>
                  <td data-label="Payment Status">
                    {order.paymentStatus === 'succeeded' ? 'Paid' : 'Unpaid'}
                  </td>
                  <td data-label="Fulfillment Status">Unfulfilled</td>
                  <td data-label="Total">${order.total}</td>
                </tr>
              )
            })
          )}
        </tbody>
      </table>
    </div>
  )
}

export default OrderHistory
