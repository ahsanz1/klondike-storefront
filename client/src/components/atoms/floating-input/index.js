import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useFormikContext } from 'formik'
import Dropdown from 'components/atoms/dropdown'
import './style.scss'

const FloatInput = ({
  label,
  name,
  className,
  type,
  textInput = true,
  items = [],
  tooltip = false,
  value = '',
  checkError = true,
}) => {
  const {
    handleChange,
    setFieldTouched,
    errors,
    touched,
    values,
    setFieldValue,
  } = useFormikContext()
  const [focus, setFocus] = useState(false)
  return (
    <>
      <div
        className="float-label"
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
      >
        <div className="input-wrapper">
          {textInput ? (
            <input
              value={value || values.name}
              name={name}
              className={
                touched[name] && errors[name] && checkError
                  ? 'input-error'
                  : 'input-component'
              }
              onBlur={() => setFieldTouched(name)}
              onChange={name => handleChange(name)}
              type={type}
            />
          ) : (
            <Dropdown
              name="shippingCountry"
              items={items}
              onBlur={() => setFieldTouched(name)}
              onChange={val => {
                setFieldValue(name, val)
              }}
              className={
                touched[name] && errors[name]
                  ? 'dropdown-error'
                  : 'dropdown-component'
              }
            />
          )}
        </div>
        <label
          className={
            focus || (values[name] && values[name].length !== 0)
              ? 'label label-float'
              : 'label'
          }
        >
          {label}
        </label>
      </div>
      {!tooltip && touched[name] && errors[name] && (
        <span className="error-msg">{errors[name]}</span>
      )}
    </>
  )
}

FloatInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.object,
  inputValue: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  textInput: PropTypes.bool,
  tooltip: PropTypes.bool,
  checkError: PropTypes.bool,
  items: PropTypes.array,
}

export default FloatInput
