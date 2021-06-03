import React, { useEffect, useContext, useState } from 'react'
import PropTypes from 'prop-types'

import Link from 'components/atoms/link'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'

import './style.scss'
import useAddresses from 'libs/api-hooks/useAddresses'
import { AppContext } from 'libs/context'
import { navigate } from '@reach/router'

import OrderHistory from 'components/molecules/subscription-order-history'
import { myAccount } from 'libs/data/data'

const MyAccount = ({
  btnText = 'MANAGE SUBSCRIPTIONS',
  btnLink = '/account/subscriptionOrderDetails',
  orderLink = '/account/singleorderdetail',
  addressesText = 'View Addresses',
  addressesLink = '/account/address',
  shopBtnText = 'SHOP NOW',
  shopBtnLink = '/collections/all-bars',
}) => {
  const [load, setLoad] = useState(false)
  const { addresses } = useAddresses()
  const {
    user: { accessToken },
    subscribed,
  } = useContext(AppContext)
  const defaultObject = addresses.find(el => el.isDefault === true)

  useEffect(() => {
    if (accessToken) {
      setLoad(true)
    } else {
      navigate('/account/login')
    }
  }, [])

  return (
    <div className="account--container">
      {load && (
        <>
          <div className="outer-section">
            <Label className="heading-title">{myAccount.title}</Label>
            {subscribed && (
              <div className="manage-subscription">
                <Label className="manage-subscription-title">
                  SUBSCRIPTIONS
                </Label>
                <Link
                  className="manage-subscription-button"
                  to={btnLink || '/account/subscriptionOrderDetails'}
                >
                  {btnText}
                </Link>
              </div>
            )}
            <Label className="order-title">{myAccount.subTitle}</Label>
            {/* <Label className="order-placed__text">
              {myAccount.ordersPlaced}
            </Label> */}
            <OrderHistory orderLink={orderLink} {...myAccount.orderHistory} />
            {!subscribed && (
              <Label className="order-placed__text">
                {myAccount.ordersPlaced}
              </Label>
            )}
          </div>
          <div className="inner-section">
            <div className="inner-section__left">
              <Label className="acc-details">{myAccount.accDetails}</Label>
              {defaultObject && (
                <>
                  <Label className="details-lbl">
                    {defaultObject.firstname} {''}
                    {defaultObject.lastname}
                  </Label>
                  <Label className="details-lbl">
                    {defaultObject.address1}
                  </Label>
                  <Label className="details-lbl">
                    {defaultObject.city} {defaultObject.zipCode}
                  </Label>
                  <Label className="details-lbl">{defaultObject.country}</Label>
                </>
              )}

              <Link to={addressesLink || myAccount.viewAddress.to}>
                <Label className="view-address">
                  {addressesText} ({addresses.length})
                </Label>
              </Link>
            </div>
            <div className="inner-section__right">
              <Label className="view-store">{myAccount.viewStore}</Label>
              <Link to={shopBtnLink || myAccount.shopNowButton.link}>
                <Button className="view--store__btn">{shopBtnText}</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

MyAccount.propTypes = {
  btnText: PropTypes.string,
  btnLink: PropTypes.string,
  orderLink: PropTypes.string,
  addressesText: PropTypes.string,
  addressesLink: PropTypes.string,
  shopBtnText: PropTypes.string,
  shopBtnLink: PropTypes.string,
}

export default MyAccount
