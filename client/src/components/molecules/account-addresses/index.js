/* eslint-disable */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from 'components/atoms/button'
import RequestForm from 'components/molecules/request-forms/request-form'
import AddressBox from 'components/molecules/address-box'

import './style.scss'

const AccountAddresses = ({
  formConfig,
  form,
  id,
  onEditFormSubmit,
  onDeleteFormSubmit,
  handleEditableForm,
  isEditableForm,
  current,
}) => {
  const changedValue = (data, id) => {
    onEditFormSubmit(data, id)
  }

  return (
    <div className="address-form-edit-delete">
      <AddressBox {...form} />
      <Button
        className="edit-btn"
        onClick={() => {
          handleEditableForm(current)
        }}
      >
        EDIT
      </Button>
      <Button
        className="delete-btn"
        onClick={() => {
          onDeleteFormSubmit(form.id)
        }}
      >
        DELETE
      </Button>
      {isEditableForm === current && (
        <RequestForm
          form={formConfig}
          defaultForm={form}
          isEditableForm={isEditableForm}
          onFormSubmit={changedValue}
          formsIndex={form.id}
          showForm={() => {
            handleEditableForm(-1)
          }}
        />
      )}
    </div>
  )
}
AccountAddresses.propTypes = {
  onDeleteFormSubmit: PropTypes.func,
  onEditFormSubmit: PropTypes.func,
  formConfig: PropTypes.object,
  form: PropTypes.object,
  oldForm: PropTypes.object,
  id: PropTypes.number,
}

export default AccountAddresses
