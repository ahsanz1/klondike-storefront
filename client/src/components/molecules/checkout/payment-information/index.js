/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useContext, useState } from 'react'
import './style.scss'
import { AppContext } from 'libs/context'
import { message } from 'antd'
import Button from 'components/atoms/button'
import PaymentMethodForm from 'components/molecules/checkout/forms/payment-form'
import BillingAddressForm from 'components/molecules/checkout/forms/billing-address'
// import RememberMeForm from 'components/molecules/checkout/forms/remember-me'
import ContactOrderInfoBox from 'components/molecules/checkout/checkout-header-info-box'
import useShipToAddress from 'libs/api-hooks/useShipToAddress'
import useBillToAddress from 'libs/api-hooks/useBillToAddress'
import useCreditCardType from 'libs/custom-hooks/useCreditCardType'
import useCheckout from 'libs/api-hooks/useCheckout'
import useUpdateShipTo from 'libs/api-hooks/useUpdateShipTo'
import useGetStripePaymentMethod from 'libs/api-hooks/useGetStripePaymentMethod'
import useGetStripePaymentIntent from 'libs/api-hooks/useGetStripePaymentIntent'
import useConfirmStripePaymentMethodIntent from 'libs/api-hooks/useConfirmStripePaymentMethodIntent'
import useCreateStripePayment from 'libs/api-hooks/useCreateStripePayment'
import useValidateAddress from 'libs/api-hooks/useValidateAddress'
// import useCartStripePayments from 'libs/api-hooks/useCartStripePayments'

import { subscribeNewsletter } from 'libs/api/klaviyo'
import { klaviyoNewsLetterKey } from 'libs/general-config-juicy'
import Spinner from 'components/atoms/spinner'
import { paymentCheckout } from 'libs/utils/gtm'

