import React, { useState } from 'react'

import './style.scss'

import Label from 'components/atoms/label'
// import MobileNumberInput from 'components/molecules/mobile-number-input'

const RememberMeForm = () => {
  const [checked, setChecked] = useState(false)

  const handleChange = e => {
    return setChecked(!checked)
  }
  return (
    <div className="remember-me-form">
      <Label className="remember-me-heading">Remember me</Label>
      <div className="remember-me-wrapper">
        <div className="remember-me-header">
          <input
            type="checkbox"
            className="remember-me-checkbox"
            onClick={handleChange}
          />
          <Label className="remember-me-header-heading">
            Save my information for a faster checkout
          </Label>
        </div>
        {checked && (
          <div className="remember-me-content">
            {/* <MobileNumberInput /> */}
            <Label className="remember-me-instructions">
              Next time you check out here or on other stores powered by
              Shopify, you’ll receive a code by text message to securely
              purchase with Shop Pay.
            </Label>
          </div>
        )}
      </div>
    </div>
  )
}

export default RememberMeForm
