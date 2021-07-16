import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'

const ContactAddress = ({ heading, label, street, postal, AddressList }) => {
  return (
    <div className="Address">
      <h1>{heading}</h1>
      {AddressList.map((data, i) => (
        <p key={i}>
          {data.label}
          {data.street}
          {data.postal}
        </p>
      ))}
    </div>
  )
}

ContactAddress.propTypes = {
  heading: PropTypes.string,
  label: PropTypes.string,
  street: PropTypes.string,
  postal: PropTypes.string,
  AddressList: PropTypes.array,
}

export default ContactAddress
