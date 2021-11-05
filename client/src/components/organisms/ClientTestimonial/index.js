import React from 'react'
import PropTypes from 'prop-types'
// import './style.scss'
import Testimonial from 'components/molecules/testimonial'
import MobileTestimonial from 'components/molecules/mobiletestimonial'

const ClientTestimonial = ({ testimonial }) => {
  return (
    <>
      {window.innerWidth < 768 ? (
        <MobileTestimonial testimonial={testimonial} />
      ) : (
        <Testimonial testimonial={testimonial} />
      )}
    </>
  )
}

ClientTestimonial.propTypes = {
  testimonial: PropTypes.string,
}

export default ClientTestimonial
