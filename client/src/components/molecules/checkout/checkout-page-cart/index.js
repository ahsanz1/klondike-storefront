/* eslint-disable indent */
import React, { useContext, useState, useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import './style.scss'
import Spinner from 'components/atoms/spinner'
import { AppContext } from 'libs/context'
import Button from 'components/atoms/button'
import Label from 'components/atoms/label'
import CheckoutPageCartItem from 'components/molecules/checkout/checkout-page-cart-item'
import FloatInput from 'components/atoms/floating-input'
import { getLocalCart } from 'libs/services/cart-service'
import { applyPromo } from 'libs/services/api/checkout'

const validationSchema = Yup.object().shape({
  discountCode: Yup.number().required('Enter a discount card number'),
})

const CheckoutPageCart = () => {
  const { cartItems, subTotal, step, shippingServicePrice } = useContext(
    AppContext,
  )
  const [scrolled, setScrolled] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [noPromoCode, setNoPromoCode] = useState(false)
  const onScroll = () => {
    setScrolled(true)
  }

  const applyCoupon = async () => {
    setLoading(true)
    const cartId = await getLocalCart()
    const applyPromoPayload = {
      cartId: cartId,
      promoName: discountCode.toString(),
    }
    const checkPromo = await applyPromo(applyPromoPayload)
    if (checkPromo.error) {
      setNoPromoCode(true)
      setLoading(false)
    }
    console.log(checkPromo)
    setLoading(false)
  }

  useEffect(() => {
    setNoPromoCode(false)
  }, [discountCode])

  const totalCheckoutCost = parseFloat(subTotal)
  return (
    step !== 4 && (
      <div className="checkout-page-cart">
        <div
          className={
            cartItems && cartItems.length > 3
              ? scrolled
                ? 'cart-items scroll-hover'
                : 'cart-items scroll-visible'
              : 'cart-itemss'
          }
          onScroll={onScroll}
        >
          {cartItems.map((cartItem, i) => (
            <CheckoutPageCartItem {...cartItem} key={i} />
          ))}
          <div
            className={
              cartItems && cartItems.length > 3 && !scrolled
                ? 'scroll-instruction'
                : 'scrolled-instruction'
            }
          >
            Scroll for more items
          </div>
        </div>
        <div className="checkout-discount-code">
          <div className="checkout-discount-input">
            <Formik
              initialValues={{
                discountCode: '',
              }}
              validationSchema={validationSchema}
            >
              {values => {
                setDiscountCode(values.values.discountCode)
                return (
                  <FloatInput
                    label="Discount code"
                    className={`discount-code-input ${
                      noPromoCode
                        ? 'discount-code-input-alert'
                        : 'discount-code-input-normal'
                    }`}
                    name="discountCode"
                    tooltip={true}
                    checkError={noPromoCode && true}
                  />
                )
              }}
            </Formik>
          </div>
          <Button
            onClick={applyCoupon}
            disabled={discountCode.length === 0}
            className={`discount-code-btn
              ${
                discountCode.length > 0
                  ? 'discount-code-btn-blue'
                  : 'discount-code-btn-empty'
              }`}
          >
            {loading ? <Spinner /> : 'Apply'}
          </Button>
        </div>
        {noPromoCode && (
          <Label className="no-promo-error">Enter a valid discount code</Label>
        )}
        <div className="checkout-order-summary">
          <div className="checkout-order-summary-subtotal">
            <Label className="checkout-order-subtotal-label">Subtotal</Label>
            <Label className="checkout-order-subtotal-amount">
              ${subTotal}
            </Label>
          </div>
          <div className="checkout-order-summary-shipping">
            <Label className="checkout-order-shipping-label">Shipping</Label>
            {step === 1 && (
              <Label className="checkout-order-shipping-amount">
                To be determined
              </Label>
            )}
            {step > 1 && (
              <Label className="checkout-order-shipping-amount">
                {shippingServicePrice}
              </Label>
            )}
          </div>
          <div className="checkout-order-summary-total">
            <Label className="checkout-order-total-label">Total</Label>
            <div className="checkout-order-summary-total-currency-amount">
              <span className="checkout-order-total-currency">USD</span>
              <span className="checkout-order-total-amount">
                {step === 1 && `$${subTotal}`}
                {step > 1 && `$${totalCheckoutCost}`}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default CheckoutPageCart
