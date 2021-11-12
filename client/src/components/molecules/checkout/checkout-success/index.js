import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import './style.scss'
import { clearCart } from 'libs/services/cart-service'
import { Row, Col } from 'antd'
// import Link from 'components/atoms/link'

const CheckoutSuccess = () => {
  const { personalInfo, clearLocalCart, checkoutData } = useContext(AppContext)
  const [poNumber] = useState('R3G 2T3')
  console.log({ checkoutData })

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
            Order Number: {checkoutData?.orderId}
          </span>
          <span className="bold">PO Number: {address?.zipCode}</span>
          <span className="bold">Order Date: {getDate()}</span>
          <span className="bold">
            Order Total:{' '}
            {`$${parseFloat(checkoutData?.totalAmount).toFixed(2)}`}
          </span>
          {window.innerWidth > 768 ? (
            <p style={{ marginTop: '5vw' }}>
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
          <h3>SHIPPING ADDRESS</h3>
          <div className="shipping-address">
            <span>
              <strong>{`${personalInfo?.firstName} ${personalInfo?.lastName}`}</strong>
              <br />
              {`${address?.street1},`}
              <br />
              {`${address?.city}, ${address?.state} ${address?.zipCode}`}
              <br />
              {`${address?.phone?.number}`}
            </span>
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
