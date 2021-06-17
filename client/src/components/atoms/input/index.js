import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const InputTextField = ({
  value = '',
  placeholder = '',
  className = '',
  style = {},
  onChange,
  onBlur,
  required = false,
  type = '',
  minLength = '',
  maxLength = '',
}) => {
  return (
    <input
      style={style}
      className={`${className}`}
      placeholder={placeholder}
      value={value}
      minLength={minLength}
      required={required}
      maxLength={maxLength}
      type={type}
      onBlur={e => {
        onBlur && onBlur(e)
      }}
      onChange={e => {
        onChange && onChange({ value: e.target.value, e })
      }}
    />
  )
}

InputTextField.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
}

export default InputTextField
