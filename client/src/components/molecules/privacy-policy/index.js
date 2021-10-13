import React from 'react'
import PropTypes from 'prop-types'
// import './style.scss'

const Privacy = ({ text }) => {
  return (
    <>
      <h1 className="main-heading">{text.heading}</h1>
      <p>{text.body}</p>
    </>
  )
}

Privacy.propTypes = {
  text: PropTypes.object,
}

export default Privacy
