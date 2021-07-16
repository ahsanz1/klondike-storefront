import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Container from 'components/molecules/container'
import Button from 'components/atoms/button'
import Label from 'components/atoms/label'
import LabelInput from 'components/molecules/request-forms/label-input'
import { Spin, Alert } from 'antd'
import { validators } from 'libs/utils/validators'
import { LoadingOutlined } from '@ant-design/icons'
import Link from 'components/atoms/link'
import { options } from 'libs/utils/helper'

import './styles.scss'

const antIcon = <LoadingOutlined className="submit-loader" spin />

const RequestForm = (
  {
    addressError = '',
    defaultAddress,
    resetPasswordLink = {},
    loading = false,
    success = '',
    error = '',
    resetLink = {},
    form = {},
    onFormSubmit,
    formsIndex,
    formBgColor = '',
    className = '',
    lblInputClass = '',
    showForm,
    defaultForm = {},
    isEditableForm = false,
    switchRegion = false,
    openAlert = false,
    alertData = {},
  },
  ref,
) => {
  const [formData, setFormData] = useState(defaultForm)
  const [formErrors, setFormErrors] = useState({})
  const formRef = useRef()

  useImperativeHandle(ref, () => ({
    submit: () => {
      formRef.current.dispatchEvent(new Event('submit'))
    },
  }))

  const onChangeHandler = (id, value) => {
    setFormData({
      ...formData,
      [id]: value,
    })
    setFormErrors({
      ...formErrors,
      [id]: [],
    })
  }
  const checkValidations = (validations, id) => {
    let errors = []
    Object.keys(validations).map(validation => {
      if (validation.includes('validations_')) {
        const v = validation.split('_')

        if (validations[validation]) {
          const result = validators[v[1]](formData[id])
          if (!result.status) {
            errors.push(result.errorMessage)
          }
        }
      }
    })
    return { status: errors.length > 0, errors: { [id]: errors } }
  }
  const onBlurHandler = (validations, id) => {
    const error = checkValidations(validations, id)
    setFormErrors({
      ...formErrors,
      ...error.errors,
    })
  }
  const checkAllValidations = formInputs => {
    let allErrors = {}
    let status = false
    formInputs.map(({ formRow }) => {
      formRow.map(validations => {
        const result = checkValidations(validations, validations.id)
        if (result.status) status = result.status
        allErrors = { ...allErrors, ...result.errors }
      })
    })
    return { status, allErrors }
  }
  const onSubmit = e => {
    e.preventDefault()
    let errors = checkAllValidations(form.formInputs)
    setFormErrors(errors.allErrors)
    if (!errors.status) {
      onFormSubmit(formData, formsIndex)
    }
  }

  return (
    <Container color={formBgColor} className={`request-form ${className}`}>
      <div className="request-form__content">
        <div className="form-content">
          <Label className="request-form__title">
            {isEditableForm ? form.formEditTitle : form.formTitle}
          </Label>
          <Label className="request-form__mobile-title">
            {form.mobileFormTitle}
          </Label>
          {form.subtitle && (
            <div
              className="request-form__subtitle"
              dangerouslySetInnerHTML={{ __html: form.subtitle }}
            />
          )}
        </div>

        <div className="request-forms">
          <Label className="request-form__reset-title">{form.resetTitle}</Label>

          {formsIndex === 4 ? (
            <Label className="request-form__reset-detail-title">
              {/* {form.resetDetailTitle} */}
            </Label>
          ) : (
            <Label className="request-form__reset-detail-title">
              {form.resetDetailTitle}
            </Label>
          )}

          {formsIndex !== 2 && (
            <Label className="request-form__error">{error}</Label>
          )}

          {formsIndex === 2 && error.length > 1 && (
            <Label className="request-form__error">
              {error}
              {resetPasswordLink.link && (
                <Link
                  to={resetPasswordLink.link}
                  className="request-form__resetLink"
                >
                  {resetPasswordLink.text}
                </Link>
              )}
            </Label>
          )}

          {success.length > 0 && (
            <Label className="request-form__success">{success}</Label>
          )}
          <form onSubmit={onSubmit} ref={formRef}>
            {form.formInputs.map(({ formRow }, rowIndex) => (
              <div key={rowIndex} className="request-form__row">
                {formRow.map((item, colIndex) => {
                  let { label, fieldType, id, placeholder, optionsType } = item
                  let items = []
                  if (options[optionsType]) {
                    items = options[optionsType]
                  }
                  if (id === 'state' && switchRegion) {
                    if (formData['country'] !== 'US') {
                      label = 'Region'
                      fieldType = 'text'
                      items = []
                    }
                  }

                  return (
                    <div
                      key={colIndex}
                      className="request-form__col"
                      style={{
                        width: 100 / formRow.length + '%',
                      }}
                    >
                      <LabelInput
                        items={items}
                        inputClass={lblInputClass}
                        placeholder={placeholder}
                        label={label}
                        validations={item}
                        value={formData[id] || ''}
                        onBlurHandler={onBlurHandler}
                        onChangeHandler={onChangeHandler}
                        errors={formErrors[id]}
                        id={id}
                        fieldType={fieldType}
                      />
                    </div>
                  )
                })}
              </div>
            ))}
            {openAlert && (
              <Alert
                message={alertData.message}
                description={alertData.description}
                type={alertData.type}
                className="custom-alert"
                closable
              />
            )}
            <div className="request-form__submit-button-wrapper">
              <Button type="submit" className="request-form__submit-button">
                {loading ? (
                  <Spin indicator={antIcon} />
                ) : (
                  <>{isEditableForm ? 'Update Address' : form.buttonLabel}</>
                )}
              </Button>
              {form.cancelButtonLabel && (
                <Button
                  className="request-form__submit-button"
                  onClick={showForm}
                >
                  {form.cancelButtonLabel}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}

RequestForm.propTypes = {
  form: PropTypes.object,
  defaultAddress: PropTypes.func,
  onFormSubmit: PropTypes.func,
  showForm: PropTypes.func,
  formsIndex: PropTypes.number,
  formBgColor: PropTypes.string,
  className: PropTypes.string,
  lblInputClass: PropTypes.string,
  defaultForm: PropTypes.object,
  isEditableForm: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.string,
  success: PropTypes.string,
  resetPasswordLink: PropTypes.object,
  resetLink: PropTypes.object,
  addressError: PropTypes.string,
  switchRegion: PropTypes.bool,
  openAlert: PropTypes.string,
  alertData: PropTypes.string,
}

export default forwardRef(RequestForm)
