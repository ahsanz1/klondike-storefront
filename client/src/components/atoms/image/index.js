/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Image = ({
  src = '',
  alt = '',
  width,
  height,
  className = '',
  style = {},
  onClick,
}) => {
  return (
    <img
      src={src}
      width={width || null}
      height={height || null}
      className={`c-image ${className}`}
      style={style}
      alt={alt}
      onClick={() => {
        onClick && onClick()
      }}
    />
  )
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
}

export default Image
