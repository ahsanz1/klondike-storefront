/* eslint-disable indent */
/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import PropTypes from 'prop-types'

const NativeDropdown = ({
  value,
  style = {},
  className = '',
  optionClassName = '',
  onChange,
  items = [],
}) => {
  // console.log('items array', items)
  return (
    <select
      value={value}
      style={style}
      className={`c-dropdown ${className}`}
      onChange={e => {
        onChange && onChange(e.target.value)
      }}
    >
      {items.map((menuItem, i) => {
        return (
          <option
            className={optionClassName}
            key={menuItem.id || menuItem.value || i}
            value={menuItem.value || menuItem.value === '' ? menuItem.value : i}
            disabled={menuItem.disabled}
          >
            {menuItem.label ||
              ` Ship Every ${menuItem.frequency} ${
                menuItem.frequencyType === 'Weekly'
                  ? menuItem.frequency > 1
                    ? 'Weeks'
                    : 'Week'
                  : menuItem.frequency > 1
                  ? 'Months'
                  : 'Month'
              }`}
          </option>
        )
      })}
    </select>
  )
}

NativeDropdown.propTypes = {
  value: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  style: PropTypes.object,
  optionClassName: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object),
}

export default NativeDropdown
