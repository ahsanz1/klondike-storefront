import { useContext } from 'react'
import { AppContext } from 'libs/context'
import { message } from 'antd'
import { createStripePaymentMethod } from 'libs/services/api/checkout'

const useGetStripePaymentMethod = () => {
  const {
    billingAddress,
    shippingAddress,
    personalInfo,
    setPayNowSpinner,
    checkoutEmail,
    sameBillingShippingAddress,
  } = useContext(AppContext)
  const getStripePaymentMethod = async creditCardInfo => {
    const stripePayload = {
      billing_details: {
        address: {
          line1: sameBillingShippingAddress
            ? shippingAddress.address
            : billingAddress.address,
          line2: '',
          city: sameBillingShippingAddress
            ? shippingAddress.city
            : billingAddress.city,
          state: sameBillingShippingAddress
            ? shippingAddress.state
            : billingAddress.state,
          country: sameBillingShippingAddress
            ? shippingAddress.country
            : billingAddress.country,
          postal_code: sameBillingShippingAddress
            ? shippingAddress.zipCode
            : billingAddress.zipCode,
        },
        name: sameBillingShippingAddress
          ? `${shippingAddress.firstName} ${shippingAddress.lastName}`
          : `${billingAddress.firstName} ${billingAddress.lastName}`,
        email:
          personalInfo && Object.keys(personalInfo).length > 0
            ? personalInfo.email
            : checkoutEmail.isEmail,
        phone: sameBillingShippingAddress
          ? shippingAddress.mobileNumber
          : billingAddress.mobileNumber,
      },
      metadata: {},
      card: {
        number: creditCardInfo.cardNumber.split(' ').join(''),
        exp_month: creditCardInfo.expDate.slice(0, 2),
        exp_year: creditCardInfo.expDate.slice(-4),
        cvc: creditCardInfo.cvv,
      },
    }

    setPayNowSpinner(true)
    let createStripePaymentMethodCall = await createStripePaymentMethod(
      stripePayload,
    )
    if (createStripePaymentMethodCall.error) {
      message.error(createStripePaymentMethodCall.code.message)
      setPayNowSpinner(false)
    } else {
      return createStripePaymentMethodCall
    }
  }
  return { getStripePaymentMethod }
}

export default useGetStripePaymentMethod
