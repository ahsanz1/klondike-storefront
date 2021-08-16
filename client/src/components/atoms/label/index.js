/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Label = ({ className = '', style = {}, children = null, onClick }) => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <p style={style} className={`c-label ${className}`} onClick={onClick}>
      {children}
    </p>
  )
}

Label.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
}

export default Label
