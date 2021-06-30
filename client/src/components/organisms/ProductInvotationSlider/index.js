import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import ProductInovation from 'components/molecules/ProductInovation'

const ProductInvotionSlider = ({ productHeading, productInovation }) => {
  return (
    <>
      <div className="productHeading">
        {productHeading && <h1>{productHeading.productHeading}</h1>}
        <ProductInovation productInovation={productInovation} />
      </div>
    </>
  )
}

ProductInvotionSlider.propTypes = {
  productHeading: PropTypes.string,
  productInovation: PropTypes.string,
}

export default ProductInvotionSlider
