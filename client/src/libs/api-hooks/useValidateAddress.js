import { useContext } from 'react'
import { AppContext } from 'libs/context'
import { validateAddress } from 'libs/services/api/checkout'

const useValidateAddress = () => {
  const {
    setPayNowSpinner,
    shippingAddress,
    step,
    billingAddress,
  } = useContext(AppContext)

  const validateAddressCall = async () => {
    const addressPayload = {
      city: step === 1 ? shippingAddress.city : billingAddress.city,
      country: step === 1 ? shippingAddress.country : billingAddress.country,
      line1: step === 1 ? shippingAddress.address : billingAddress.address,
      line2: '',
      line3: '',
      postalCode: step === 1 ? shippingAddress.zipCode : billingAddress.zipCode,
      region: step === 1 ? shippingAddress.state : billingAddress.state,
    }
    setPayNowSpinner(true)
    let validateAddressCall = await validateAddress(addressPayload)
    if (validateAddressCall.error) {
      setPayNowSpinner(false)
    }
    setPayNowSpinner(false)
    return validateAddressCall
  }
  return { validateAddressCall }
}

export default useValidateAddress
