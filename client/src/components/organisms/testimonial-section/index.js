import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

import Label from 'components/atoms/label'
import TestimonialSections from 'components/molecules/testimonial-sections'

const TestimonialSection = ({ testimonials, heading }) => {
  return (
    <div className="testimonial-sections">
      <Label className="testimonials-heading">{heading}</Label>
      <TestimonialSections testimonials={testimonials} />
    </div>
  )
}
TestimonialSection.defaultProps = {
  heading: '',
  testimonials: [],
}
TestimonialSection.propTypes = {
  heading: PropTypes.string,
  testimonials: PropTypes.array,
}
export default TestimonialSection
