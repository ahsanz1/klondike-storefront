import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Link from 'components/atoms/link'

const PackageOrder = ({ order }) => {
  return (
    <div className="package_order-wrapper">
      <div className="package_order">
        <h1 className="packaged_heading">{order.heading}</h1>
        <p>{order.paragraph1}</p>
        <p>{order.paragraph2}</p>
      </div>
      <Link className="Continue">Continue</Link>
    </div>
  )
}
PackageOrder.propTypes = {
  order: PropTypes.array,
}

export default PackageOrder
