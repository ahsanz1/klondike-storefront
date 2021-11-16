import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import './style.scss'
import { clearCart } from 'libs/services/cart-service'
import { Row, Col } from 'antd'
// import { useNavigate } from '@reach/router'
// import Link from 'components/atoms/link'

const CheckoutSuccess = () => {
  const { personalInfo, clearLocalCart, checkoutData } = useContext(AppContext)
  const [poNumber] = useState('R3G 2T3')
  console.log({ checkoutData })
  // const navigate = useNavigate()

  useEffect(() => {
    clearCart()
    clearLocalCart()
  }, [])

  const address = {
    street1: '1510 Wall Street NW ',
    city: 'Winnipeg',
    state: 'MB',
    country: 'Canada',
    zipCode: poNumber,
    // zipCode: 'R3G 2T3',
    kind: 'shipping',
    name: {
      first: personalInfo?.firstName,
      last: personalInfo?.lastName,
    },
    email: personalInfo?.email,
    phone: {
      number: '844-883-4645',
      kind: 'Mobile',
    },
  }

  const getDate = () => {
    var today = new Date()
    var transformedDate = today.toDateString()
    return transformedDate
  }

  return (
    <div className="checkout-success">
      <Row justify="center" align="center">
        <Col>
          <h1 className="thankyou-text">Thank you for shopping with us.</h1>
          <p className="received-text">
            Your order has been received. We will send an order confirmation at
            <span className="received-text-mail">{personalInfo?.email}</span>
          </p>
        </Col>
      </Row>
      <Row justify="center" align="center">
        <Col xs={{ span: 24 }} lg={{ span: 12 }} className="columns">
          <span className="order-number">
            <span className="order-number-two">
              Order Number: {checkoutData?.orderId}
            </span>
          </span>
          <span className="bold">
            PO Number: <span className="bold-two">{address?.zipCode}</span>
          </span>
          <span className="bold">
            Order Date: <span className="bold-two">{getDate()}</span>
          </span>
          <span className="bold">
            Order Total:{' '}
            <span className="bold-two">{`$${parseFloat(
              checkoutData?.totalAmount,
            ).toFixed(2)}`}</span>
          </span>
          {window.innerWidth > 768 ? (
            <p style={{ marginTop: '5vw', textAlign: 'left' }}>
              If you need to make changes to your order. please email
              clientcare@klondikelubricants.com or call 1-877-293-4691
            </p>
          ) : (
            <>
              <p className="para-heading">{`${personalInfo?.firstName} ${personalInfo?.lastName}`}</p>
              <p className="para">
                Your order will has been sent to John@example.com for approval.
                Vestibulum etiam aliquam congue dui ac facilisis mauris.
              </p>
            </>
          )}
        </Col>
        <Col xs={{ span: 24 }} lg={{ span: 12 }} className="columns">
          <h3>{`${
            checkoutData && Object.keys(checkoutData?.selectedLocation).length
              ? 'PICKUP LOCATION'
              : 'SHIPPING ADDRESS'
          }`}</h3>
          <div className="shipping-address">
            {checkoutData &&
            Object.keys(checkoutData?.selectedLocation).length ? (
                <span>
                  <p>{`${checkoutData?.selectedLocation?.address?.street1},`}</p>
                  <p>{`${checkoutData?.selectedLocation?.address?.city}, ${checkoutData?.selectedLocation?.address?.state} ${checkoutData?.selectedLocation?.address?.zipCode}`}</p>
                  <p>{`${checkoutData?.selectedLocation?.address?.phone?.number ||
                  ''}`}</p>
                </span>
              ) : (
                <span>
                  <p>{`${personalInfo?.firstName} ${personalInfo?.lastName}`}</p>
                  <p>{`${address?.street1},`}</p>
                  <p>{`${address?.city}, ${address?.state} ${address?.zipCode}`}</p>
                  <p>{`${address?.phone?.number}`}</p>
                </span>
              )}
          </div>
        </Col>
      </Row>
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
