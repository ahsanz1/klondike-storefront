import React from 'react'
import PropTypes from 'prop-types'
import './styles.scss'
import Link from 'components/atoms/link'

const ImgButton = ({ text, src, alt, buttonLink }) => {
  return (
    <div className="img-button">
      <Link to={buttonLink}>
        {text}
        {src && <img className="ib-img-icon" src={src} alt={alt} />}
      </Link>
    </div>
  )
}

ImgButton.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  text: PropTypes.string.isRequired,
  buttonLink: PropTypes.string,
}

export default ImgButton
