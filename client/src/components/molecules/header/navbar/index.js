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

import './styles.scss'

const Navbar = ({ logo = '', links = [], dynamicLinks = [] }) => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const { user } = useContext(AppContext)
  const wholesaleLinks =
    dynamicLinks.find(item => item.id === 'Wholesale').linksArray || []
  if (user && user.isWholeSaleUser) {
    links = wholesaleLinks
  }

  return (
    <div className="header">
      <div className="header__nav">
        <CartDropdown />
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
                src="/static/icons/header/cross.svg"
                alt="..."
              />
            ) : (
              <Image width={25} src="/static/icons/header/menu.svg" alt="..." />
            )}
          </Button>
        </div>
        <Link
          to="/"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <img className="header__logo" src={logo} alt="..." />
        </Link>
        <Links
          className="header__links"
          linkClassName="header-link"
          mobile={false}
          links={links}
        />
        <div
          className="header__icons"
          onClick={() => {
            setIsOpen(false)
          }}
        >
          <Link to="/search" className="header__search-icon">
            <Image
              height={26}
              src="/static/icons/header/search.svg"
              alt="..."
            />
          </Link>
          <Button
            iconOnly
            style={{
              paddingLeft: '14px',
            }}
          >
            <NavbarcartIcon
              linkCartPageIcon={location.pathname === '/cart' && true}
            />
          </Button>
        </div>
      </div>
      <div
        className={`header__mobile-menu ${
          isOpen ? 'header__mobile-menu--show' : ''
        }`}
        onClick={() => {
          setIsOpen(false)
        }}
      >
        <Links
          className="header__mobile-menu-links"
          direction="column"
          mobile={true}
          links={links}
        />
      </div>
    </div>
  )
}
Navbar.propTypes = {
  links: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.string,
  dynamicLinks: PropTypes.array,
}
export default Navbar
