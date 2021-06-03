import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import Image from 'components/atoms/image'
import Label from 'components/atoms/label'

const AlternateTextImage = ({
  image,
  text,
  firstText,
  secondText,
  thirdText,
  paragraph,
  dialogue,
}) => {
  return (
    <div className="about-us">
      <Image src={image.url} alt={image.altText} className="about-us-image" />
      {paragraph && <Label className="about-us-text">{text}</Label>}
      {dialogue && (
        <div className="dialogue">
          <Label className="dialogues">{firstText}</Label>
          <Label className="dialogues bold">{secondText}</Label>
          <Label className="dialogues">{thirdText}</Label>
        </div>
      )}
    </div>
  )
}

const { string, boolean, object } = PropTypes
AlternateTextImage.propTypes = {
  image: object,
  text: string,
  firstText: string,
  secondText: string,
  thirdText: string,
  paragraph: boolean,
  dialogue: boolean,
}

export default AlternateTextImage
