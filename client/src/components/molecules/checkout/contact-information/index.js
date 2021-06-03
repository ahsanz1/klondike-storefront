/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useState, useEffect } from 'react'
import { message, Modal } from 'antd'
import './style.scss'
import { AppContext } from 'libs/context'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import Button from 'components/atoms/button'
import ShippingAddressForm from 'components/molecules/checkout/forms/shipping-address'
import UserEmailLogin from 'components/molecules/checkout/user-email-login'
// import ExpressCheckout from 'components/molecules/checkout/express-checkout'
import useValidateAddress from 'libs/api-hooks/useValidateAddress'
import Spinner from 'components/atoms/spinner'

const ContactInformationForm = () => {
  const {
    shippingAddress,
    setShippingAddress,
    checkoutEmail,
    payNowSpinner,
    personalInfo,
    goToNextStep,
    emailDone,
    shippingDone,
    step,
  } = useContext(AppContext)

  const { validateAddressCall } = useValidateAddress()
  const [checked, setChecked] = useState(false)
  const [suggestedAddress, setSuggestedAddress] = useState({})
  const [isAddressSelected, setIsAddressSelected] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [addressSelected, setAddressSelected] = useState('1')
  const [index, setIndex] = useState(0)

  const changeAddress = value => {
    setAddressSelected(value)
    setChecked(!checked)
  }

  const userSignedIn = !!(personalInfo && Object.keys(personalInfo).length > 0)
  const isShippingAddress = !!(
    personalInfo && Object.values(shippingAddress).length > 0
  )

  useEffect(() => {
    if (userSignedIn && isAddressSelected) {
      handleOk()
      goToNextStep()
    } else if (
      isShippingAddress &&
      !userSignedIn &&
      checkoutEmail.isEmail &&
      isAddressSelected
    ) {
      handleOk()
      goToNextStep()
    }
  }, [isAddressSelected])

  const addressConfirm = () => {
    if (addressSelected === '2') {
      const payload = {
        firstName: shippingAddress.firstName,
        lastName: shippingAddress.lastName,
        city: suggestedAddress.city,
        address: suggestedAddress.line1,
        zipCode: suggestedAddress.postalCode,
        state: suggestedAddress.region,
        country: suggestedAddress.country,
        apartmentOptional: shippingAddress.apartmentOptional,
        mobileNumber: shippingAddress.mobileNumber,
        email: checkoutEmail.isEmail,
      }
      setShippingAddress(payload)
    }
    setIsAddressSelected(true)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
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
    console.log({ shippingDone })
    console.log({ emailDone })

    shippingDone &&
      emailDone &&
      index > 0 &&
      step === 1 &&
      submitShippingInformaion()
  }, [shippingAddress, index])

  const submitShippingInformaion = async () => {
    const addressValidation =
      shippingDone && emailDone && (await validateAddressCall())
    if (
      addressValidation &&
      addressValidation.data &&
      addressValidation.data.addressValid &&
      Object.keys(addressValidation.data).length === 1
    ) {
      goToNextStep()
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
      setSuggestedAddress(addressValidation.data.validatedAddrSuggestions[0])
      showModal()
    }
  }

  return (
    <div className="contact-info-form">
      {/* <ExpressCheckout /> */}
      {/* <div className="divider">
        <Divider> OR </Divider>
      </div> */}
      <UserEmailLogin bindSubmitForm={bindSubmitForm1} />
      <Modal
        title="Address Verification"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div className="suggested-addresses">
          <p className="address-p">Entered Address</p>
          <div className="entered-address" onClick={() => changeAddress('1')}>
            <input
              type="radio"
              name="Suggested Address"
              value="1"
              onChange={e => {
                changeAddress(e.target.value)
              }}
              checked={!checked}
            />
            <div className="address">
              <p>{shippingAddress && shippingAddress.address}</p>
              <p>{shippingAddress && shippingAddress.city}</p>
              <p>
                {shippingAddress && shippingAddress.state}{' '}
                {shippingAddress && shippingAddress.zipCode}
              </p>
              <p>{shippingAddress && shippingAddress.country}</p>
            </div>
          </div>
          <p className="address-p">Suggested Address</p>
          <div className="suggested-address" onClick={() => changeAddress('1')}>
            <input
              type="radio"
              name="Entered Address"
              value="2"
              onChange={e => {
                changeAddress(e.target.value)
              }}
              checked={checked}
            />
            <div className="address">
              <p>{suggestedAddress && suggestedAddress.line1}</p>
              <p>{suggestedAddress && suggestedAddress.city}</p>
              <p>
                {suggestedAddress && suggestedAddress.region}{' '}
                {suggestedAddress && suggestedAddress.postalCode}
              </p>
              <p>{suggestedAddress && suggestedAddress.country}</p>
            </div>
          </div>
          <Button
            onClick={() => {
              addressConfirm()
            }}
            className="address-submit"
          >
            Confirm Address
          </Button>
        </div>
      </Modal>
      <Label className="shipping-address-label">Shipping address</Label>
      <ShippingAddressForm
        bindSubmitForm={bindSubmitForm}
        isModalOpen={isModalVisible}
      />
      <div className="shipping-form-footer">
        <Link to="/cart" className="return-to-link">
          Return to cart
        </Link>
        <Button
          type="submit"
          className="continue-to"
          onClick={() => {
            handleSubmitMyForm()
            handleSubmitMyForm1()
            setIndex(index + 1)
          }}
        >
          {payNowSpinner ? <Spinner /> : 'Continue to shipping'}
        </Button>
      </div>
    </div>
  )
}

export default ContactInformationForm
