import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

const Button = ({
  children,
  iconOnly = false,
  className = '',
  style = {},
  onClick,
  type = 'default',
  disabled = false,
  title = '',
}) => {
  return (
    <button
      className={`c-button ${iconOnly ? 'icon-button' : ''} ${className}`}
      style={style}
      type={type}
      title={title}
      onClick={() => {
        onClick && onClick()
      }}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  iconOnly: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  title: PropTypes.string,
}

export default Button
