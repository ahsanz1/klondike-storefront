/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/display-name */
import React from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import noop from 'lodash/noop'

import Image from 'components/atoms/image'

const PDPSlider = ({ images = [], handleImageClick = noop }) => {
  const settings = {
    customPaging: i => {
      return (
        // eslint-disable-next-line jsx-a11y/anchor-has-content
        <a
          // eslint-disable-next-line jsx-a11y/anchor-has-content
          style={{
            backgroundImage: `url('${images[i]}')`,
          }}
        />
      )
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
  }
  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <Image
            src={image}
            className="my-image"
            alt="..."
            onClick={() => handleImageClick(image)}
          />
        </div>
      ))}
    </Slider>
  )
}

PDPSlider.propTypes = {
  images: PropTypes.array,
  handleImageClick: PropTypes.func,
}

export default PDPSlider
