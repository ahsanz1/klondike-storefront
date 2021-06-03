import React, { memo, useState } from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import noop from 'lodash/noop'

import NutrientSliderCard from './NutrientSliderCard'
import NutrientSliderPopup from './NutrientSliderPopup'

import { TabButton } from './TabButons'

import { getName, getActiveColor } from './utils'

const SliderNutrient = ({ nutrients, onChange }) => {
  const [openPopup, setOpenPopup] = useState(false)
  const [popupContent, setPopupContent] = useState({})

  const renderButton = index => {
    const name = getName(nutrients[index])
    const active = getActiveColor(nutrients[index])

    return <TabButton color={active}>{name}</TabButton>
  }

  const settings = {
    arrows: false,
    infinite: true,
    dots: true,
    speed: 500,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    customPaging: index => renderButton(index),
    beforeChange: (_, next) => onChange(next),
  }

  const handleClick = value => {
    setPopupContent({ ...value })
    setTimeout(() => {
      setOpenPopup(true)
    }, 300)
  }

  const handleClosePopup = () => {
    setOpenPopup(false)
  }

  return (
    <div className="slider-tabs">
      <Slider {...settings}>
        {nutrients.map((nutrient, index) => {
          return (
            <NutrientSliderCard
              key={`nutrient-card-${index}`}
              nutrient={nutrient}
              onClick={handleClick}
            />
          )
        })}
      </Slider>
      <NutrientSliderPopup
        name={popupContent.name}
        text={popupContent.text}
        show={openPopup}
        onClosePopup={handleClosePopup}
      />
    </div>
  )
}

SliderNutrient.defaultProps = {
  nutrients: [],
  onChange: noop,
}

SliderNutrient.propTypes = {
  nutrients: PropTypes.array,
  onChange: PropTypes.func,
}

export default memo(SliderNutrient)