const PaymentInformationForm = () => {
  const {
    payNowSpinner,
    goToPreviousStep,
    setEnableThirdStep,
    sigunUpforExclusiveOffers,
    checkoutEmail,
    personalInfo,
    cartItems,
    setPayNowSpinner,
    sameBillingShippingAddress,
  } = useContext(AppContext)

  const [index, setIndex] = useState(0)

  const { validateAddressCall } = useValidateAddress()
  const { checkCreditCardType } = useCreditCardType()
  const { billToAddressCall } = useBillToAddress()
  const { shipToAddressCall } = useShipToAddress()
  const { updateShip } = useUpdateShipTo()
  const { getStripePaymentMethod } = useGetStripePaymentMethod()
  const { getStripePaymentIntent } = useGetStripePaymentIntent()
  const { createStripePayment } = useCreateStripePayment()
  const { checkoutCall } = useCheckout()
  const {
    getConfirmStripePaymentMethodIntent,
  } = useConfirmStripePaymentMethodIntent()

  let submitMyForm = null

  const handleSubmitMyForm = e => {
    if (submitMyForm) {
      submitMyForm(e)
    }
  }
  const bindSubmitForm = submitForm => {
    submitMyForm = submitForm
  }

  let submitMyForm1 = null

  const handleSubmitMyForm1 = e => {
    if (submitMyForm1) {
      submitMyForm1(e)
    }
  }
  const bindSubmitForm1 = submitForm => {
    submitMyForm1 = submitForm
  }

  useEffect(() => {
    if (sameBillingShippingAddress && index > 0) {
      payment()
    } else if (!sameBillingShippingAddress && index > 0) {
      address()
    }
  }, [index])

  const payNow = async () => {
    if (sameBillingShippingAddress) {
      handleSubmitMyForm()
      // await payment()
    } else if (!sameBillingShippingAddress) {
      handleSubmitMyForm()
      handleSubmitMyForm1()
    }
  }

  const address = async () => {
    const addressValidation = await validateAddressCall()
    if (
      addressValidation &&
      addressValidation.data &&
      addressValidation.data.addressValid &&
      Object.keys(addressValidation.data).length === 1
    ) {
      payment()
    } else if (
      addressValidation &&
      addressValidation.data &&
      !addressValidation.data.addressValid
    ) {
      message.error('Your address is invalid')
    } else if (
      addressValidation &&
      addressValidation.data &&
      addressValidation.data.addressValid &&
      addressValidation.data.addressesFound > 0
    ) {
      payment()
    }
  }

  const payment = async () => {
    try {
      if (sigunUpforExclusiveOffers) {
        // klaviyo call
        const subscribeNewsletterPayload = {
          profiles: [
            {
              email:
                personalInfo && personalInfo.length > 0
                  ? personalInfo.email
                  : checkoutEmail.isEmail,
            },
          ],
          newsletterId: klaviyoNewsLetterKey,
        }
        subscribeNewsletter(subscribeNewsletterPayload)
      }
    } catch (e) {
      console.log(e)
    }
    const getCreditCardinfo = await checkCreditCardType()
    if (
      getCreditCardinfo &&
      getCreditCardinfo.cardNumber &&
      getCreditCardinfo.cardNumber.length < 19
    ) {
      message.error('Your credit card number is less than 16 digits')
      setPayNowSpinner(false)
      // setPayError(true)
    } else if (
      getCreditCardinfo &&
      getCreditCardinfo.cvv &&
      getCreditCardinfo.cvv.length < 3
    ) {
      message.error(`The credit card's cvc number is less than 3 digits`)
      setPayNowSpinner(false)
      // setPayError(true)
    } else if (
      getCreditCardinfo &&
      getCreditCardinfo.cardHolderFullName &&
      getCreditCardinfo.cardHolderFullName.split(' ').length < 2
    ) {
      message.error('Please enter your full name')
      setPayNowSpinner(false)
      // setPayError(true)
    } else if (
      getCreditCardinfo &&
      getCreditCardinfo.expDate &&
      getCreditCardinfo.expDate.slice(-4).includes('/')
    ) {
      message.error(
        `Please enter the card's expiry date in the format MM / YYYY`,
      )
      setPayNowSpinner(false)
      // setPayError(true)
    }

    const getBillingInfo =
      !getCreditCardinfo.expDate.slice(-4).includes('/') &&
      getCreditCardinfo.cardHolderFullName.split(' ').length >= 2 &&
      getCreditCardinfo.cvv.length >= 3 &&
      getCreditCardinfo.cardNumber.length >= 19 &&
      (await billToAddressCall(getCreditCardinfo))
    const getShippingInfo =
      getBillingInfo && (await shipToAddressCall(getBillingInfo.data))
    const getUpdateShipping =
      getBillingInfo && (await updateShip(getShippingInfo.data))
    const stripePaymentMethodCall =
      getUpdateShipping && (await getStripePaymentMethod(getCreditCardinfo))
    const stripePaymentIntentCall =
      stripePaymentMethodCall && (await getStripePaymentIntent())
    const confirmStripePaymentMethodIntentCall =
      stripePaymentMethodCall &&
      stripePaymentIntentCall &&
      (await getConfirmStripePaymentMethodIntent(
        stripePaymentIntentCall.data.id,
        stripePaymentMethodCall.data.id,
      ))
    const createStripePaymentCall =
      confirmStripePaymentMethodIntentCall &&
      (await createStripePayment(stripePaymentIntentCall.data.id))

    createStripePaymentCall && (await checkoutCall(getShippingInfo.data))
    // console.log({ getCreditCardinfo })
    // console.log({ getBillingInfo })
    // console.log({ getShippingInfo })
    // console.log({ getUpdateShipping })
    // console.log({ stripePaymentMethodCall })
    // console.log({ stripePaymentIntentCall })
    // console.log({ confirmStripePaymentMethodIntentCall })
    // console.log({ createStripePaymentCall })
    // console.log({ checkout })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    setEnableThirdStep(true)
    cartItems && paymentCheckout(cartItems)
  }, [])

  return (
    <div className="payment-method">
      <ContactOrderInfoBox />
      <PaymentMethodForm bindSubmitForm={bindSubmitForm} />
      <BillingAddressForm bindSubmitForm={bindSubmitForm1} />
      {/* <RememberMeForm /> */}
      <div className="payment-form-footer">
        <Button onClick={goToPreviousStep} className="return-to-link">
          Return to shipping
        </Button>
        <Button
          className="continue-to"
          onClick={() => {
            payNow()
            setIndex(index + 1)
          }}
          disabled={payNowSpinner}
        >
          {payNowSpinner ? <Spinner /> : 'Pay Now'}
        </Button>
      </div>
    </div>
  )
}

export default PaymentInformationForm
