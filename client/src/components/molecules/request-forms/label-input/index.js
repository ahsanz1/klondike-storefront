import React from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import InputTextField from 'components/atoms/input'
import NativeDropdown from 'components/atoms/native-dropdown'
import './styles.scss'
import { Checkbox } from 'antd'
import TextArea from 'components/atoms/text-area'

const LabelInput = ({
  label = '',
  secondaryLabel = '',
  validations = {},
  value = '',
  id,
  errors = [],
  onBlurHandler,
  onChangeHandler,
  inputClass = '',
  labelClass = '',
  parentClass = '',
  secondaryLabelClass = '',
  placeholder = '',
  fieldType = '',
  items = [],
}) => {
  const renderInput = type => {
    switch (type) {
      case 'select':
        return (
          <NativeDropdown
            value={value}
            onChange={value => {
              onChangeHandler(id, value)
            }}
            items={items}
            className={`label-input__input ${inputClass}`}
          />
        )
      case 'checkbox':
        return (
          <Checkbox
            checked={value}
            onChange={e => {
              onChangeHandler(id, e.target.checked)
            }}
            className="request-form__checkbox"
          />
        )
      case 'textarea':
        return (
          <TextArea
            placeholder={placeholder}
            value={value}
            className={`label-input__input ${inputClass}`}
            onBlur={e => {
              onBlurHandler(validations, id)
            }}
            onChange={({ value }) => {
              onChangeHandler(id, value)
            }}
          />
        )
      default:
        return (
          <InputTextField
            placeholder={placeholder}
            value={value}
            type={validations.validations_isPassword ? 'password' : type}
            className={`label-input__input ${inputClass}`}
            onBlur={e => {
              onBlurHandler(validations, id)
            }}
            onChange={({ value }) => {
              onChangeHandler(id, value)
            }}
          />
        )
    }
  }

  return (
    <div className={`label-input ${parentClass}`}>
      <Label className={`label-input__label ${labelClass}`}>
        {label}
        {label && validations.asterisk ? '*' : ''}
      </Label>
      <Label className={secondaryLabelClass}>{secondaryLabel}</Label>
      {renderInput(fieldType)}
      {/* <InputTextField
        placeholder={placeholder}
        value={value}
        type={validations.isPassword ? 'password' : type}
        className={`label-input__input ${inputClass}`}
        onBlur={e => {
          onBlurHandler(validations, id)
        }}
        onChange={({ value }) => {
          onChangeHandler(id, value)
        }}
      /> */}
      {errors.map((error, i) => (
        <Label key={i} className="label-input__error-message">
          {error}
        </Label>
      ))}
    </div>
  )
}

LabelInput.propTypes = {
  label: PropTypes.string,
  secondaryLabel: PropTypes.string,
  validations: PropTypes.object,
  value: PropTypes.string,
  id: PropTypes.string,
  errors: PropTypes.array,
  onBlurHandler: PropTypes.func,
  onChangeHandler: PropTypes.func,
  inputClass: PropTypes.string,
  labelClass: PropTypes.string,
  secondaryLabelClass: PropTypes.string,
  parentClass: PropTypes.string,
  placeholder: PropTypes.string,
  lblInputClass: PropTypes.string,
  fieldType: PropTypes.string,
  items: PropTypes.array,
}

export default LabelInput
