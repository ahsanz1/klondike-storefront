import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Heading = ({ className = '', style = {}, children = null }) => {
  return (
    <h1 style={style} className={`c-heading ${className}`}>
      {children}
    </h1>
  )
}

Heading.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Heading
