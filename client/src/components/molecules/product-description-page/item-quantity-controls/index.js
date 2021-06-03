/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'

const PdpItemQuantityControls = ({ value, onChange }) => {
  return (
    <div className="quantity-box-wrapper ">
      <label htmlFor="Quantity" className="no-highlight qty-label">
        QTY
      </label>

      <div
        className="quantity-button  qty-sub no-highlight"
        id="decrease-qty"
        onClick={() => {
          if (parseInt(value) > 1) {
            let t = parseInt(value) - 1
            onChange && onChange(t)
          }
        }}
      >
        <svg
          width="100pt"
          height="100pt"
          version="1.1"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="m8.332 38.891h83.332v22.227h-83.332z"></path>
        </svg>
      </div>
      <input
        className="quantity"
        id="Quantity"
        name="quantity"
        value={value}
        onChange={e => {
          if (e.target.value.match(/^[0-9]\d*$/)) {
            onChange && onChange(parseInt(e.target.value))
          } else if (e.target.value === '') {
            onChange && onChange('')
          }
        }}
        style={{
          marginTop: '2px',
        }}
      />

      <div
        className="quantity-button  qty-add no-highlight"
        id="increase-qty"
        onClick={() => {
          let t = parseInt(value) + 1
          onChange && onChange(t)
        }}
      >
        <svg
          width="100pt"
          height="100pt"
          version="1.1"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m37.426 2.125h25.148v35.301h35.301v25.148h-35.301v35.301h-25.148v-35.301h-35.301v-25.148h35.301z"
            fillRule="evenodd"
          ></path>
        </svg>
      </div>
    </div>
  )
}

PdpItemQuantityControls.propTypes = {
  value: PropTypes.number,
  onChange: PropTypes.func,
}

export default PdpItemQuantityControls
