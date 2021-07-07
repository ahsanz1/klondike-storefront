import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'

import LinkIcon from 'components/atoms/link-icon'
import './style.scss'

const FooterSocialLinks = ({ socialIcons = [], screen = '' }) => {
  return (
    <>
      {screen === 'desktop' ? (
        <ul className="social-icons">
          {/* <li className="social-icon-label">{'Follow us'}</li> */}
          {socialIcons &&
            socialIcons.map((socialIcon, index) => (
              <li className="social-icons__item" key={index}>
                <LinkIcon
                  src={socialIcon.icon.url}
                  imgClassName="s-icon"
                  alt=""
                  link={socialIcon.link}
                  linkClassName="social-icons__link"
                />
              </li>
            ))}
        </ul>
      ) : (
        <div className="footer-column menu-column">
          <h3>{'Follow us'}</h3>
          <Row>
            {socialIcons &&
              socialIcons.map((socialIcon, index) => (
                <Col xs={9} className="social-icons__item p-5" key={index}>
                  <LinkIcon
                    src={socialIcon.icon.url}
                    imgClassName="s-icon"
                    alt=""
                    link={socialIcon.link}
                    linkClassName="social-icons__link"
                  />
                </Col>
              ))}
          </Row>
        </div>
      )}
    </>
  )
}

FooterSocialLinks.propTypes = {
  socialIcons: PropTypes.array,
  screen: PropTypes.string,
}

export default FooterSocialLinks
