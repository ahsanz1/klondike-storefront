import React from 'react'

import PropTypes from 'prop-types'
import Link from 'components/atoms/link'

import './style.scss'

const FooterLinks = ({ heading = '', links = [] }) => {
  console.log('footer link check:', links)
  let userLoginInfo = localStorage.getItem('userPersonalInfo')
  userLoginInfo = JSON.parse(userLoginInfo)
  let logout = userLoginInfo && userLoginInfo.email ? links : links.splice(0, 1)
  console.log('check logout:', logout)
  return (
    <div className="footer-column menu-column">
      <h3>{heading}</h3>
      <ul className="footer-menu">
        {logout.length &&
          logout.map(link => (
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
