/* eslint-disable indent */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Link from 'components/atoms/link'
import Button from 'components/atoms/button'
import { AppContext } from 'libs/context'
import Product from 'components/organisms/ourProduct'
import Image from 'components/atoms/image'
import './styles.scss'

const Links = ({
  links = [],
  direction = 'row',
  mobile = true,
  linkStyle = {},
  linkClassName = '',
  style = {},
  className,
  mobileMenu = {},
  buyButton = '',
  menuBottom = '',
  userIcon = '',
}) => {
  const { user } = useContext(AppContext)
  const getToken = user && user.accessToken
  return (
    <div
      style={{
        ...style,

        flexDirection: direction,
      }}
      className={`links ${className}`}
    >
      {links.map((link, i) => {
        if (!link.loggedInOnly || (link.loggedInOnly && user.accessToken)) {
          return (
            (!link.mobileOnly || mobile) && (
              <div className="menu-link-item">
                <Link
                  key={i}
                  style={linkStyle}
                  className={
                    link.productDropDown &&
                    link.productDropDown.length > 0 &&
                    link.productDropDown[0].label !== '' &&
                    link.productDropDown[0].image.url !== ''
                      ? `screen ${linkClassName}`
                      : linkClassName
                  }
                  to={link.url}
                >
                  {link && link.label && link.label}

                  <div>
                    {
                      // link.productDropDown &&
                      //   link.productDropDown.length > 0 &&
                      //   link.productDropDown[0].label !== '' &&
                      //   link.productDropDown[0].image.url !== '' && (
                      <>
                        <Product ourProduct={link.productDropDown} />
                      </>
                      // )
                    }
                  </div>
                </Link>
                <Image
                  width={25}
                  src={mobileMenu && mobileMenu.url}
                  alt={mobileMenu.altText}
                />
              </div>
            )
          )
        } else {
          return null
        }
      })}
      <Button className={!getToken ? 'Buy-Button' : 'Buy-Button'}>
        {!getToken ? 'HOW TO BUY' : 'Quick Order'}
      </Button>
      {/* <Button className="Buy-Button mobile-button">{buyButton}</Button> */}
      <div className="bottom-section">
        <Image width={20} src={userIcon.url} alt={userIcon.altText} />
        {menuBottom}
      </div>
    </div>
  )
}

Links.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object).isRequired,
  direction: PropTypes.string,
  mobile: PropTypes.bool,
  linkStyle: PropTypes.object,
  linkClassName: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  mobileMenu: PropTypes.object,
  buyButton: PropTypes.string,
  menuBottom: PropTypes.string,
  userIcon: PropTypes.string,
}

export default Links
