import React, { memo, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import Dropdown from 'components/atoms/dropdown'

const ProdItemDropdown = ({
  items,
  className,
  optionClassName,
  disabledOptionStyle,
  onChange,
}) => {
  const [selected, setSelected] = useState(0)
  const [productItems, setProductItems] = useState([])

  useEffect(() => {
    const _items = [...items]
    if (_items.length > 1) {
      _items.sort((a, b) => a.frequency - b.frequency)
    }

    setProductItems(_items)
  }, [items])

  const handleChange = useCallback(
    event => {
      const item = productItems.filter((_, i) => i === event)[0]
      setSelected(event)
      onChange(item)
    },
    [productItems, onChange],
  )

  return (
    productItems.length && (
      <Dropdown
        value={selected}
        items={productItems}
        className={className}
        optionClassName={optionClassName}
        disabledOptionStyle={disabledOptionStyle}
        onChange={event => handleChange(event)}
      />
    )
  )
}

ProdItemDropdown.defaultProps = {
  items: [],
  className: '',
  optionClassName: '',
  disabledOptionStyle: {},
  onChange: noop,
}

ProdItemDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  optionClassName: PropTypes.string,
  disabledOptionStyle: PropTypes.object,
  onChange: PropTypes.func,
}

export default memo(ProdItemDropdown)
