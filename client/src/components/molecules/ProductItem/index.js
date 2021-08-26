import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const ProductItem = ({ image, title }) => {
  return (
    <>
      <div className="overviewtitle">
        <div className="outr-border">
          <div className="productimg-wraper">
            <img src={image.url} alt="" />
          </div>
        </div>
        <div className="title-wrapper">
          <p>{title}</p>
        </div>
      </div>
    </>
  )
}

ProductItem.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
}

export default ProductItem
