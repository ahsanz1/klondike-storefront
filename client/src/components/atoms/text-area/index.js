import React from 'react'
import PropTypes from 'prop-types'

const TextArea = ({
  value = '',
  placeholder = '',
  className = '',
  style = {},
  onChange,
  onBlur,
  required = false,
}) => {
  return (
    <textarea
      style={style}
      className={`${className}`}
      placeholder={placeholder}
      value={value || ''}
      required={required}
      onBlur={e => {
        onBlur && onBlur(e)
      }}
      onChange={e => {
        onChange && onChange({ value: e.target.value, e })
      }}
    />
  )
}

TextArea.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  required: PropTypes.bool,
  type: PropTypes.string,
}

export default TextArea
