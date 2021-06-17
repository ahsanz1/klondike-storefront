import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import NewsletterModal from 'components/organisms/newsletter-modal'
import Image from 'components/atoms/image'
import FooterLinks from 'components/molecules/footer-links'
import FooterNewsletter from 'components/molecules/footer-newsletter'
import FooterSocialLinks from 'components/molecules/footer-socialinks'
import FooterPolicy from 'components/molecules/footer-policy'
import Link from 'components/atoms/link'
import { subscribeNewsletter } from 'libs/api/klaviyo'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
import './styles.scss'

const Footer = ({
  footerLinks = [],
  socialLinks = {},
  policyText = '',
  privacyTitle = '',
  privacyLink = '',
  returnPolicyTitle = '',
  returnPolicyLink = '',
  tosTitle = '',
  tosLink = '',
  newsLetterTitle = '',
  newsLetterDesc = '',
  logoImage = {},
  paymentText = '',
  paymentMethodsImage = {},
}) => {
  const iconInputProps = {
    img: '/static/icons/mail-footer.svg',
    buttonType: 'submit',
  }

  const [isInput, setIsInput] = useState(true)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLaoding, setIsLoading] = useState(false)
  const [width] = useWindowSize()
  const onFormSubmit = async data => {
    setIsLoading(true)
    setIsError(false)
    setIsSuccess(false)

    const subscribeNewsletterPayload = {
      profiles: [{ email: data }],
      newsletterId: 'RhvEDG',
    }

    try {
      // setLoading(true)
      let subscribeNewsletterResponse = await subscribeNewsletter(
        subscribeNewsletterPayload,
      )
      console.log('subscribeNewsletterResponse xx', subscribeNewsletterResponse)
      if (
        !subscribeNewsletterResponse.error &&
        subscribeNewsletterResponse.data.status === 'OK'
      ) {
        setIsSuccess(true)
        setIsInput(false)
        setIsLoading(false)
      } else {
        setIsError(true)
        setIsLoading(false)
        // subscribeNewsletterResponse.message &&
        //   message.info('Unable to subscribe. Try again')
      }
    } catch (e) {
      setIsError(true)
      setIsLoading(false)
      console.log('Unable to subscribe. Try again')
    }
  }

  return (
    <>
      <NewsletterModal />
      <div className="footer">
        <div className="page-width">
          <Row>
            <Col xs={0} sm={0} md={6}>
              <Image
                alt="Footer logo"
                className="footer-logo"
                src={logoImage.url || '/static/icons/footer-logo.svg'}
              />
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Row>
                {footerLinks.length &&
                  footerLinks.map((fLinks, i) => (
                    <Col xs={12} sm={8} md={8} key={fLinks.heading}>
                      <FooterLinks
                        heading={fLinks.heading}
                        links={fLinks.links}
                      />
                      {i === footerLinks.length - 1 && width <= 767 && (
                        <ul className="links-mobile-bottom">
                          <li>
                            <Link to={privacyLink}>{privacyTitle}</Link>
                          </li>
                          <li>
                            <Link to={returnPolicyLink}>
                              {returnPolicyTitle}
                            </Link>
                          </li>
                          <li>
                            <Link to={tosLink}>{tosTitle}</Link>
                          </li>
                        </ul>
                      )}
                    </Col>
                  ))}
                <Col xs={12} sm={0} md={0}>
                  <FooterSocialLinks
                    socialIcons={socialLinks}
                    screen="mobile"
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={6}>
              <FooterNewsletter
                isInput={isInput}
                isError={isError}
                isSuccess={isSuccess}
                loading={isLaoding}
                iconInputProps={iconInputProps}
                newsLetterTitle={newsLetterTitle}
                newsLetterDesc={newsLetterDesc}
                onFormSubmit={onFormSubmit}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={0} sm={0} md={24}>
              <hr className="site-footer__hr"></hr>
            </Col>
          </Row>
        </div>
        <div className="page-width">
          <Row>
            <Col xs={0} sm={0} md={15}>
              <FooterPolicy
                policyText={policyText}
                privacyTitle={privacyTitle}
                privacyLink={privacyLink}
                returnPolicyTitle={returnPolicyTitle}
                returnPolicyLink={returnPolicyLink}
                tosLink={tosLink}
                tosTitle={tosTitle}
              />
            </Col>
            <Col xs={0} sm={24} md={9}>
              <FooterSocialLinks socialIcons={socialLinks} screen="desktop" />
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={0} md={0}>
              <h3 className="policy-mobile">{policyText}</h3>
            </Col>
          </Row>
          <div className="bottom-payment">
            <span>
              {paymentText || 'We accept the following payment methods'}
            </span>
            <Image
              src={
                paymentMethodsImage.url ||
                'https://cdn.shopify.com/s/files/1/1682/9837/files/pay.png?v=1614765537'
              }
              alt={paymentMethodsImage.altText || 'Payment Method'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

Footer.propTypes = {
  policy: PropTypes.object,
  socialLinks: PropTypes.array,
  footerLinks: PropTypes.array,
  newsLetterTitle: PropTypes.string,
  newsLetterDesc: PropTypes.string,
  policyText: PropTypes.string,
  privacyTitle: PropTypes.string,
  privacyLink: PropTypes.string,
  returnPolicyTitle: PropTypes.string,
  returnPolicyLink: PropTypes.string,
  tosTitle: PropTypes.string,
  tosLink: PropTypes.string,
  logoImage: PropTypes.object,
  paymentText: PropTypes.string,
  paymentMethodsImage: PropTypes.object,
}

export default Footer
