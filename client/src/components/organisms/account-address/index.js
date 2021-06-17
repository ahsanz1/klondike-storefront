/* eslint-disable */
import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from 'libs/context'
import { navigate } from '@reach/router'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import Button from 'components/atoms/button'
import RequestForm from 'components/molecules/request-forms/request-form'
import AccountAddresses from 'components/molecules/account-addresses'

import {
  createAddress,
  defaultAddress,
  unsetDefaultAddress,
  allAddresses,
  updateAddress,
  deleteAddress,
} from 'libs/api/user'
import './style.scss'
import useAddresses from 'libs/api-hooks/useAddresses'

const AccountAddress = ({
  account_title,
  account_subTitle,
  returnToAccountText,
  returnToAccountLink,
  addNewAddressBtnText,
  lblInputClass = '',
  formBgColor = '',
  formTitle,
  formEditTitle,
  mobileFormTitle,
  buttonLabel,
  cancelButtonLabel,
  checkboxText,
  formInputs,
}) => {
  const [load, setLoad] = useState(false)
  const [apiAddresses, setApiAddresses] = useState([])
  const [showNewAddForm, setShowNewAddForm] = useState(false)
  const [newAddFormLoading, setNewAddFormLoading] = useState(false)
  const [isEditableForm, setIsEditableForm] = useState(-1)
  const { user, personalInfo } = useContext(AppContext)
  const {
    addresses,
    error,
    success,
    addAddress,
    removeAddress,
    editAddress,
  } = useAddresses()

  const { _id, accessToken } = user
  const { email } = personalInfo
  const form = {
    formTitle,
    formEditTitle,
    mobileFormTitle,
    buttonLabel,
    cancelButtonLabel,
    checkboxText,
    formInputs,
  }

  const handleDisplayForm = () => {
    setShowNewAddForm(!showNewAddForm)
  }

  const handleEditableForm = i => {
    setIsEditableForm(i)
  }

  useEffect(() => {
    if (accessToken) {
      setLoad(true)
    } else {
      navigate('/account/login')
    }
  }, [])

  const scrollToTop = () => {
    return window.scrollTo(0, 0)
  }

  const onSubmit = async (data, i) => {
    await addAddress(data)
    setShowNewAddForm(false)
    scrollToTop()
  }

  const onEditFormSubmit = async (data, id) => {
    await editAddress(data, id)
    setIsEditableForm(-1)
    scrollToTop()
  }

  const onDeleteFormSubmit = async id => {
    await removeAddress(id)
    scrollToTop()
  }

  return (
    <div className="addresses--container">
      {load && (
        <>
          <Label className="title">{account_title}</Label>
          <label className="request-form__reset-detail-title errorCls">
            {error}
          </label>
          <div className="new--address">
            <Link to={returnToAccountLink}>
              <Label className="return-address">{returnToAccountText}</Label>
            </Link>
            <Button className="add-address-btn" onClick={handleDisplayForm}>
              {addNewAddressBtnText}
            </Button>
          </div>
          {showNewAddForm && (
            <div className="address-form">
              <RequestForm
                addressError={error}
                form={form}
                // loading={newAddFormLoading}
                formBgColor={formBgColor}
                lblInputClass={lblInputClass}
                showForm={handleDisplayForm}
                onFormSubmit={onSubmit}
                // defaultAddress={defaultAddressOnChange}
              />
            </div>
          )}

          <div className="address-form-edit-delete">
            <Label className="sub-title">{account_subTitle}</Label>
            {addresses && addresses.length > 0 && (
              <>
                {addresses.map((accountForm, i) => (
                  <AccountAddresses
                    formConfig={form}
                    key={i}
                    current={i}
                    isEditableForm={isEditableForm}
                    handleEditableForm={handleEditableForm}
                    onDeleteFormSubmit={onDeleteFormSubmit}
                    onEditFormSubmit={onEditFormSubmit}
                    form={accountForm}
                  />
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
AccountAddress.propTypes = {
  account_title: PropTypes.string,
  account_subTitle: PropTypes.string,
  returnToAccountText: PropTypes.string,
  returnToAccountLink: PropTypes.string,
  addNewAddressBtnText: PropTypes.string,
  lblInputClass: PropTypes.string,
  formBgColor: PropTypes.string,
  formTitle: PropTypes.string,
  formEditTitle: PropTypes.string,
  mobileFormTitle: PropTypes.string,
  buttonLabel: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  checkboxText: PropTypes.string,
  formInputs: PropTypes.array,
}

export default AccountAddress
