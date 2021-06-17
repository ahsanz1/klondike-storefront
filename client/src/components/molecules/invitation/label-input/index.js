import React from 'react'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import InputTextField from 'components/atoms/input'
import './styles.scss'

const LabelInput = ({
  label = '',
  secondaryLabel = '',
  validations = {},
  value = '',
  id,
  errors = [],
  onChangeHandler,
  placeholder = '',
  type = '',
  required = false,
}) => {
  return (
    <div>
      <Label className="r-primary-label">
        {label}
        {validations.isRequired ? '*' : ''}
      </Label>
      <Label className="r-secondary-label">{secondaryLabel}</Label>
      <InputTextField
        className="r-inputField"
        value={value}
        placeholder={placeholder}
        type={type}
        required={required}
        onChange={({ value }) => {
          onChangeHandler(id, value)
        }}
      />
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
  placeholder: PropTypes.string,
  type: PropTypes.string,
  required: PropTypes.bool,
}

export default LabelInput
