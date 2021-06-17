/* eslint-disable indent */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Container from 'components/molecules/container'
import Label from 'components/atoms/label'
import Heading from 'components/atoms/heading'
import Link from 'components/atoms/link'
import requireAuth from 'libs/hoc/authHOC'
import { useLocation } from '@reach/router'
import './style.scss'
import { Skeleton } from 'antd'

const SingleOrderDetails = ({
  billingAddress,
  paymentLabel,
  shippingAddress,
}) => {
  const location = useLocation()
  const [orderDetails, setOrderDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  useEffect(() => {
    setLoading(true)
    if (
      location &&
      location.state &&
      location.state.singleOrder &&
      Object.keys(location.state.singleOrder).length > 0
    ) {
      // navigate('/account')
      setLoading(false)
    }
    const getOrder =
      location &&
      location.state &&
      location.state.singleOrder &&
      location.state.singleOrder.length > 0 &&
      location.state.singleOrder[0]
    const orderDetails =
      getOrder &&
      Object.keys(getOrder).length > 0 &&
      getOrder.items.map(order => {
        return {
          title: order.title,
          price: order.price,
          sku: order.sku,
          quantity: order.quantity,
          total: order.total,
          shippingDetails: getOrder.shipTo,
          billingDetails: getOrder.payments[0],
          orderId: getOrder.orderId,
          createdAt: getOrder.createdAt,
        }
      })
    orderDetails && orderDetails.length > 0 && setOrderDetails(orderDetails)
    setLoading(false)
  }, [])

  return (
    <Container className="account-section">
      {loading ? (
        <Skeleton active paragraph={false} />
      ) : (
        orderDetails &&
        orderDetails.length > 0 && (
          <div className="account-section-wrapper">
            <Heading className="top-heading">My Account</Heading>
            <Link className="return-link" to="/account">
              Return to account details
            </Link>
            <h2 className="orderID">
              Order #ID-
              {orderDetails &&
                orderDetails.length > 0 &&
                orderDetails[0].orderId}
            </h2>
            <h4 className="orderDate">
              {new Date(orderDetails[0].createdAt).toLocaleDateString(
                'en-US',
                dateOptions,
              )}
            </h4>
            <div className="SingleOrdertable">
              <div className="tableHolder">
                <div className="tableColumn">
                  <div className="tableLabel">
                    <div className="labelHolder">
                      <Label className="dataLabel">Product</Label>
                    </div>
                    <div className="labelHolder">
                      <Label className="dataLabel">SKU</Label>
                    </div>

                    <div className="labelHolder">
                      <Label className="dataLabel">Price</Label>
                    </div>

                    <div className="labelHolder">
                      <Label className="dataLabel">Quantity</Label>
                    </div>

                    <div className="labelHolder">
                      <Label className="dataLabel">Total</Label>
                    </div>
                  </div>
                  {orderDetails &&
                    orderDetails.length &&
                    orderDetails.map((order, i) => (
                      <div className="tableDataRow" key={i}>
                        <div className="row">
                          <div className="tableData">
                            <Link
                              className="link"
                              to={`/products?sku=${order.sku}`}
                            >
                              {order.title}
                            </Link>
                          </div>
                        </div>

                        <div className="row">
                          <div className="tableData">{order.sku}</div>
                        </div>

                        <div className="row">
                          <div className="tableData">{order.price}</div>
                        </div>

                        <div className="row">
                          <div className="tableData">{order.quantity}</div>
                        </div>

                        <div className="row">
                          <div className="tableData">$ {order.total}</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="tableFooter">
                <div className="footerRow">
                  <div>Total</div>
                  <div>
                    ${' '}
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].billingDetails.amount}
                  </div>
                </div>
                <div className="footerRow">
                  <div>SubTotal</div>
                  <div>
                    ${' '}
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].billingDetails.amount}
                  </div>
                </div>
              </div>
            </div>

            {/* OrderInfotable */}

            {orderDetails &&
              orderDetails.length > 0 &&
              Object.keys(orderDetails[0].billingDetails).length > 0 &&
              Object.keys(orderDetails[0].shippingDetails[0]).length > 0 && (
                <div className="address">
                  <Label>{billingAddress}</Label>
                  <Label>
                    {' '}
                    {paymentLabel} {':'}{' '}
                    {orderDetails &&
                    orderDetails.length > 0 &&
                    orderDetails[0].billingDetails &&
                    orderDetails[0].billingDetails.paymentStatus === 'succeeded'
                      ? 'Paid'
                      : 'Unpaid'}{' '}
                  </Label>
                  <Label>
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].billingDetails &&
                      orderDetails[0].billingDetails.billToAddress.name
                        .first}{' '}
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].billingDetails &&
                      orderDetails[0].billingDetails.billToAddress.name.last}
                  </Label>
                  {/* <Label>{companyName}</Label> */}
                  <Label>
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].billingDetails &&
                      orderDetails[0].billingDetails.billToAddress.street1}
                  </Label>
                  {/* <Label>{suiteAddress}</Label> */}
                  <Label>
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].billingDetails &&
                      orderDetails[0].billingDetails.billToAddress.city}{' '}
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].billingDetails &&
                      orderDetails[0].billingDetails.billToAddress.state}{' '}
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].billingDetails &&
                      orderDetails[0].billingDetails.billToAddress.zipCode}
                  </Label>
                  <Label>
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].billingDetails &&
                      orderDetails[0].billingDetails.billToAddress.country}
                  </Label>

                  <Label>{shippingAddress}</Label>
                  {/* <Label>
                    {fullfillmentLabel} {':'} {fullfillmentStatus}
                  </Label> */}
                  <Label>
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].shippingDetails[0].address.name
                        .first}{' '}
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].shippingDetails[0].address.name.last}
                  </Label>
                  {/* <Label>{companyName}</Label> */}
                  <Label>
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].shippingDetails[0].address.street1}
                  </Label>
                  {/* <Label>{suiteAddress}</Label> */}
                  <Label>
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].shippingDetails[0].address.city}{' '}
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].shippingDetails[0].address.state}{' '}
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].shippingDetails[0].address.zipCode}
                  </Label>
                  <Label>
                    {orderDetails &&
                      orderDetails.length > 0 &&
                      orderDetails[0].shippingDetails[0].address.country}
                  </Label>
                </div>
              )}
          </div>
        )
      )}
    </Container>
  )
}

SingleOrderDetails.propTypes = {
  orderID: PropTypes.string,
  orderDate: PropTypes.string,
  productTitle: PropTypes.string,
  sku: PropTypes.string,
  price: PropTypes.string,
  quantity: PropTypes.string,
  total: PropTypes.number,
  subtotal: PropTypes.number,
  finalTotal: PropTypes.number,

  billingAddress: PropTypes.string,
  paymentLabel: PropTypes.string,
  paymentStatus: PropTypes.string,
  cutomerFirstName: PropTypes.string,
  cutomerLastName: PropTypes.string,
  companyName: PropTypes.string,
  streetAddress: PropTypes.string,
  suiteAddress: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string,
  zipCode: PropTypes.number,
  country: PropTypes.string,

  shippingAddress: PropTypes.string,
  fullfillmentLabel: PropTypes.string,
  fullfillmentStatus: PropTypes.string,
}

export default requireAuth(SingleOrderDetails)
