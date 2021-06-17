import { useContext } from 'react'
import { AppContext } from 'libs/context'
import { createShipTo } from 'libs/services/api/checkout'
import { getLocalCart } from 'libs/services/cart-service'
const useShipToAddress = () => {
  const {
    personalInfo,
    shippingAddress,
    setPayNowSpinner,
    checkoutEmail,
  } = useContext(AppContext)
  const shipToAddressCall = async billingPayload => {
    console.log({ billingPayload })
    const cartId = await getLocalCart()
    const shippingAddressPayload = {
      billTo: [billingPayload._id],
      address: {
        street1: shippingAddress.address,
        city: shippingAddress.city,
        state: shippingAddress.state,
        country: shippingAddress.country,
        zipCode: shippingAddress.zipCode,
        kind: 'shipping',
        name: {
          first: shippingAddress.firstName,
          last: shippingAddress.lastName,
        },
        email:
          personalInfo && Object.keys(personalInfo).length > 0
            ? personalInfo.email
            : checkoutEmail.isEmail,
      },
      phone: {
        number: shippingAddress.mobileNumber,
        kind: 'Mobile',
      },
      shipToType: 'SHIP_TO_ADDRESS',
      shipMethod: {
        cost: { currency: 'USD', amount: 0 },
        shipMethodId: 'b72aa7c9becc47e8b4d87c39b55c4209',
        shipmentCarrier: 'USPS',
        shipmentMethod: 'Ground',
      },
      taxCode: 'FR020000',
    }
    console.log({ shippingAddressPayload })

    // '"600716f979117d00095377e1"'
    let createShipToCall = await createShipTo(cartId, shippingAddressPayload)
    if (createShipToCall.error) {
      setPayNowSpinner(false)
    } else {
      return createShipToCall
    }
  }
  return { shipToAddressCall }
}

export default useShipToAddress
