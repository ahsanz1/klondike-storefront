import React from 'react'
import PropTypes from 'prop-types'
// import './style.scss'
import Testimonial from 'components/molecules/testimonial'

const HomeBanner = ({ testimonial }) => {
  return (
    <>
      <Testimonial testimonial={testimonial} />
    </>
  )
}

HomeBanner.propTypes = {
  testimonial: PropTypes.string,
}

export default HomeBanner
