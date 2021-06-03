import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import { AppContext } from 'libs/context'
import Label from 'components/atoms/label'
import BillingAddress from 'components/molecules/checkout/forms/shipping-address/billing-address'

const BillingAddressForm = ({ bindSubmitForm }) => {
  const [checkedd, setCheckedd] = useState(false)
  const [valued, setValued] = useState('same-address')

  const { setSameBillingShippingAddress } = useContext(AppContext)

  const handleCheckedChanged = e => {
    console.log(e.target.value)
    setValued(e.target.value)
    // if (valued === 'different-address') {
    //   setSameBillingShippingAddress(false)
    // }
    return setCheckedd(!checkedd)
  }
  return (
    <div className="billing-address">
      <Label className="payment-form-heading">Billing address</Label>
      <Label className="payment-form-paragraph">
        Select the address that matches your card or payment method.
      </Label>
      <div className="payment-form">
        <div className="payment-credit-card">
          <div className="payment-credit-card-header">
            <div className="payment-credit-card-header-radio">
              <input
                type="radio"
                name="Same Billing Address"
                onChange={e => {
                  handleCheckedChanged(e)
                }}
                checked={!checkedd}
                value="same-address"
              />
              <Label className="payment-credit-card-header-heading">
                Same as shipping address
              </Label>
            </div>
          </div>
        </div>
        <div className="payment-credit-card">
          <div className="payment-credit-card-header">
            <div className="payment-credit-card-header-radio">
              <input
                type="radio"
                name="Different billing address"
                onChange={e => {
                  handleCheckedChanged(e)
                  setSameBillingShippingAddress(false)
                }}
                checked={checkedd}
                value="different-address"
              />
              <Label className="payment-credit-card-header-heading">
                Use a different billing address
              </Label>
            </div>
          </div>
          {valued === 'different-address' && (
            <div className="shopping-address-form">
              <BillingAddress bindSubmitForm={bindSubmitForm} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

BillingAddressForm.propTypes = {
  bindSubmitForm: PropTypes.func,
}

export default BillingAddressForm
