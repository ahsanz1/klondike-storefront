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
}) => {
  console.log('check naaa:', mobileMenu)
  const { user } = useContext(AppContext)
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
      <Button className="Buy-Button mobile-button">{buyButton}</Button>
      <div className="bottom-section">{menuBottom}</div>
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
}

export default Links
