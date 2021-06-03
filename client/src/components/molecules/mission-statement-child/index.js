import React from 'react'

import Heading from 'components/molecules/heading'
import PropTypes from 'prop-types'

import './style.scss'

const MissionStatementChild = ({
  desktopPrefix,
  desktopSuffix,
  underlineText,
  underlineTextColor,
  headingColor,
  image,
}) => {
  return (
    <div className="mission-statement-box">
      <Heading
        desktopPrefix={desktopPrefix}
        discount={underlineText}
        desktopSuffix={desktopSuffix}
        headingColor={headingColor}
        fontFamily="Intro"
        discountColor={underlineTextColor}
        className="heading"
      />
      <div
        className="img"
        style={{
          backgroundImage: `url(${image.url})`,
        }}
      />
    </div>
  )
}

const { object, string } = PropTypes
MissionStatementChild.propTypes = {
  desktopPrefix: string,
  desktopSuffix: string,
  underlineText: string,
  underlineTextColor: string,
  headingColor: string,
  image: object,
}

export default MissionStatementChild
