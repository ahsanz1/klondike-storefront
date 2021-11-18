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
  onFocus,
  required = false,
  type = '',
  minLength = '',
  maxLength = '',
  autoFocus = false,
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
      onFocus={e => {
        onFocus && onFocus(e)
      }}
      onBlur={e => {
        onBlur && onBlur(e)
      }}
      onChange={e => {
        onChange && onChange({ value: e.target.value, e })
      }}
      // eslint-disable-next-line jsx-a11y/no-autofocus
      autoFocus={autoFocus}
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
  onFocus: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.string,
  minLength: PropTypes.string,
  maxLength: PropTypes.string,
  autoFocus: PropTypes.bool,
}

export default InputTextField
