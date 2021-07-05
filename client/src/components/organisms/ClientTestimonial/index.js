import React from 'react'
import PropTypes from 'prop-types'
// import './style.scss'
import Testimonial from 'components/molecules/testimonial'

const ClientTestimonial = ({ testimonial }) => {
  return (
    <>
      <Testimonial testimonial={testimonial} />
    </>
  )
}

ClientTestimonial.propTypes = {
  testimonial: PropTypes.string,
}

export default ClientTestimonial
