import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Button from 'components/atoms/button'

const ProductBanneritem = ({ image, btntxt }) => {
  return (
    <>
      <div className="Productitem-banner">
        <img src={image.url} alt="" />
        <Button>{btntxt}</Button>
      </div>
    </>
  )
}

ProductBanneritem.propTypes = {
  image: PropTypes.string,
  btntxt: PropTypes.string,
}

export default ProductBanneritem
