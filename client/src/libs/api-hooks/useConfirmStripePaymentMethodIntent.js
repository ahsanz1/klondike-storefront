import { useContext } from 'react'
import { AppContext } from 'libs/context'
import { confirmStripePaymentMethodIntent } from 'libs/services/api/checkout'
import { message } from 'antd'

const useConfirmStripePaymentMethodIntent = () => {
  const { setPayNowSpinner } = useContext(AppContext)
  const getConfirmStripePaymentMethodIntent = async (
    stripePaymentIntent,
    stripePaymentMethod,
  ) => {
    const stripePayload = {
      payment_method: stripePaymentMethod,
    }

    setPayNowSpinner(true)
    let confirmStripePaymentMethodIntentCall = await confirmStripePaymentMethodIntent(
      stripePayload,
      stripePaymentIntent,
    )
    if (confirmStripePaymentMethodIntentCall.error) {
      message.error('Your credit card was declined')
      setPayNowSpinner(false)
    } else {
      return confirmStripePaymentMethodIntentCall
    }
  }
  return { getConfirmStripePaymentMethodIntent }
}

export default useConfirmStripePaymentMethodIntent
