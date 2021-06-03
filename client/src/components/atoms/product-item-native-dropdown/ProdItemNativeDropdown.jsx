import React, { memo, useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import NativeDropdown from 'components/atoms/native-dropdown'

const ProdItemNativeDropdown = ({ items, className, onChange }) => {
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
      const item = productItems.filter((_, i) => i === Number(event))[0]
      setSelected(event)
      onChange(item)
    },
    [productItems, onChange],
  )

  return (
    productItems.length && (
      <NativeDropdown
        value={selected}
        items={productItems}
        className={className}
        onChange={event => handleChange(event)}
      />
    )
  )
}

ProdItemNativeDropdown.defaultProps = {
  items: [],
  className: '',
  onChange: noop,
}

ProdItemNativeDropdown.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string,
  onChange: PropTypes.func,
}

export default memo(ProdItemNativeDropdown)
