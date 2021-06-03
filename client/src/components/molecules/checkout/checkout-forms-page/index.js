import React, { useContext } from 'react'

import './style.scss'
import { AppContext } from 'libs/context'

import ContactInformationForm from 'components/molecules/checkout/contact-information'
import ShippingAddressForm from 'components/molecules/checkout/shipping-method'
import PaymentInformationForm from 'components/molecules/checkout/payment-information'
import CheckoutSuccess from 'components/molecules/checkout/checkout-success'

const CheckoutFormsPage = () => {
  const { step } = useContext(AppContext)
  return (
    <div className="checkout-forms-page">
      {/* <CheckoutHeader /> */}
      <div className="checkout-forms-page-components">
        {step === 1 && <ContactInformationForm />}
        {step === 2 && <ShippingAddressForm />}
        {step === 3 && <PaymentInformationForm />}
        {step === 4 && <CheckoutSuccess />}
      </div>
    </div>
  )
}

export default CheckoutFormsPage
