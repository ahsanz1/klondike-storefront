import React from 'react'
import PropTypes from 'prop-types'

import Label from 'components/atoms/label'
import Button from 'components/atoms/img-button'
// import BulletHeading from 'components/molecules/bullet-heading'

import './style.scss'

const HomepageHeroTextLinks = ({
  firstDesktopHeading,
  secondDesktopHeading,
  mobileHeading,
  bulletPoints,
  buttonText,
  buttonLink,
}) => {
  return (
    <div className="content">
      .<Label className="desktop heading">{firstDesktopHeading}</Label>
      <Label className="desktop heading">{secondDesktopHeading}</Label>
      <Label className="mobile heading">{mobileHeading}</Label>
      {/* <BulletHeading headings={bulletPoints} /> */}
      <Button text={buttonText} buttonLink={buttonLink} className="buttons" />
    </div>
  )
}

const { array, string } = PropTypes
HomepageHeroTextLinks.propTypes = {
  firstDesktopHeading: string,
  secondDesktopHeading: string,
  mobileHeading: string,
  bulletPoints: array,
  buttonText: string,
  buttonLink: string,
}

export default HomepageHeroTextLinks
