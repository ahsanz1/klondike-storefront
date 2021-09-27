/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import { AppContext } from 'libs/context'
import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
// import Link from 'components/atoms/link'
import './style.scss'

const NavbarcartIcon = ({ linkCartPageIcon = false, cartIcon = '' }) => {
  const { itemCount, showModal } = useContext(AppContext)

  return (
    <div className="cart-specific">
      <div className={linkCartPageIcon ? 'cartshow' : 'hide'}>
        {/* <Link to="/cart">
          <Image height={26} src={cartIcon.url} alt={cartIcon.altText} />
          {itemCount > 0 && (
            <Label className="navbar-cart-count">{itemCount}</Label>
          )}
        </Link> */}
      </div>
      {!linkCartPageIcon && (
        <div
          className="navbar-cart-icon"
          onClick={showModal}
          role="button"
          tabIndex={0}
        >
          <Image height={26} src={cartIcon.url} alt={cartIcon.altText} />
          {itemCount > 0 && (
            <Label className="navbar-cart-count">{itemCount}</Label>
          )}
        </div>
      )}
    </div>
  )
}

NavbarcartIcon.propTypes = {
  linkCartPageIcon: PropTypes.bool,
  cartIcon: PropTypes.string,
}
export default NavbarcartIcon
