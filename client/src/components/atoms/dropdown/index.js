/* eslint-disable indent */
/* eslint-disable jsx-a11y/no-onchange */
import React, { useState } from 'react'
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
  setSelectFilterList,
}) => {
  const [change, setChange] = useState()
  console.log(change)
  // const handleChange = useCallback(
  //   event => {
  //     const list = items.map(item => {
  //       if (item['Part Number'] === event['Part Number']) {
  //         item.selected = event.selected
  //       }
  //       return item
  //     })

  //     const _selectedList = list.filter(item => item.selected === true)

  //     setFilterList(list)
  //     setSelectedList(_selectedList)
  //     setSelectFilterList(_selectedList)
  //   },
  //   [filterList],
  // )
  return (
    <Select
      value={value}
      defaultValue={items && items[0] && items[0].label}
      style={style}
      className={`c-dropdown ${className}`}
      onChange={value => {
        onChange && onChange(value)
        console.log(value, 'val')
        const list = items.map(item => {
          if (item['Part Number'] === value['Part Number']) {
            item.Select = value
          }
          return item
        })
        const _selectedList = list.filter(item => item.Select === true)
        console.log('selection', _selectedList)
        setSelectFilterList(_selectedList)
        setChange(value)
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
            {
              menuItem.label
              // ||
              //   ` Ship Every ${menuItem.frequency} ${
              //     menuItem.frequencyType === 'Weekly'
              //       ? menuItem.frequency > 1
              //         ? 'Weeks'
              //         : 'Week'
              //       : menuItem.frequency > 1
              //       ? 'Months'
              //       : 'Month'
              //   }`
            }
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
  setSelectFilterList: PropTypes.func,
}

export default Dropdown
