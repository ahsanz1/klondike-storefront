import React from 'react'
import PropTypes from 'prop-types'
import { Button } from './styles'
const CheckButton = ({ children, onClick, hoverColor, className }) => {
  return (
    <Button
      className={className}
      hoverColor={hoverColor}
      onClick={onClick && onClick}
    >
      {children}
    </Button>
  )
}

CheckButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  hoverColor: PropTypes.string,
  className: PropTypes.string,
}

export default CheckButton
