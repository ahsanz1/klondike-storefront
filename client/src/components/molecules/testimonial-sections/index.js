import React from 'react'
import PropTypes from 'prop-types'

import Label from 'components/atoms/label'

const TestimonialSections = testimonials => {
  console.log('testimonials', testimonials.testimonials)
  return (
    testimonials.testimonials.length > 0 &&
    testimonials.testimonials.map((data, i) => {
      return (
        <div className="testimonial-section" key={i}>
          <Label>{data.title}</Label>
          <Label>{data.subTitle}</Label>
        </div>
      )
    })
  )
}
TestimonialSections.defaultProps = {
  testimonials: [],
}
TestimonialSections.propTypes = {
  testimonials: PropTypes.array,
}
export default TestimonialSections
