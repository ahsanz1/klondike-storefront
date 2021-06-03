import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Label from 'components/atoms/label'
import PressKitImageLinkBox from 'components/molecules/press-kit-image-link'
import GeneralTabs from 'components/molecules/general-tabs'
import HaadingParagraph from 'components/molecules/heading-paragraph'
import SimpleSlickSlider from 'components/molecules/simple-slick-slider'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'

const PressKit = ({
  tabs,
  imagesAndLinks,
  headingParagraphs,
  desktopImage,
  mobileImage,
}) => {
  const heroImages = {
    desktopImage: desktopImage,
    mobileImage: mobileImage,
  }
  return (
    <>
      <WebpagesHeroImages {...heroImages} />
      <div className="tabs-section">
        <GeneralTabs tabs={tabs} />
        <SimpleSlickSlider tabs={tabs} />
      </div>
      <div className="presskit-box">
        <Label className="presskit-heading">Press Kit</Label>
        <div className="presskit-image-link-boxes">
          {imagesAndLinks.map((imageLink, i) => (
            <PressKitImageLinkBox {...imageLink} key={i} />
          ))}
        </div>
      </div>
      {headingParagraphs.map((headingParagraph, i) => (
        <HaadingParagraph key={i} {...headingParagraph} />
      ))}
    </>
  )
}

const { array, object } = PropTypes
PressKit.propTypes = {
  tabs: array,
  imagesAndLinks: array,
  headingParagraphs: array,
  desktopImage: object,
  mobileImage: object,
}

export default PressKit
