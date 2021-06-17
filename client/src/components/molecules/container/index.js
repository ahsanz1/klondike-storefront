import React from 'react'
import PropTypes from 'prop-types'
import { ContainerMain } from './styles'

const Container = ({ children, color, maxWidth, className }) => {
  return (
    <ContainerMain color={color} maxWidth={maxWidth} className={className}>
      <div className="cs--page-width">{children}</div>
    </ContainerMain>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
  maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default Container
