import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import ProductBanneritem from 'components/molecules/ProductBanneritem'

const ProductBanner = ({ banner }) => {
  return (
    <div className="Product-banner">
      {banner.map((content, id) => (
        <ProductBanneritem {...content} key={id} />
      ))}
    </div>
  )
}

ProductBanner.propTypes = {
  banner: PropTypes.object,
}
export default ProductBanner
