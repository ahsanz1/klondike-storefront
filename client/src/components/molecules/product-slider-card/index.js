import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/atoms/link'
import './styles.scss'
const ProductSliderCard = ({
  imgUrl,
  imgAlt,
  productName,
  productDesc,
  productLink,
}) => {
  return (
    <div className="product-slider-card">
      <div className="psc--image">
        <div className="psc--image-inner">
          <Link to={productLink}>
            <img src={imgUrl} alt={imgAlt} />
          </Link>
        </div>
      </div>
      <div className="psc--info">
        <Link to={productLink}>
          <h4 className="psc--name">{productName}</h4>
          <p className="psc--desc">{productDesc}</p>
        </Link>
      </div>
    </div>
  )
}

ProductSliderCard.propTypes = {
  imgUrl: PropTypes.string,
  imgAlt: PropTypes.string,
  productName: PropTypes.string,
  productDesc: PropTypes.string,
  productLink: PropTypes.string,
}

export default ProductSliderCard
