import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

import Image from 'components/atoms/image'
import Button from 'components/atoms/button'

const ImageOnlyButton = ({
  onClick,
  id,
  cssId,
  disabled,
  imgSrc,
  imgAlt,
  className,
}) => {
  return (
    <Button
      className={className ? `${className} btn` : 'btn'}
      id={cssId}
      onClick={() => {
        onClick && onClick(id)
      }}
      disabled={disabled}
    >
      <Image src={imgSrc} alt={imgAlt} className="button-image" />
    </Button>
  )
}

ImageOnlyButton.propTypes = {
  id: PropTypes.number,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  imgSrc: PropTypes.string,
  imgAlt: PropTypes.string,
  className: PropTypes.string,
  cssId: PropTypes.string,
}

export default ImageOnlyButton
