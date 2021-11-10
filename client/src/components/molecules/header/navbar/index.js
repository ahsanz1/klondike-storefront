/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import { useLocation } from '@reach/router'
import Links from 'components/molecules/header/links'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import Link from 'components/atoms/link'
import NavbarcartIcon from 'components/molecules/navbar-cart-icon'
import CartDropdown from 'components/organisms/cart-dropdown'
import { AppContext } from 'libs/context'

import CartPopUP from 'components/organisms/cart-pop'

import './styles.scss'

const Navbar = ({
  logo = '',
  links = [],
  dynamicLinks = [],
  buyButton = '',
  searchIcon = '',
  userIcon = '',
  cartIcon = '',
  mobileLogo = {},
  mobileMenu = {},
  mobileMenuOpen = {},
  mobileMenuClose = {},
  menuBottom = '',
  toggleSearch = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { user, loginBottom, setLoginBottom, getCartItems } = useContext(
    AppContext,
  )
  const wholesaleLinks =
    dynamicLinks ||
    dynamicLinks.find(item => item.id === 'Wholesale').linksArray ||
    []
  if (user && user.isWholeSaleUser) {
    links = wholesaleLinks
  }
  let userLoginInfo = localStorage.getItem('userPersonalInfo')
  userLoginInfo = JSON.parse(userLoginInfo)
  const searchClick = () => {
    toggleSearch()
    setLoginBottom(false)
  }
  const menuToggle = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div
      className={
        location.pathname === '/Checkoutsection' ? 'hide-header' : 'header'
      }
    >
      <div className="header__nav">
        <CartDropdown />
        <CartPopUP />
        <div className="mobile-home-logo">
          <Link to="/">
            <Image width={75} src={mobileLogo.url} alt="logo" />
          </Link>
        </div>
        <div className="header__mobile-menu-button">
          <Button
            iconOnly
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          >
            {isOpen ? (
              <Image
                width={25}
                src={mobileMenuClose.url}
                alt="..."
                onClick={() => setLoginBottom(!loginBottom)}
              />
            ) : (
              <Image
                width={25}
                src={mobileMenuOpen.url}
                alt="..."
                onClick={() => setLoginBottom(!loginBottom)}
              />
            )}
          </Button>
        </div>
        <Link
          to="/"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <img className="mbl-version" src={mobileLogo.url} alt="..." />
          <img className="header__logo" src={logo} alt="..." />
        </Link>
        <Links
          className="header__links"
          linkClassName="header-link"
          mobile={false}
          links={links}
          toggleMenu={menuToggle}
        />
        <Button
          className={
            userLoginInfo && userLoginInfo.email ? 'quick-order' : 'Buy-Button'
          }
        >
          <Link
            className={
              userLoginInfo && userLoginInfo.email
                ? 'quick-order'
                : 'Buy-Button'
            }
            to={
              userLoginInfo && userLoginInfo.email
                ? '/quickorder'
                : 'contact-us'
            }
          >
            {userLoginInfo && userLoginInfo.email ? 'Quick Order' : buyButton}
          </Link>
        </Button>

        <div
          className="header__icons"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <Link
            // to="/SearchFlow"
            className="header__search-icon"
          >
            <Button onClick={searchClick}>
              <Image
                height={26}
                src={searchIcon.url}
                alt={searchIcon.altText}
              />
            </Button>
          </Link>
          <Link
            to={
              userLoginInfo && userLoginInfo.email
                ? '/account'
                : 'account/login'
            }
            className="header__User-icon"
          >
            <Image
              height={26}
              src={userIcon.url}
              alt={userIcon.altText}
              onClick={() => setLoginBottom(false)}
            />
          </Link>
          {userLoginInfo && userLoginInfo.email && (
            <Button
              iconOnly
              style={{
                paddingRight: '35px',
              }}
            >
              <div className="cart-amount">
                ${getCartItems?.totalAmount?.amount}
              </div>
              <NavbarcartIcon
                linkCartPageIcon={location.pathname === '/cart' && true}
                cartIcon={cartIcon}
              />
            </Button>
          )}
        </div>
      </div>
      <div
        className={`header__mobile-menu ${
          isOpen ? 'header__mobile-menu--show' : ''
        }`}
      >
        <Links
          className="header__mobile-menu-links"
          direction="column"
          mobile={true}
          links={links}
          mobileMenu={mobileMenu}
          buyButton={buyButton}
          menuBottom={menuBottom}
          userIcon={userIcon}
          toggleMenu={menuToggle}
        />
      </div>
    </div>
  )
}
Navbar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.string,
  navButton: PropTypes.string,
  dynamicLinks: PropTypes.array,
  buyButton: PropTypes.string,
  searchIcon: PropTypes.string,
  userIcon: PropTypes.string,
  cartIcon: PropTypes.string,
  mobileLogo: PropTypes.object,
  mobileMenu: PropTypes.object,
  mobileMenuOpen: PropTypes.object,
  mobileMenuClose: PropTypes.object,
  menuBottom: PropTypes.object,
  toggleSearch: PropTypes.func,
}
export default Navbar
