/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// import Link from 'components/atoms/link'

const PackageOrder = ({ order, setModalVisible }) => {
  return (
    <div className="package_order-wrapper">
      <div className="package_order">
        <h1 className="packaged_heading">{order.heading}</h1>
        <p>{order.paragraph1}</p>
        <p>{order.paragraph2}</p>
      </div>
      <div className="Continue" onClick={() => setModalVisible(false)}>
        Continue
      </div>
    </div>
  )
}
PackageOrder.propTypes = {
  order: PropTypes.object,
  setModalVisible: PropTypes.func,
}

export default PackageOrder
