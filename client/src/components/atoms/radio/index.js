import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const RadioButton = ({
  value = '',
  label = '',
  checked = false,
  className = '',
  style = {},
  onChange,
}) => {
  return (
    <div className={`c-radio ${className}`} style={style}>
      <label>
        <input
          type="radio"
          value={value}
          checked={checked}
          onChange={() => {
            onChange && onChange()
          }}
        />
        {label}
      </label>
    </div>
  )
}

RadioButton.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  checked: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
}

export default RadioButton
