import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const ContactAddress = ({ heading, label, street, postal }) => {
  return (
    <div className="Address">
      <h1>{heading}</h1>
      <p>{label}</p>
      <p>{street}</p>
      <p>{postal}</p>
    </div>
  )
}

ContactAddress.propTypes = {
  heading: PropTypes.string,
  label: PropTypes.string,
  street: PropTypes.string,
  postal: PropTypes.string,
}

export default ContactAddress
