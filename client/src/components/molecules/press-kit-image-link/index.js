import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'

const PressKitImageLinkBox = ({ imageUrl, imageAlt, linkText, link }) => {
  return (
    <div className="presskit-image-link-box">
      <Link to={link} className="image-link-box-link">
        <Image src={imageUrl} alt={imageAlt} className="image-link-box-image" />
        <div className="image-link-box-link">
          <Label className="image-link-box-link-label">{linkText}</Label>
          <Image
            src="/static/icons/download.svg"
            alt="alt"
            className="image-link-box-link-image"
          />
        </div>
      </Link>
    </div>
  )
}

const { string } = PropTypes
PressKitImageLinkBox.propTypes = {
  imageUrl: string,
  imageAlt: string,
  linkText: string,
  link: string,
}

export default PressKitImageLinkBox
