import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'

const AlternateTextImage = ({
  image,
  text,
  paragraph,
  buttontext,
  heading,
}) => {
  return (
    <div className="about-us">
      <Image src={image.url} alt={image.altText} className="about-us-image" />

      <div className="oil-wrapper">
        {heading && <h1 className="oil-heading">{heading}</h1>}
        {paragraph && <Label className="about-us-text">{text}</Label>}
        {buttontext && <Button className="oil-button">{buttontext}</Button>}
      </div>
    </div>
  )
}

const { string, boolean, object } = PropTypes
AlternateTextImage.propTypes = {
  image: object,
  text: string,
  paragraph: boolean,
  buttontext: string,
  heading: string,
}

export default AlternateTextImage
