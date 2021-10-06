import React from 'react'

import PropTypes from 'prop-types'
import Link from 'components/atoms/link'

import './style.scss'

const FooterLinks = ({ heading = '', footerAccount, links = [] }) => {
  console.log('footer link check:', links)
  let userLoginInfo = localStorage.getItem('userPersonalInfo')
  userLoginInfo = JSON.parse(userLoginInfo)
  return (
    <div className="footer-column menu-column">
      {!userLoginInfo && !userLoginInfo.email && (
        <>
          <h3>{heading}</h3>{' '}
          <Link to="/account">
            <h5>{footerAccount}</h5>
          </Link>
        </>
      )}

      <ul className="footer-menu">
        {links &&
          links.length &&
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
  footerAccount: PropTypes.string,
  links: PropTypes.array,
}

export default FooterLinks
