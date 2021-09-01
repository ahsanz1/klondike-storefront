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
  console.log('check naaa:', mobileMenu)
  const { user } = useContext(AppContext)
  let userLoginInfo = localStorage.getItem('userPersonalInfo')
  userLoginInfo = JSON.parse(userLoginInfo)
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
              <>
                <Link
                  key={i}
                  style={linkStyle}
                  className={linkClassName}
                  to="#"
                >
                  {link.label}
                  <Image
                    width={25}
                    src={mobileMenu && mobileMenu.url}
                    alt={mobileMenu.altText}
                  />
                  {link.productDropDown &&
                    link.productDropDown.length > 0 &&
                    link.productDropDown[0].label !== '' &&
                    link.productDropDown[0].image.url !== '' && (
                      <>
                        <Product ourProduct={link.productDropDown} />
                      </>
                    )}
                </Link>
              </>
            )
          )
        } else {
          return null
        }
      })}
      <Button
        className={
          userLoginInfo && userLoginInfo.email ? 'quick-order' : 'Buy-Button'
        }
      >
        {userLoginInfo && userLoginInfo.email ? 'Quick Order' : buyButton}
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
