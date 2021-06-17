/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable indent */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import './style.scss'
import { useNavigate } from '@reach/router'
import { DatePicker, Skeleton, message } from 'antd'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import Button from 'components/atoms/button'
import Input from 'components/atoms/input'
import Dropdown from 'components/atoms/dropdown'
import MyAccountLeftMenu from 'components/molecules/my-account-links'
// import { useLocation } from '@reach/router'
import requireAuth from 'libs/hoc/authHOC'
import {
  getASubscription,
  updateSubscription,
  getSubscribableItems,
} from 'libs/services/api/subscriptions.api'
import { createStripePaymentMethod } from 'libs/services/api/checkout'

const DeliveryStatus = () => {
  const navigate = useNavigate()
  // const { editDeliveryStatus, setEditDeliveryStatus } = useContext(AppContext)
  const [editDeliveryStatus, setEditDeliveryStatus] = useState(false)
  const [subscription, setSubscription] = useState({})
  const [subQuantity, setSubQuantity] = useState(1)
  const [date, setDate] = useState('')
  const [delValue, setDelValue] = useState('')
  const [plans, setPlans] = useState([])
  const [itemId, setItemId] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardHolderName, setCardHolderName] = useState('')
  const [cardExpiryDate, setCardExpiryDate] = useState('')
  const [cardCVC, setCardCVC] = useState('')

  const onDateChange = date => {
    setDate(date._d.toISOString())
  }

  const changeDeliverySchedule = async value => {
    const getPlanData = plans && plans.find(plan => plan.value === delValue)
    const updateDeliverySchedule = {
      frequency: getPlanData.frequency,
      frequencyType: getPlanData.frequencyType,
    }
    const updateCall = await updateSubscription(
      updateDeliverySchedule,
      new URLSearchParams(location.search).get('subId'),
    )
    if (updateCall && !updateCall.error) {
      await navigate('/account/subscriptionOrderDetails')
    }
  }

  const changeNextChargeDate = async () => {
    const updateChargeDate = {
      nextPaymentDate: date,
    }
    const updateCall = await updateSubscription(
      updateChargeDate,
      new URLSearchParams(location.search).get('subId'),
    )
    if (updateCall && !updateCall.error) {
      await navigate('/account/subscriptionOrderDetails')
    }
  }

  const changePaymentMethod = async () => {
    if (cardNumber.length < 16 || cardNumber.length > 19) {
      message.error('Your credit card number is not valid')
    } else if (cardCVC.length < 3 || cardCVC.length > 4) {
      message.error(`Card's CVC length is not valid`)
    } else if (cardHolderName.split(' ').length < 2) {
      message.error('Please enter your full name')
    } else if (cardExpiryDate.length < 6 || cardExpiryDate.length > 6) {
      message.error('Enter expiry date in the given format')
    }
    const payload = {
      billing_details: {
        name: cardHolderName,
      },
      metadata: {},
      card: {
        number: cardNumber,
        exp_month: cardExpiryDate.slice(0, 2),
        exp_year: cardExpiryDate.slice(-4),
        cvc: cardCVC,
      },
    }
    let createStripePaymentMethodCall = await createStripePaymentMethod(payload)
    if (createStripePaymentMethodCall.error) {
      message.error(createStripePaymentMethodCall.code.message)
    } else {
      const payload = {
        paymentMethod: createStripePaymentMethodCall.data.id,
      }
      const updateCall = await updateSubscription(
        payload,
        new URLSearchParams(location.search).get('subId'),
      )
      if (updateCall && !updateCall.error) {
        navigate('/account/subscriptionOrderDetails')
      }
    }
  }

  const disabledDate = current => {
    // Can not select days before today
    return current && current < moment().startOf('day')
  }

  useEffect(() => {
    getASubscription(new URLSearchParams(location.search).get('subId')).then(
      ({ hasError, response }) => {
        if (!hasError) {
          setSubscription(response.data.data.subscription)
          setSubQuantity(response.data.data.subscription.quantity)
          setItemId(response.data.data.subscription.itemID)
        }
      },
    )
  }, [])

  useEffect(() => {
    const getItemPlans = async () => {
      console.log({ itemId })
      const getPlans = itemId && (await getSubscribableItems([itemId]))
      getPlans && console.log(getPlans.response.data.data)
      const activePlans =
        getPlans &&
        getPlans.response.data.data[itemId].filter(
          plan => plan.status === 'ACTIVE',
        )
      const gettingPlans =
        activePlans &&
        activePlans.length > 0 &&
        activePlans.map(plan => {
          return {
            frequency: plan.frequency,
            frequencyType: plan.frequencyType,
            value: `${plan.frequency} ${plan.frequencyType}`,
            label: `${plan.frequency} ${plan.frequencyType}`,
          }
        })
      gettingPlans && setPlans(gettingPlans)
    }
    getItemPlans()
  }, [itemId])

  const changeQuantity = async () => {
    const updateQuantityPayload = {
      quantity: subQuantity,
    }
    const updateCall = await updateSubscription(
      updateQuantityPayload,
      new URLSearchParams(location.search).get('subId'),
    )
    updateCall &&
      !updateCall.error &&
      navigate('/account/subscriptionOrderDetails')
  }

  const {
    itemID,
    nextPaymentDate,
    quantity,
    frequency,
    frequencyType,
    shipTo = {},
    payments = {},
  } = subscription
  const {
    name = {},
    city,
    state,
    zipCode,
    streetAddress = {},
    country,
  } = shipTo
  let paymentDate = new Date(nextPaymentDate)
  return (
    <div className="delivery-status">
      <MyAccountLeftMenu />
      {itemID ? (
        <div className="delivery-status-section">
          <Label className="delivery-status-label">
            {itemID} {'(Subscription)'}
          </Label>
          {/* <Label className="delivery-status-variant">
          Current variant {varient}
        </Label> */}
          <div className="delivery-status-info-cta">
            <Label>Next charge {paymentDate.toDateString()}</Label>
            <Button
              onClick={() => setEditDeliveryStatus(true)}
              className="delivery-status-cta"
            >
              Change next charge date
            </Button>
            {editDeliveryStatus && (
              <div className="delivery-status-input">
                <DatePicker
                  onChange={onDateChange}
                  placeholder=""
                  disabledDate={disabledDate}
                />
                <Button
                  className="delivery-status-input-save"
                  onClick={() => changeNextChargeDate()}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
          <div className="delivery-status-info-cta">
            <Label>Quantity: {quantity}</Label>
            <Button
              onClick={() => setEditDeliveryStatus(true)}
              className="delivery-status-cta"
            >
              Change product quantity
            </Button>
            {editDeliveryStatus && (
              <div
                className="delivery-status-input"
                onClick={() => setEditDeliveryStatus(true)}
              >
                <Input
                  value={subQuantity}
                  type="number"
                  onChange={({ value }) => {
                    setSubQuantity(value)
                  }}
                />
                <Button
                  className="delivery-status-input-save"
                  onClick={() => changeQuantity()}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
          <div className="delivery-status-info-cta">
            <Label>
              Delivery schedule Every {frequency} {frequencyType}
            </Label>
            <Button
              className="delivery-status-cta"
              onClick={() => setEditDeliveryStatus(true)}
            >
              Change delivery schedule
            </Button>
            {editDeliveryStatus && (
              <>
                {plans && plans.length > 0 && (
                  <Dropdown
                    items={plans}
                    value={delValue}
                    onChange={value => {
                      setDelValue(value)
                    }}
                  />
                )}
                <Button
                  className="delivery-status-input-save"
                  onClick={() => changeDeliverySchedule()}
                >
                  Save
                </Button>
              </>
            )}
          </div>
          <div className="delivery-status-info-cta">
            <Label>Payment method</Label>
            {payments.paymentIdentifier && (
              <Label>
                {payments.paymentIdentifier.paymentMethod} ending in{' '}
                {payments.paymentIdentifier.cardIdentifier}
              </Label>
            )}
            <Button
              onClick={() => setEditDeliveryStatus(true)}
              className="delivery-status-cta"
            >
              Update payment information
            </Button>
            {editDeliveryStatus && (
              <div className="delivery-status-input">
                <Input
                  value={cardNumber}
                  placeholder="Enter your credit card number"
                  minLength="16"
                  maxLength="19"
                  type="number"
                  onChange={({ value }) => {
                    setCardNumber(value)
                  }}
                />
                <Input
                  value={cardHolderName}
                  placeholder="Enter name on the card"
                  type="text"
                  onChange={({ value }) => {
                    setCardHolderName(value)
                  }}
                />
                <Input
                  value={cardExpiryDate}
                  placeholder="MMYYYY Credit Card Expiry Date"
                  minLength={6}
                  maxLength={6}
                  type="number"
                  onChange={({ value }) => {
                    setCardExpiryDate(value)
                  }}
                />
                <Input
                  value={cardCVC}
                  placeholder="Enter CVC code"
                  minLength={3}
                  maxLength={4}
                  type="number"
                  onChange={({ value }) => {
                    setCardCVC(value)
                  }}
                />
                <Button
                  className="delivery-status-input-save"
                  onClick={() => changePaymentMethod()}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
          <div className="delivery-shipping">
            <Label className="delivery-status-shipping">Shipping</Label>
            <Label className="delivery-status-shipping">
              {name.firstName} {name.lastName}
            </Label>
            {/* <Label className="delivery-status-shipping">{company}</Label> */}
            <Label className="delivery-status-shipping">
              {streetAddress.street1 + ' ' + streetAddress.street2}
            </Label>
            <Label className="delivery-status-shipping">
              {city} {state} {zipCode}
            </Label>
            <Label className="delivery-status-shipping">{country}</Label>
            {/* <Label className="delivery-status-shipping">{email}</Label> */}
            <div>
              <Link
                className="delivery-shipping-cta"
                to={`/subscription/address?subId=${new URLSearchParams(
                  location.search,
                ).get('subId')}`}
              >
                Edit Address
              </Link>
            </div>
            {/* <Button
            onClick={() => setEditDeliveryStatus(true)}
            className="delivery-shipping-cta"
          >
            Edit
          </Button> */}
          </div>
          <div className="delivery-status-info-cta">
            <Link
              to="/subscription/delivery-schedule"
              className="delivery-status-cta"
            >
              Cancel
            </Link>
          </div>
        </div>
      ) : (
        <div className="delivery-status-section">
          <Skeleton active />
        </div>
      )}
    </div>
  )
}

DeliveryStatus.propTypes = {
  label: PropTypes.string,
  varient: PropTypes.string,
  quantity: PropTypes.string,
  chargeDate: PropTypes.string,
  frequency: PropTypes.string,
  cardProvider: PropTypes.string,
  cardIdentifier: PropTypes.string,
  expiryDate: PropTypes.string,
  shipping: PropTypes.object,
}

export default requireAuth(DeliveryStatus)
