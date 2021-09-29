import React from 'react'

import PropTypes from 'prop-types'
import Link from 'components/atoms/link'

import './style.scss'

const FooterPolicy = ({
  policyText = '',
  privacyTitle = '',
  privacyLink = '',
  returnPolicyTitle = '',
  returnPolicyLink = '',
  connectKlondike = '',
}) => {
  return (
    <ul className="footer-bottom-menu">
      <li className="small--hide">
        <Link to={privacyLink}>{privacyTitle}</Link>
      </li>
      <li className="divider">
        <span className="divider-dot">|</span>
      </li>
      <li className="small--hide">
        <Link to={returnPolicyLink}>{returnPolicyTitle}</Link>
      </li>
      <li className="divider">
        <span className="divider-dot">|</span>
      </li>
      <li className="small--hide">
        <Link to="/contact-us">{connectKlondike}</Link>
      </li>
    </ul>
  )
}

FooterPolicy.propTypes = {
  policyText: PropTypes.string,
  privacyTitle: PropTypes.string,
  privacyLink: PropTypes.string,
  returnPolicyTitle: PropTypes.string,
  returnPolicyLink: PropTypes.string,
  connectKlondike: PropTypes.string,
  connectKlondikeLink: PropTypes.string,
  tosTitle: PropTypes.string,
  tosLink: PropTypes.string,
}

export default FooterPolicy
