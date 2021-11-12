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
  toggleMenu,
}) => {
  const [clickedName, setClickedName] = useState('')
  const [clickedArray, setClickedArray] = useState([])
  const [hoverSection, setHoverSection] = useState(false)
  const [hoverName, setHoverName] = useState('')
  const { user, loginBottom, setLoginBottom } = useContext(AppContext)
  const getToken = user && user.accessToken
  const toggleFunc = (name, data) => {
    setClickedName(name)
    setClickedArray([...data])
  }
  const toggleSubMenu = () => {
    setClickedName('')
    setHoverName('')
  }
  const hoverFunc = name => {
    console.log('hover state 1:', hoverSection, name)
    setHoverSection(!hoverSection)
    setHoverName(name)
    console.log('hover state 2:', hoverSection, name)
  }
  const hoverClickHandler = name => {
    toggleMenu()
    setHoverName(name)
    setLoginBottom(false)
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
            <Product
              ourProduct={clickedArray}
              clickHandler={hoverClickHandler}
            />
          </>
        </div>
      ) : (
        <>
          {links.map((link, i) => {
            if (!link.loggedInOnly || (link.loggedInOnly && user.accessToken)) {
              return (
                (!link.mobileOnly || mobile) && (
                  <div
                    className="menu-link-item"
                    onMouseEnter={() => hoverFunc(link.label)}
                    onMouseLeave={hoverFunc}
                  >
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

                      {hoverName === link.label && (
                        <div>
                          {
                            <>
                              <Product
                                ourProduct={link.productDropDown}
                                clickHandler={hoverClickHandler}
                              />
                            </>
                          }
                        </div>
                      )}
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
          <Button
            className={!getToken ? 'Buy-Button' : 'Buy-Button'}
            onClick={toggleMenu}
          >
            <Link to={!getToken ? 'contact-us' : 'quickorder'}>
              {!getToken ? 'HOW TO BUY' : 'Quick Order'}
            </Link>
          </Button>
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
  toggleMenu: PropTypes.func,
}

export default Links
