import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Skeleton } from 'antd'
import Heading from 'components/atoms/heading'
import Label from 'components/atoms/label'
import MyAccountLeftMenu from 'components/molecules/my-account-links'
import requireAuth from 'libs/hoc/authHOC'
import './styles.scss'
import { getOrderDetails } from 'libs/services/api/subscriptions.api'

const setSkeleton = () => {
  return <Skeleton active paragraph={false} />
}

const OrderDetails = ({ data }) => {
  const [orderDetails, setOrderDetails] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const getOrderDetailsCall = async () => {
      const getOrderId = new URLSearchParams(location.search).get('orderId')
      const details = getOrderId && (await getOrderDetails(getOrderId))
      details &&
        details.response.data.data.order &&
        setOrderDetails(details.response.data.data.order)
      setLoading(false)
      details &&
        details.response.data.data.order &&
        console.log(details.response.data.data.order)
    }
    getOrderDetailsCall()
  }, [])
  return (
    <div className="order-details">
      <MyAccountLeftMenu />
      <div className="order-details-wrapper">
        <Heading className="order-details__heading">Order Details</Heading>
        <div className="order-details-table">
          <div className="order-details-table-header">
            <Label className="align">PRODUCTS</Label>
            <Label className="align align-center">Quantity</Label>
            <Label className="align align-right">Price</Label>
          </div>
          <div className="order-details-table-details">
            <div className="order-details-table-details-detail">
              {loading ? (
                setSkeleton()
              ) : (
                <>
                  <Label className="align">{orderDetails.itemName}</Label>
                  <Label className="align align-center">
                    {orderDetails.quantity} &#215;{' '}
                    {orderDetails.totalAmount /
                      orderDetails.quantity.toFixed(2)}
                  </Label>
                  <Label className="align align-rightt">
                    {parseFloat(orderDetails.totalAmount.toFixed(2))}
                  </Label>
                </>
              )}
            </div>
            <div className="order-details-table-details-detail">
              {loading ? (
                setSkeleton()
              ) : (
                <>
                  <Label className="align-left">Shipping</Label>
                  <Label className="align-right">
                    {orderDetails.shippingCost
                      ? `$${orderDetails.shippingCost}`
                      : '--'}
                  </Label>
                </>
              )}
            </div>
            <div className="order-details-table-details-detail">
              {loading ? (
                setSkeleton()
              ) : (
                <>
                  <Label className="align-left">Discounts</Label>
                  <Label className="align-right">
                    {orderDetails.discount
                      ? `${orderDetails.discount}%`
                      : '-0.00'}
                  </Label>
                </>
              )}
            </div>
            <div className="order-details-table-details-detail">
              {loading ? (
                setSkeleton()
              ) : (
                <>
                  <Label className="align-left">Taxes</Label>
                  <Label className="align-right">
                    {orderDetails.tax ? `$${orderDetails.tax}` : '--'}
                  </Label>
                </>
              )}
            </div>
            <div className="order-details-table-details-detail">
              {loading ? (
                setSkeleton()
              ) : (
                <>
                  <Label className="align-left">Total</Label>
                  <Label className="align-right">
                    {orderDetails.totalAmount
                      ? `$${orderDetails.totalAmount.toFixed(2)}`
                      : '--'}
                  </Label>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

OrderDetails.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
}

export default requireAuth(OrderDetails)
