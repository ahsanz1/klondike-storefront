import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const ProductOverview = ({ text }) => {
  return (
    <div className="overviewtxt">
      <p>{text}</p>
    </div>
  )
}

ProductOverview.propTypes = {
  text: PropTypes.string,
}

export default ProductOverview
