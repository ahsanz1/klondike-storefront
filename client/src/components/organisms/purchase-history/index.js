import React, { useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from 'libs/context'
import { Skeleton } from 'antd'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import MyAccountLeftMenu from 'components/molecules/my-account-links'
import { getUserPurchaseHitory } from 'libs/services/api/subscriptions.api'
import requireAuth from 'libs/hoc/authHOC'
import './style.scss'

const PurchaseHistory = ({ label }) => {
  const { user } = useContext(AppContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  useEffect(() => {
    setLoading(true)
    const gett = async () => {
      const userId = user && Object.keys(user).length > 0 && user._id
      const userAuthToken =
        user && Object.keys(user).length > 0 && user.accessToken
      userId && console.log({ userId })
      const userOrders =
        userId && (await getUserPurchaseHitory(userId, userAuthToken))
      userOrders && console.log({ userOrders })
      const details =
        userOrders &&
        userOrders.response &&
        userOrders.response.data &&
        userOrders.response.data.data.orders &&
        userOrders.response.data.data.orders.map(order => {
          return {
            orderNo: order.orderReferenceId,
            creationDate: order.createdAt,
            totalAmount: order.totalAmount,
          }
        })
      details && setOrders(details)
      setLoading(false)
    }
    gett()
  }, [user])
  useEffect(() => {
    orders && orders.length > 0 && console.log({ orders })
  }, [orders])
  return (
    <div className="purchase-history">
      <MyAccountLeftMenu />
      <div className="purchase-history-section">
        <div className="purchase-history-layout">
          <div className="purchase-history-holder">
            <Label className="puchase-history-heading">{label}</Label>
            <div className="purchase-history-table">
              <div className="purchase-history-table-header">
                <Label className="purchase-history-table-header-item">
                  DATE
                </Label>
                <Label className="purchase-history-table-header-item">
                  ORDER
                </Label>
                <Label className="purchase-history-table-header-item item-right">
                  AMOUNT
                </Label>
              </div>
              {loading ? (
                <div
                  style={{
                    marginBottom: '30px',
                    paddingBottom: '30px',
                    borderBottom: '3px solid #cecece',
                  }}
                >
                  <Skeleton active paragraph={false} />
                </div>
              ) : (
                orders.map((order, i) => (
                  <div className="purchase-history-table-items" key={i}>
                    <Label className="purchase-history-table-item">
                      {new Date(order.creationDate).toLocaleDateString(
                        'en-US',
                        dateOptions,
                      )}
                    </Label>
                    <Link
                      className="purchase-history-table-item purchase-history-table-link"
                      to={`/subscription/order-detail?orderId=${order.orderNo}`}
                    >
                      {order.orderNo}
                    </Link>
                    <Label className="purchase-history-table-item item-right">
                      {order.totalAmount.toFixed(2)}
                    </Label>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const { object, string } = PropTypes
PurchaseHistory.propTypes = {
  label: string,
  orders: object,
}

export default requireAuth(PurchaseHistory)
