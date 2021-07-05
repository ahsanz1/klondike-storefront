import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import ContactAddress from 'components/molecules/ContactAddress'

const ContactAddres = ({ Addresdata }) => {
  return (
    <div className="Address-wraper">
      {Addresdata.map((content, i) => (
        <ContactAddress {...content} key={i} />
      ))}
    </div>
  )
}

ContactAddres.propTypes = {
  Addresdata: PropTypes.string,
}

export default ContactAddres
