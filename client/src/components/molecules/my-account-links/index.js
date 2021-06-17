import React, { useContext, useState } from 'react'
import { AppContext } from 'libs/context'
// import Dropdown from 'components/atoms/dropdown'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import { useNavigate } from '@reach/router'
import './style.scss'

const navLinks = [
  {
    label: 'Delivery schedule',
    value: '/subscription/delivery-schedule',
  },
  {
    label: 'Subscriptions',
    value: '/account',
  },
  {
    label: 'Billing Information',
    value: '/subscription/billing-information',
  },
  {
    label: 'Purchase History',
    value: '/account/purchase-history',
  },
]

const MyAccountLeftMenu = () => {
  const { personalInfo } = useContext(AppContext)
  const [navValue, setnavValue] = useState(navLinks[1].value)
  const navigate = useNavigate()
  return (
    <div className="my-account-left-layout">
      {/* {personalInfo && Object.keys(personalInfo).length > 0 && (
        <Label className="account-holder-name">
      {personalInfo && Object.keys(personalInfo).length > 0 && (
        <Label className="accountTitle">
          {personalInfo.firstName} {personalInfo.lastName}
        </Label>
      )} */}
      {/* <div className="left-dropdown">
        <Dropdown
          items={navLinks}
          className="product-dropdown"
          optionClassName="dropdown-options"
          disabledOptionStyle={{
            borderTop: '1px solid #e9ecef',
          }}
          value={navValue}
          onChange={value => {
            navigate(value)
            setnavValue(value)
          }}
        />
      </div> */}
      <select
        className="left-dropdown"
        onClick={e => {
          setnavValue(e.target.value)
          navigate(e.target.value)
        }}
        value={navValue}
      >
        <option value="/subscription/delivery-schedule">
          Delivery schedule
        </option>
        <option value="/account">Subscriptions</option>
        {/* <option value="/subscription/billing-information">
          Billing information
        </option> */}
        <option value="/account/purchase-history" selected="">
          Purchase history
        </option>
      </select>

      <div className="innerLinks">
        {personalInfo && Object.keys(personalInfo).length > 0 && (
          <Label className="account-holder-name">
            {personalInfo.firstName} {personalInfo.lastName}
          </Label>
        )}
        <Link
          to="/subscription/delivery-schedule"
          className="account-leftbar-link"
        >
          Delivery Schedule
        </Link>
        <Link to="/account" className="account-leftbar-link">
          Subscriptions
        </Link>
        {/* <Link
          to="/subscription/billing-information"
          className="account-leftbar-link"
        >
          Billing Information{' '}
        </Link> */}
        <Link to="/account/purchase-history" className="account-leftbar-link">
          Purchase History
        </Link>
      </div>
    </div>
  )
}

export default MyAccountLeftMenu
