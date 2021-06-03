import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Slider from 'react-slick'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'

const SimpleSlickSlider = ({ tabs }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  }
  return (
    <div className="slider">
      <div className="slider-wrapper">
        <Slider {...settings}>
          {tabs.map((slide, i) => (
            <div className="slide" key={i}>
              <Image src={slide.tabImage} className="slider-image" />
              <Label className="slider-paragraph">{slide.tabDescText}</Label>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

const { array } = PropTypes
SimpleSlickSlider.propTypes = {
  tabs: array,
}

export default SimpleSlickSlider
