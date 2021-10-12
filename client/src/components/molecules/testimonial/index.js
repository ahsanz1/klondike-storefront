import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Slider from 'react-slick'
import Image from 'components/atoms/image'

const Testimonial = ({ testimonial }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  }

  return (
    <div className="testimonial-wrapper">
      <h1 className="buy-heading">Why I buy KLONDIKE</h1>
      <div className="slider">
        <div className="slider-wrapper">
          <Slider {...settings}>
            {testimonial.map((slide, i) => (
              <div className="slide" key={i}>
                <Image src={slide.image.url} className="slider-image" />
                <p>{slide.headingtext}</p>
                <p className="comment">{slide.text}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  )
}

const { array } = PropTypes
Testimonial.propTypes = {
  testimonial: array,
}

export default Testimonial
