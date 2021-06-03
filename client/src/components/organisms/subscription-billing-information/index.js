/* eslint-disable indent */
import React, { useContext } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import './style.scss'

import Label from 'components/atoms/label'
import Button from 'components/atoms/button'
import MyAccountLeftMenu from 'components/molecules/my-account-links'
import requireAuth from 'libs/hoc/authHOC'

const SubscriptionBillingInformation = ({
  cardInfo: { cardIdentifier, cardProvider, expiryDate },
  billingInfo: { firstName, lastName, email, state, zipCode, address, country },
}) => {
  const { subscriptionBillingInfo } = useContext(AppContext)
  return (
    <div className="subscription-billing-information">
      <MyAccountLeftMenu />
      <div className="subscription-billing-information-section">
        <Label className="billing-info-heading">Billing Information</Label>
        <div className="billing-card-info">
          <Label className="billing-card-info-heading">Card on file</Label>
          <div className="card-info">
            <Label>
              {cardProvider} ending in {cardIdentifier}
            </Label>
            <Label>Expires in {expiryDate}</Label>
            <Button className="billing-info-button">Update Card</Button>
          </div>
        </div>
        {subscriptionBillingInfo &&
          Object.keys(subscriptionBillingInfo).length > 0 && (
            <div className="billing-address-info">
              {console.log({ subscriptionBillingInfo })}
              <Label className="billing-address-info-heading">
                Billing Information
              </Label>
              <div className="billing-info">
                <Label>{subscriptionBillingInfo.firstName}</Label>
                <Label>{subscriptionBillingInfo.lastName}</Label>
                <Label>{subscriptionBillingInfo.address}</Label>
                <Label>
                  {subscriptionBillingInfo.state}{' '}
                  {subscriptionBillingInfo.zipCode}
                </Label>
                <Label>{subscriptionBillingInfo.country}</Label>
                <Label>{subscriptionBillingInfo.email}</Label>
                <Button className="billing-info-button">Edit</Button>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

const { object } = PropTypes
SubscriptionBillingInformation.propTypes = {
  cardInfo: object,
  billingInfo: object,
}

export default requireAuth(SubscriptionBillingInformation)
