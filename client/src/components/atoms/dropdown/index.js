/* eslint-disable indent */
/* eslint-disable jsx-a11y/no-onchange */
import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import './style.scss'

const { Option } = Select
const Dropdown = ({
  value,
  style = {},
  className = '',
  optionClassName = '',
  onChange,
  items = [],
  disabledOptionStyle = {},
  dropdownStyle = {},
  name = '',
}) => {
  return (
    <Select
      value={value}
      defaultValue={items && items[0] && items[0].label}
      style={style}
      className={`c-dropdown ${className}`}
      onChange={value => {
        onChange && onChange(value)
      }}
      dropdownStyle={dropdownStyle}
      name={name}
    >
      {items.map((menuItem, i) => {
        return (
          <Option
            className={optionClassName}
            key={menuItem.id || menuItem.value || i}
            value={menuItem.value || i}
            disabled={menuItem.disabled}
            style={menuItem.disabled ? disabledOptionStyle : {}}
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
          </Option>
        )
      })}
    </Select>
  )
}

Dropdown.propTypes = {
  value: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  style: PropTypes.object,
  optionClassName: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object),
  disabledOptionStyle: PropTypes.object,
  dropdownStyle: PropTypes.object,
  name: PropTypes.string,
}

export default Dropdown
