import React from 'react'

import PropTypes from 'prop-types'
import Link from 'components/atoms/link'

import './style.scss'

const FooterLinks = ({ heading = '', links = [] }) => {
  return (
    <div className="footer-column menu-column">
      <h3>{heading}</h3>
      <ul className="footer-menu">
        {links.length &&
          links.map(link => (
            <li key={link.text}>
              <Link to={link.url}>{link.text}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

FooterLinks.propTypes = {
  heading: PropTypes.string,
  links: PropTypes.array,
}

export default FooterLinks
