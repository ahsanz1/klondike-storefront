import { useContext } from 'react'
import { AppContext } from 'libs/context'
import { createBillTo } from 'libs/services/api/checkout'
import { getLocalCart } from 'libs/services/cart-service'

const useBillToAddress = () => {
  const {
    billingAddress,
    shippingAddress,
    personalInfo,
    setPayNowSpinner,
    checkoutEmail,
    sameBillingShippingAddress,
    subTotal,
  } = useContext(AppContext)
  const billToAddressCall = async creditCardInfo => {
    const cartId = await getLocalCart()
    const billingAddressPayload = {
      address: {
        city: sameBillingShippingAddress
          ? shippingAddress.city
          : billingAddress.city,
        country: sameBillingShippingAddress
          ? shippingAddress.country
          : billingAddress.country,
        email:
          personalInfo && Object.keys(personalInfo).length > 0
            ? personalInfo.email
            : checkoutEmail.isEmail,
        kind: 'shipping',
        name: {
          first: sameBillingShippingAddress
            ? shippingAddress.firstName
            : billingAddress.firstName,
          last: sameBillingShippingAddress
            ? shippingAddress.lastName
            : billingAddress.lastName,
        },
        phone: {
          number: sameBillingShippingAddress
            ? shippingAddress.mobileNumber
            : billingAddress.mobileNumber,
          kind: 'Mobile',
        },
        state: sameBillingShippingAddress
          ? shippingAddress.state
          : billingAddress.state,
        street1: sameBillingShippingAddress
          ? shippingAddress.address
          : billingAddress.address,
        zipCode: sameBillingShippingAddress
          ? shippingAddress.zipCode
          : billingAddress.zipCode,
      },
      amount: subTotal,
      cardIdentifier: creditCardInfo.cardIdentifier,
      paymentMethod: creditCardInfo.paymentMethod,
    }
    setPayNowSpinner(true)
    let createBillToCall = await createBillTo(cartId, billingAddressPayload)
    if (createBillToCall.error) {
      setPayNowSpinner(false)
    } else {
      return createBillToCall
    }
  }
  return { billToAddressCall }
}

export default useBillToAddress
