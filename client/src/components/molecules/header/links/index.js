/* eslint-disable indent */
import React, { useState, useContext } from 'react'
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
  const [clickedName, setClickedName] = useState('')
  const [clickedArray, setClickedArray] = useState([])
  const { user, loginBottom } = useContext(AppContext)
  const getToken = user && user.accessToken
  const toggleFunc = (name, data) => {
    setClickedName(name)
    setClickedArray([...data])
  }
  const toggleSubMenu = () => {
    setClickedName('')
  }
  return (
    <div
      style={{
        ...style,

        flexDirection: direction,
      }}
      className={`links ${className}`}
    >
      {clickedName ? (
        <div className="toggle-sub-menu">
          <Image
            width={25}
            src={mobileMenu && mobileMenu.url}
            alt={mobileMenu.altText}
            onClick={toggleSubMenu}
          />
          <strong>{clickedName}</strong>

          <>
            <Product ourProduct={clickedArray} />
          </>
        </div>
      ) : (
        <>
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
                      onClick={() =>
                        toggleFunc(link.label, link.productDropDown)
                      }
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
        </>
      )}
      {loginBottom && getToken && (
        <div className="bottom-section">
          <Image width={20} src={userIcon.url} alt={userIcon.altText} />
          {menuBottom}
        </div>
      )}
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
