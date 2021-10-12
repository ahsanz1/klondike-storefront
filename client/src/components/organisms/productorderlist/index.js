import React from 'react'
import PropTypes from 'prop-types'
import ProductAccordion from 'components/molecules/productaccordian'
// import './style.scss'

const ProductOrderList = () => {
  return (
    // <h1>Umar</h1>
    <ProductAccordion />
  )
}

// const { array } = PropTypes
ProductOrderList.propTypes = {
  ProductAccordion: PropTypes.array,
}
export default ProductOrderList
