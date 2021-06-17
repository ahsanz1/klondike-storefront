import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export const Button = styled.button`
  border: 2px solid ${props => props.color};
  color: ${props => props.color};
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${props => props.color};
    color: #fff;
  }
`
const StyledButton = ({
  color = '#000',
  children,
  className = '',
  style = {},
  onClick,
  type = 'default',
  disabled = false,
}) => {
  return (
    <Button
      color={color}
      className={className}
      style={style}
      type={type}
      onClick={() => {
        onClick && onClick()
      }}
      disabled={disabled}
    >
      {children}
    </Button>
  )
}

StyledButton.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
}

export default StyledButton
