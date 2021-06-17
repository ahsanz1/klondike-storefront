import React, { memo } from 'react'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import Label from 'components/atoms/label'
import Image from 'components/atoms/image'

import { LearnMoreButton } from './TabButons'

const NutrientSliderCard = ({ nutrient, onClick }) => {
  const {
    nutrientName,
    nutrientHeading1,
    imgUrl,
    imgAlt,
    mobileTitleImg,
    mobileTitleImgAlt,
    nutrientText,
    nutrientHeading2,
    benifits,
    readmore,
    activeTabColor,
  } = nutrient

  const handleClick = () => {
    const content = { name: nutrientName, text: readmore }
    onClick(content)
  }

  return (
    <div className="nutrient-slider-card">
      {imgUrl && (
        <div className="image-block">
          <Image className="nutrient-image" src={imgUrl} alt={imgAlt} />
        </div>
      )}
      <div className="text-block">
        {mobileTitleImg && (
          <div className="image-title-block">
            <Image
              className="nutrient-image"
              src={mobileTitleImg}
              alt={mobileTitleImgAlt}
            />
          </div>
        )}
        <Label className="title">{nutrientHeading1}</Label>
        <Label className="text">{nutrientText}</Label>
        <Label className="title">{nutrientHeading2}</Label>
        <ul className="nutrient-list">
          {benifits.length &&
            benifits.map(({ text }, index) => {
              return text ? <li key={`benifit-item-${index}`}>{text}</li> : null
            })}
        </ul>
        {readmore && (
          <LearnMoreButton
            color={activeTabColor}
            onClick={onClick && handleClick}
          >
            Learn More
          </LearnMoreButton>
        )}
      </div>
    </div>
  )
}

NutrientSliderCard.defaultProps = {
  nutrient: {},
  onClick: noop,
}

NutrientSliderCard.propTypes = {
  nutrient: PropTypes.shape({
    nutrientName: PropTypes.string,
    nutrientHeading1: PropTypes.string,
    imgUrl: PropTypes.string,
    imgAlt: PropTypes.string,
    mobileTitleImg: PropTypes.string,
    mobileTitleImgAlt: PropTypes.string,
    nutrientText: PropTypes.string,
    nutrientHeading2: PropTypes.string,
    readmore: PropTypes.string,
    activeTabColor: PropTypes.string,
    benifits: PropTypes.array,
  }),
  onClick: PropTypes.func,
}

export default memo(NutrientSliderCard)
