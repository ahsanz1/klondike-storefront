import React from 'react'

import './style.scss'

import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'

const AccordionComponent = ({
  text,
  children,
  className = '',
  isActive = false,
  onClick = {},
}) => {
  return (
    <div>
      <Label onClick={onClick} className={`acc-c-label ${className}`}>
        <p>{text}</p>
        <div>
          {isActive ? (
            <Image src="/static/icons/arrow-up.png" alt="" />
          ) : (
            <Image src="/static/icons/arrow-down.png" alt="" />
          )}
        </div>
      </Label>

      {isActive && <div className="accordion-content">{children}</div>}
    </div>
  )
}

AccordionComponent.propTypes = {
  text: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
}

export default AccordionComponent
