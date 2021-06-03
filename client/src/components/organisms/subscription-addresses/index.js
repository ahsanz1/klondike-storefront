import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from '@reach/router'
import { Alert, Checkbox, Skeleton } from 'antd'
import Label from 'components/atoms/label'
import MyAccountLeftMenu from 'components/molecules/my-account-links'
import RequestForm from 'components/molecules/request-forms/request-form'
import {
  editASubscription,
  getASubscription,
} from 'libs/services/api/subscriptions.api'
import { shippingAddress, billingAddress } from './from-config'
import './styles.scss'

const SubscriptionAddresses = () => {
  var shippingFormRef = useRef()
  const [sameAsShipping, setSameAsShipping] = useState(false)
  const [billingAddressData, setBillingAddressData] = useState()
  const [defaultShipTo, setDefaultShipTo] = useState({})
  const [defaultBillTo, setDefaultBillTo] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const location = useLocation()

  useEffect(() => {
    getASubscription(new URLSearchParams(location.search).get('subId')).then(
      ({ hasError, response }) => {
        if (!hasError) {
          const shipTo = transformToFormAddress(
            response.data.data.subscription.shipTo,
          )
          setDefaultShipTo(shipTo)
          const billTo = transformToFormAddress(
            response.data.data.subscription.billTo,
          )
          setDefaultBillTo(billTo)
          console.log('specific', response.data)
        }
      },
    )
  }, [location.search])

  const transformToFormAddress = ({
    name,
    city,
    country,
    state,
    streetAddress,
    zipCode,
  }) => {
    return {
      firstName: name && name.firstName,
      lastName: name && name.lastName,
      city,
      country,
      state,
      address1: streetAddress && streetAddress.street1,
      address2: streetAddress && streetAddress.street2,
      zipCode,
    }
  }

  const transformToApiAddress = ({
    firstName,
    lastName,
    address1,
    address2,
    country,
    state,
    city,
    zipCode,
    phone,
  }) => {
    return {
      name: {
        firstName,
        lastName,
      },
      streetAddress: {
        street1: address1,
        street2: address2,
      },
      city,
      state,
      zipCode,
      country,
      ...(phone && { phone: { number: phone } }),
    }
  }

  const onBillingSubmit = async data => {
    console.log('billing to', { data }, shippingFormRef)
    setBillingAddressData(data)
    data && onShippingSubmit(data)
  }
  const onShippingSubmit = data => {
    console.log('shipping', { data })
    const shipTo = transformToApiAddress(data)
    let payload = {}
    payload.shipTo = shipTo

    if (sameAsShipping) {
      payload.billTo = { ...payload.shipTo }
    } else {
      const billTo = transformToApiAddress(billingAddressData)
      payload.billTo = billTo
    }
    setLoading(true)
    editASubscription(
      new URLSearchParams(location.search).get('subId'),
      payload,
    ).then(({ hasError, response }) => {
      setLoading(false)
      if (!hasError) {
        setError('success')
        setTimeout(() => {
          setError('')
        }, 3000)
        const shipTo = transformToFormAddress(response.data.data.shipTo)
        setDefaultShipTo(shipTo)
        const billTo = transformToFormAddress(response.data.data.billTo)
        setDefaultBillTo(billTo)
      } else {
        setError('error')
        setTimeout(() => {
          setError('')
        }, 3000)
      }
    })
  }

  return (
    <div className="subscription-address">
      <MyAccountLeftMenu />
      <div className="subscription-address__form">
        {defaultShipTo.firstName && defaultBillTo.firstName ? (
          <div>
            <RequestForm
              loading={loading}
              defaultForm={defaultShipTo}
              ref={f => (shippingFormRef = f)}
              className={`shipping-address ${sameAsShipping ? '' : 'hide-btn'}`}
              form={shippingAddress}
              formBgColor={shippingAddress.formBgColor}
              onFormSubmit={onShippingSubmit}
            />

            <div className="checkbox-wrapper">
              <Checkbox
                checked={sameAsShipping}
                onChange={e => {
                  console.log(e.target.checked)
                  setSameAsShipping(e.target.checked)
                }}
              />
              <Label
                style={{
                  marginLeft: '5px',
                }}
              >
                Billing same as Shipping
              </Label>
            </div>

            {!sameAsShipping && (
              <RequestForm
                loading={loading}
                defaultForm={defaultBillTo}
                switchRegion={true}
                className="billing-address"
                form={billingAddress}
                formBgColor={shippingAddress.formBgColor}
                onFormSubmit={onBillingSubmit}
              />
            )}
            <div className="error-wrapper">
              {error === 'success' && (
                <Alert
                  message="Address updated successfully"
                  type="success"
                  showIcon
                />
              )}
              {error === 'error' && (
                <Alert message="Something went wrong" type="error" showIcon />
              )}
            </div>
          </div>
        ) : (
          <div
            style={{
              paddingTop: '80px',
            }}
          >
            <Skeleton active />
          </div>
        )}
      </div>
    </div>
  )
}

export default SubscriptionAddresses
