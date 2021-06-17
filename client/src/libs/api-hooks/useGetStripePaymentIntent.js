import { useContext } from 'react'
import { AppContext } from 'libs/context'
import {
  createStripePaymentIntent,
  getCustomerStripeId,
} from 'libs/services/api/checkout'
import { message } from 'antd'
import { getLocalCart } from 'libs/services/cart-service'

const useGetStripePaymentIntent = () => {
  const {
    setPayNowSpinner,
    subTotal,
    checkoutEmail,
    personalInfo,
    user,
    shippingAddress,
  } = useContext(AppContext)
  const getStripePaymentIntent = async () => {
    const stripeCustomerPayload = {
      email:
        personalInfo && Object.keys(personalInfo).length > 0
          ? personalInfo.email
          : checkoutEmail.isEmail,
      customerReferenceId:
        user && Object.keys(personalInfo).length > 0 && user._id,
      customerFullName:
        personalInfo && Object.keys(personalInfo).length > 0
          ? `${personalInfo.firstName} ${personalInfo.lastName}`
          : `${shippingAddress.firstName} ${shippingAddress.lastName}`,
    }

    for (let key in stripeCustomerPayload) {
      if (stripeCustomerPayload[key] === false) {
        delete stripeCustomerPayload[key]
      }
    }

    console.log(stripeCustomerPayload)

    const customerStripeId = await getCustomerStripeId(stripeCustomerPayload)
    if (customerStripeId.error) {
      console.log(customerStripeId.code.message)
      setPayNowSpinner(false)
      customerStripeId.code.message === `"email" must be a valid email` &&
        message.error('Please enter a valid email address')
    }
    const localCartId = await getLocalCart()
    const stripePayload = {
      amount: (subTotal * 100).toFixed(0),
      currency: 'USD',
      confirm: false,
      customer:
        customerStripeId &&
        customerStripeId.data &&
        customerStripeId.data.data.stripeId,
      metadata: {
        cartId: localCartId,
      },
    }
    setPayNowSpinner(true)
    let createStripePaymentIntentCall = await createStripePaymentIntent(
      stripePayload,
    )
    if (createStripePaymentIntentCall.error) {
      message.error('Please use a new email address or account.')
      setPayNowSpinner(false)
    } else {
      return createStripePaymentIntentCall
    }
  }
  return { getStripePaymentIntent }
}

export default useGetStripePaymentIntent
