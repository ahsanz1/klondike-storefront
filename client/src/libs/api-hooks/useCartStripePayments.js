import { useContext } from 'react'
import { AppContext } from 'libs/context'
import {
  confirmCartPayment,
  deleteCartPayment,
} from 'libs/services/api/checkout'
import { getLocalCart } from 'libs/services/cart-service'

const useCartStripePayments = () => {
  const { setPayNowSpinner } = useContext(AppContext)
  const getCartPaymentStatus = async () => {
    const cartId = await getLocalCart()
    setPayNowSpinner(true)
    let getCartPayments = await confirmCartPayment(cartId)
    console.log({ getCartPayments })
    if (getCartPayments.error) {
      return setPayNowSpinner(false)
    } else if (getCartPayments.data.payments.length > 1) {
      const payload = {
        cartId: cartId,
        paymentId: getCartPayments.data.payments[0]._id,
      }
      const deleteExistingPayment = deleteCartPayment(payload)
      return deleteExistingPayment
    } else {
    }
  }
  return { getCartPaymentStatus }
}

export default useCartStripePayments
