import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
const ImageContainer = ({ src, alt, style }) => {
  return (
    <div className="image-container" style={style}>
      <img src={src} alt={alt} />
    </div>
  )
}

ImageContainer.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  style: PropTypes.object,
}

export default ImageContainer
