import { useContext } from 'react'
import { AppContext } from 'libs/context'
import { message } from 'antd'
import { checkout } from 'libs/services/api/checkout'
import { getLocalCart } from 'libs/services/cart-service'
import { saveItem, getItem } from 'libs/services/localStorage'
import { endCheckout } from 'libs/utils/gtm'

const useCheckout = () => {
  const {
    personalInfo,
    setPayNowSpinner,
    checkoutEmail,
    goToNextStep,
  } = useContext(AppContext)

  const checkoutCall = async shippingInfo => {
    console.log({ shippingInfo })
    const cartId = await getLocalCart()
    const cart = JSON.parse(getItem('CART'))
    const itemsTaxes =
      cart &&
      cart.items.map(item => ({
        lineItemId: parseInt(item.lineItemId),
        amount: 0,
      }))

    const shippingAddressPayload = {
      cartId: cartId,
      customerEmail:
        personalInfo && Object.keys(personalInfo).length > 0
          ? personalInfo.email
          : checkoutEmail.isEmail,
      paymentDetails: [],
      estimatedTax: {
        itemsTaxes: itemsTaxes,
        shipToTaxes: [{ shipToId: shippingInfo._id, amount: 0 }],
      },
    }

    let checkoutApiCall = await checkout(shippingAddressPayload)
    if (checkoutApiCall.error) {
      setPayNowSpinner(false)
      message.error('Please try again')
    } else if (
      !checkoutApiCall.error &&
      checkoutApiCall.data.paymentResp &&
      checkoutApiCall.data.paymentResp.orderTotal !==
        checkoutApiCall.data.paymentResp.totalAmountCapturable
    ) {
      message.error('Something went wrong! Please try again')
      setPayNowSpinner(false)
    } else {
      checkoutApiCall && console.log(checkoutApiCall)
      checkoutApiCall.data.checkoutComplete &&
        saveItem('orderID', checkoutApiCall.data.orderId)
      endCheckout(checkoutApiCall.data.orderId)
      goToNextStep()
      setPayNowSpinner(false)
    }
    return checkoutApiCall
  }
  return { checkoutCall }
}

export default useCheckout
