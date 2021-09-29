import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/atoms/link'
import './style.scss'

const LoginLinks = ({ links = [] }) => {
  return (
    <div className="links--container">
      {links.map((el, index) => (
        <Link className="links" key={index} to="/contact-us">
          {el.text}
        </Link>
      ))}
    </div>
  )
}

LoginLinks.propTypes = {
  links: PropTypes.array,
}

export default LoginLinks
