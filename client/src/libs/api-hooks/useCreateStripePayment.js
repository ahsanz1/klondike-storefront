import { useContext } from 'react'
import { AppContext } from 'libs/context'
import {
  stripePayment,
  confirmCartPayment,
  deleteCartPayment,
} from 'libs/services/api/checkout'

import { getLocalCart } from 'libs/services/cart-service'

const useCreateStripePayment = () => {
  const {
    billingAddress,
    shippingAddress,
    personalInfo,
    setPayNowSpinner,
    checkoutEmail,
    sameBillingShippingAddress,
    subTotal,
  } = useContext(AppContext)
  const createStripePayment = async paymentIntent => {
    const cartId = await getLocalCart()
    const payload = {
      cartId: cartId,
      paymentDetails: {
        transactionDetails: {
          paymentType: 'CARD_STRIPE',
          paymentToken: paymentIntent,
        },
        amount: (subTotal * 100).toFixed(0),
        currency: 'USD',
      },
      billToAddress: {
        name: {
          first: sameBillingShippingAddress
            ? shippingAddress.firstName
            : billingAddress.firstName,
          middle: '',
          last: sameBillingShippingAddress
            ? shippingAddress.lastName
            : billingAddress.lastName,
        },
        email:
          personalInfo && Object.keys(personalInfo).length > 0
            ? personalInfo.email
            : checkoutEmail.isEmail,
        phone: {
          number: sameBillingShippingAddress
            ? shippingAddress.mobileNumber
            : billingAddress.mobileNumber,
          kind: 'mobile',
        },
        street1: sameBillingShippingAddress
          ? shippingAddress.address
          : billingAddress.address,
        street2: '',
        city: sameBillingShippingAddress
          ? shippingAddress.city
          : billingAddress.city,
        state: sameBillingShippingAddress
          ? shippingAddress.state
          : billingAddress.state,
        country: sameBillingShippingAddress
          ? shippingAddress.country
          : billingAddress.country,
        zipCode: sameBillingShippingAddress
          ? shippingAddress.zipCode
          : billingAddress.zipCode,
      },
    }
    console.log({ payload })
    setPayNowSpinner(true)

    const checkingPaymentsStatus = async (count = 1) => {
      let payment
      const getCartPayment = await confirmCartPayment(cartId)
      const paymentToBeDeleted =
        getCartPayment &&
        getCartPayment.data.payments &&
        getCartPayment.data.payments.length &&
        getCartPayment.data.payments.filter(payment => payment.isValid === true)

      if (
        getCartPayment &&
        getCartPayment.data.query.count > 0 &&
        getCartPayment.data.payments.length > 0
      ) {
        payment = await Promise.all(
          paymentToBeDeleted &&
            paymentToBeDeleted.length &&
            paymentToBeDeleted.map(async payment => {
              const payload = {
                cartId: cartId,
                paymentId: payment._id,
              }
              await deleteCartPayment(payload)
            }),
        )
        return payment
      } else if (
        getCartPayment &&
        getCartPayment.data.query.count > 0 &&
        getCartPayment.data.payments.length !==
          getCartPayment.data.query.count &&
        count < 15
      ) {
        return checkingPaymentsStatus(count + 1)
      }
    }

    await checkingPaymentsStatus()
    const getStripePayment = await stripePayment(payload)
    if (getStripePayment.error) {
      console.log(getStripePayment.code)
      setPayNowSpinner(false)
      console.log({ getStripePayment })
    } else {
      return getStripePayment
    }
  }
  return { createStripePayment }
}

export default useCreateStripePayment
