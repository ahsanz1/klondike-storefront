import React from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import TestimonialCard from 'components/molecules/testimonial-card'
import './styles.scss'

const TestimonialSlider = ({ data }) => {
  const settings = {
    arrows: false,
    infinite: true,
    dots: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    dotsClass: 'button__bar',
  }
  return (
    <div>
      <Slider {...settings}>
        {data.map((res, index) => (
          <TestimonialCard key={res.name} {...res} />
        ))}
      </Slider>
    </div>
  )
}

TestimonialSlider.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      desc: PropTypes.string,
      name: PropTypes.string,
      testimonialImg: PropTypes.object,
    }),
  ),
}

export default TestimonialSlider
