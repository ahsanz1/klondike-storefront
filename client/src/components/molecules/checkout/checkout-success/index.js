/* eslint-disable indent */
import React, { useContext, useEffect } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import './style.scss'
import { clearCart } from 'libs/services/cart-service'
import { Row, Col } from 'antd'
import { navigate } from '@reach/router'

const CheckoutSuccess = () => {
  const {
    personalInfo,
    clearLocalCart,
    checkoutData,
    creditLimit,
    setCreditLimit,
    setPersonalInfo,
  } = useContext(AppContext)
  // const [poNumber] = useState('R3G 2T3')
  if (Object.keys(checkoutData || {}).length === 0) {
    navigate('/')
  }

  useEffect(() => {
    clearCart()
    clearLocalCart()
    if (checkoutData?.totalAmount) {
      setPersonalInfo({
        ...personalInfo,
        creditLimit: Number(creditLimit - checkoutData.totalAmount),
      })
      setCreditLimit(Number(creditLimit - checkoutData.totalAmount))
    }
  }, [])

  const address = {
    street1: '1510 Wall Street NW ',
    city: 'Winnipeg',
    state: 'MB',
    country: 'Canada',
    zipCode: checkoutData?.poNumber,
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
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
    var today = new Date()
    var transformedDate = today.toLocaleDateString('en-US', options)
    return transformedDate
  }

  return (
    <>
      {Object.keys(checkoutData || {}).length > 0 ? (
        <div className="checkout-success">
          <Row justify="center" align="center">
            <Col>
              <h1 className="thankyou-text">Thank you for shopping with us.</h1>
              <p className="received-text">
                Your order has been received. We will send an order confirmation
                at
                <span className="received-text-mail">
                  {personalInfo?.email}
                </span>
              </p>
            </Col>
          </Row>
          <Row justify="center" align="center">
            <Col xs={{ span: 24 }} lg={{ span: 12 }} className="columns">
              <span className="order-detail">
                Order Detail
                <span className="order-receipt">Print receipt</span>
              </span>
              <span className="order-number">
                Order Number :
                <span className="order-number-two">
                  {checkoutData?.orderId}
                </span>
              </span>
              <span className="bold po-num">
                PO Number : <span className="bold-two">{address?.zipCode}</span>
              </span>
              <span className="bold">
                Order Date : <span className="bold-two">{getDate()}</span>
              </span>
              <span className="bold">
                Order Total :{' '}
                <span className="bold-two">{`$${Number(
                  parseFloat(checkoutData?.totalAmount).toFixed(2),
                ).toLocaleString()}`}</span>
              </span>
              {window.innerWidth > 768 ? (
                <p
                  className="para"
                  style={{ marginTop: '5vw', textAlign: 'left' }}
                >
                  If you need to make changes to your order, please email
                  clientcare@klondikelubricants.com or call 1-877-293-4691
                  Immediately.
                </p>
              ) : (
                <>
                  <p className="para-heading">{`${personalInfo?.firstName} ${personalInfo?.lastName}`}</p>
                  <p className="para">
                    Your order will has been sent to John@example.com for
                    approval. Vestibulum etiam aliquam congue dui ac facilisis
                    mauris.
                  </p>
                </>
              )}
            </Col>
            <Col xs={{ span: 24 }} lg={{ span: 12 }} className="columns">
              <h3>{`${
                checkoutData &&
                Object.keys(checkoutData?.selectedLocation || {}).length
                  ? 'PICKUP LOCATION'
                  : 'SHIPPING ADDRESS'
              }`}</h3>
              <div className="shipping-address">
                {checkoutData &&
                Object.keys(checkoutData?.selectedLocation || {}).length ? (
                  <span>
                    <p>{`${checkoutData?.selectedLocation?.address?.street1},`}</p>
                    <p>{`${checkoutData?.selectedLocation?.address?.city}, ${checkoutData?.selectedLocation?.address?.state} ${checkoutData?.selectedLocation?.address?.zipCode}`}</p>
                    <p>{`${checkoutData?.selectedLocation?.address?.phone
                      ?.number || ''}`}</p>
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
      ) : null}
    </>
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
