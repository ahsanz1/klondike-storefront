import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Label = ({ className = '', style = {}, children = null }) => {
  return (
    <p style={style} className={`c-label ${className}`}>
      {children}
    </p>
  )
}

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Label
