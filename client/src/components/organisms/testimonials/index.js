import React from 'react'
import PropTypes from 'prop-types'
import Container from 'components/molecules/container'
import TestimonialHeading from 'components/molecules/testimonial-heading'
import TestimonialSlider from 'components/molecules/testimonial-slider'

const Testimonials = ({
  bgColor = '',
  desktopPrefix = '',
  desktopSuffix = '',
  mobilePrefix = '',
  mobileSuffix = '',
  discount = '',
  headingColor = '',
  discountColor = '',
  testimonials = [],
}) => {
  return (
    <Container color={bgColor}>
      <TestimonialHeading
        desktopPrefix={desktopPrefix}
        desktopSuffix={desktopSuffix}
        mobilePrefix={mobilePrefix}
        mobileSuffix={mobileSuffix}
        discount={discount}
        headingColor={headingColor}
        discountColor={discountColor}
      />
      <TestimonialSlider data={testimonials} />
    </Container>
  )
}

Testimonials.propTypes = {
  bgColor: PropTypes.string,
  desktopPrefix: PropTypes.string,
  desktopSuffix: PropTypes.string,
  mobilePrefix: PropTypes.string,
  mobileSuffix: PropTypes.string,
  discount: PropTypes.string,
  headingColor: PropTypes.string,
  discountColor: PropTypes.string,
  testimonials: PropTypes.array,
}

export default Testimonials
