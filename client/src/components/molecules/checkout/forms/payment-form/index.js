/* eslint-disable indent */
import React, { useState, useContext, useEffect } from 'react'
// import InputMask from 'react-input-mask'
import PropTypes from 'prop-types'
import { AppContext } from 'libs/context'

import './style.scss'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import MaskedInput from 'react-text-mask'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import FloatInput from 'components/atoms/floating-input'

const creditCardNumber = [
  /[0-9]/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  /\d/,
]

const creditCardExpiryDate = [
  /[0-9]/,
  /\d/,
  ' ',
  '/',
  ' ',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
]

const creditCardCvc = [/[0-9]/, /\d/, /\d/, /\d/]

const validationSchema = Yup.object().shape({
  cardNumber: Yup.number().required('Enter a valid card number'),
  cardName: Yup.string().required(
    'Enter your name exactly as it’s written on your card',
  ),
  cardExpiryDate: Yup.string().required('Enter a valid card expiry date'),
  cardCode: Yup.number()
    .required('Enter CVC code')
    .min(3, 'Enter three digits'),
})

const PaymentMethodForm = ({ bindSubmitForm }) => {
  // const [checked, setChecked] = useState(false)
  const [value] = useState('credit-card')
  const [creditCardCompany, setCreditCardCompany] = useState('')
  const { setPaymentInfo, paymentInfo } = useContext(AppContext)
  useEffect(() => {
    const cardNumber =
      paymentInfo.cardNumber &&
      paymentInfo.cardNumber.length > 0 &&
      paymentInfo.cardNumber.toString()
    if (cardNumber && cardNumber.slice(0, 1) === '4') {
      setCreditCardCompany('visa')
    } else if (cardNumber && cardNumber.slice(0, 1) === '5') {
      setCreditCardCompany('masterCard')
    } else if (cardNumber && cardNumber.slice(0, 1) === '3') {
      setCreditCardCompany('amex')
    } else if (cardNumber && cardNumber.slice(0, 1) === '6') {
      setCreditCardCompany('discover')
    }
  }, [paymentInfo.cardNumber])

  // const handleCheckedChange = e => {
  //   setValue(e.target.value)
  //   return setChecked(!checked)
  // }
  return (
    <Formik
      initialValues={{
        cardNumber: '',
        cardName: '',
        cardExpiryDate: '',
        cardCode: '',
      }}
      validationSchema={validationSchema}
    >
      {values => {
        setPaymentInfo(values.values)
        bindSubmitForm(values.submitForm)
        return (
          <div className="payment-forms">
            <Label className="payment-form-heading">Payment</Label>
            <Label className="payment-form-paragraph">
              All transactions are secure and encrypted.
            </Label>
            <div className="payment-form">
              <div className="payment-credit-card">
                <div className="payment-credit-card-header">
                  <div className="payment-credit-card-header-radio">
                    {/* <input
                      type="radio"
                      name="Credit card"
                      onChange={e => {
                        handleCheckedChange(e)
                      }}
                      checked={!checked}
                      value="credit-card"
                    /> */}
                    <Label className="payment-credit-card-header-heading">
                      Credit Card
                    </Label>
                  </div>
                  <div className="payment-credit-card-header-images">
                    <Image
                      src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/visa-319d545c6fd255c9aad5eeaad21fd6f7f7b4fdbdb1a35ce83b89cca12a187f00.svg"
                      alt="visa"
                      className={`credit-card-icon ${creditCardCompany.length >
                        0 &&
                        creditCardCompany !== 'visa' &&
                        'credit-card-icon-grey'}`}
                    />
                    <Image
                      src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/master-173035bc8124581983d4efa50cf8626e8553c2b311353fbf67485f9c1a2b88d1.svg"
                      alt="mastercard"
                      className={`credit-card-icon ${creditCardCompany.length >
                        0 &&
                        creditCardCompany !== 'masterCard' &&
                        'credit-card-icon-grey'}`}
                    />
                    <Image
                      src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/american_express-2264c9b8b57b23b0b0831827e90cd7bcda2836adc42a912ebedf545dead35b20.svg"
                      alt="amex"
                      className={`credit-card-icon ${creditCardCompany.length >
                        0 &&
                        creditCardCompany !== 'amex' &&
                        'credit-card-icon-grey'}`}
                    />
                    <Image
                      src="https://cdn.shopify.com/shopifycloud/shopify/assets/payment_icons/discover-8265cfcac046637b87df7718c1436f6a1e054de3fbbb73c2ae82db1332879ba5.svg"
                      alt="discovery"
                      className={`credit-card-icon ${creditCardCompany.length >
                        0 &&
                        creditCardCompany !== 'discover' &&
                        'credit-card-icon-grey'}`}
                    />
                    <Label className="payment-credit-card-header-images-and-more">
                      and more...
                    </Label>
                  </div>
                </div>
                {value === 'credit-card' && (
                  <form onSubmit={values.handleSubmit}>
                    <div className="payment-credit-card-fields">
                      <div className="mobile-number-input">
                        <Field
                          name="cardNumber"
                          render={({ field }) => (
                            <MaskedInput
                              {...field}
                              mask={creditCardNumber}
                              placeholder="Enter your credit card number"
                              guide={false}
                              className={
                                values.errors.cardNumber &&
                                values.touched.cardNumber
                                  ? 'input-error'
                                  : 'payment-credit-card-input-field'
                              }
                            />
                          )}
                        />

                        {values.errors.cardNumber &&
                          values.touched.cardNumber && (
                            <div className="error-msg">
                              {values.errors.cardNumber}
                            </div>
                          )}
                        <div className="mobile-number-tooltip">
                          <div className="mobile-number-tooltip-button">
                            <div className="mobile-number-tooltip-button-absolute">
                              <img
                                className="mobile-number-tooltip-logo"
                                src="/static/icons/credit-card-lock.svg"
                                alt="lll"
                              />
                            </div>
                            <span className="mobile-number-tooltip">
                              All transactions are secure and encrypted.
                            </span>
                          </div>
                        </div>
                      </div>
                      <FloatInput
                        label="Name on card"
                        className="payment-credit-card-input-field"
                        name="cardName"
                        type="text"
                      />
                      <div className="payment-credit-card-expiry-code">
                        <div className="payment-credit-card-expiry-date">
                          <Field
                            name="cardExpiryDate"
                            render={({ field }) => (
                              <MaskedInput
                                {...field}
                                mask={creditCardExpiryDate}
                                placeholder="MM / YYYY ( Credit Card Expiry )"
                                type="text"
                                guide={false}
                                className={
                                  values.errors.cardExpiryDate &&
                                  values.touched.cardExpiryDate
                                    ? 'input-error'
                                    : 'payment-credit-card-input-field'
                                }
                              />
                            )}
                          />
                          {values.errors.cardExpiryDate &&
                            values.touched.cardExpiryDate && (
                              <div className="error-msg">
                                {values.errors.cardExpiryDate}
                              </div>
                            )}
                        </div>
                        <div className="payment-credit-card-security-code">
                          <div className="mobile-number-input">
                            <Field
                              name="cardCode"
                              render={({ field }) => (
                                <MaskedInput
                                  {...field}
                                  mask={creditCardCvc}
                                  placeholder="Security code"
                                  type="text"
                                  guide={false}
                                  className={
                                    values.errors.cardExpiryDate &&
                                    values.touched.cardExpiryDate
                                      ? 'input-error'
                                      : 'payment-credit-card-input-field'
                                  }
                                />
                              )}
                            />
                            {values.errors.cardExpiryDate &&
                              values.touched.cardExpiryDate && (
                                <div className="error-msg">
                                  {values.errors.cardCode}
                                </div>
                              )}
                            <div className="mobile-number-tooltip">
                              <div className="mobile-number-tooltip-button">
                                <div className="mobile-number-tooltip-button-absolute">
                                  <img
                                    className="mobile-number-tooltip-logo"
                                    src="/static/icons/question-mark.svg"
                                    alt="lll"
                                  />
                                </div>
                                <span className="credit-card-code-tooltip">
                                  3-digit security code usually found on the
                                  back of your card. American Express cards have
                                  a 4-digit code located on the front.
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </div>
              {/* <div className="payment-paypal">
                <div className="payment-paypal-header">
                  <input
                    type="radio"
                    name="Paypal"
                    onChange={e => {
                      handleCheckedChange(e)
                    }}
                    checked={checked}
                    value="paypal"
                  />
                  <Image
                    src="https://cdn.shopify.com/shopifycloud/shopify/assets/checkout/offsite-gateway-logos/paypal@2x-768388b0667bef1aa9a7cf02fa1cc2184c2915a90d4cdd62dde223f74f2acbfc.png"
                    alt="paypal"
                    className="paypal-logo"
                  />
                </div>
                {value === 'paypal' && (
                  <div className="payment-paypal-box">
                    <Image
                      src="https://cdn.shopify.com/shopifycloud/shopify/assets/checkout/offsite-908d79d8d532f6af67d7cc99244ede733729c29379c349ee015fbcea71fd8274.svg"
                      alt="redirect"
                      className="paypal-redirect-image"
                    />
                    <Label className="paypal-redirect-instructions">
                      {' '}
                      After clicking “Complete order”, you will be redirected to
                      PayPal to complete your purchase securely.
                    </Label>
                  </div>
                )}
              </div> */}
            </div>
          </div>
        )
      }}
    </Formik>
  )
}

PaymentMethodForm.propTypes = {
  bindSubmitForm: PropTypes.func,
}

export default PaymentMethodForm
