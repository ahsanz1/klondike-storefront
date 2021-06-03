import React, { useContext } from 'react'

import './style.scss'

import { AppContext } from 'libs/context'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'

const ContactOrderInfoBox = () => {
  const {
    step,
    shippingServiceName,
    shippingServicePrice,
    shippingAddress,
    checkoutEmail,
    personalInfo,
    setStep,
  } = useContext(AppContext)

  return (
    <div className="contact-info-box">
      {step >= 1 && (
        <div className="contact-info-box-contact">
          <div className="contact-info-box-contact-labels">
            <Label className="contact-info-box-contact-label">Contact</Label>
            <Label className="contact-info-box-contact-email">
              {personalInfo && Object.keys(personalInfo).length > 0
                ? personalInfo.email
                : checkoutEmail.isEmail}
            </Label>
          </div>
          <Button
            className="contact-info-box-contact-change"
            onClick={() => setStep(1)}
          >
            Change
          </Button>
        </div>
      )}
      {step >= 2 && (
        <div className="contact-info-box-ship-to">
          <div className="contact-info-box-contact-labels">
            <Label className="contact-info-box-ship-to-label">Ship to</Label>
            <Label className="contact-info-box-ship-to-email">
              {shippingAddress.firstName}, {shippingAddress.lastName},{' '}
              {shippingAddress.address}, {shippingAddress.city},{' '}
              {shippingAddress.country}
            </Label>
          </div>
          <Button
            className="contact-info-box-ship-to-change"
            onClick={() => setStep(1)}
          >
            Change
          </Button>
        </div>
      )}
      {step === 3 && (
        <div className="contact-info-box-ship-to">
          <div className="contact-info-box-contact-labels">
            <Label className="contact-info-box-ship-to-label">Method</Label>
            <Label className="contact-info-box-ship-to-email">
              {shippingServiceName} · {shippingServicePrice}
            </Label>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContactOrderInfoBox
