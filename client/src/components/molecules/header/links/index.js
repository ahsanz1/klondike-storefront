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
  const { user } = useContext(AppContext)
  // let userLoginInfo = localStorage.getItem('userPersonalInfo')
  // userLoginInfo = JSON.parse(userLoginInfo)
  // console.log('check menu:', links)
  const [arrowToggle, setArrowToggle] = useState(false)
  const [clickName, setClickName] = useState('')

  const getToken = user && user.accessToken
  const clickHandler = async name => {
    await setClickName(name)
    console.log('click name1:', name, arrowToggle, clickName)
    if (clickName === name) {
      setArrowToggle(true)
    } else {
      setArrowToggle(false)
    }
    // await setArrowToggle(!arrowToggle)
    console.log('click name2:', name, arrowToggle, clickName)
  }
  console.log('links 0:', links)
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
                  <Image
                    width={25}
                    src={mobileMenu && mobileMenu.url}
                    alt={mobileMenu.altText}
                    className={
                      arrowToggle && clickName === link.label
                        ? 'left-image'
                        : 'right-image'
                    }
                    onClick={() => clickHandler(link.label)}
                  />
                  <div
                    className={
                      arrowToggle && clickName === link.label
                        ? 'toggleOptions'
                        : 'hideToggleOptions'
                    }
                  >
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
              </>
            )
          )
        } else {
          return null
        }
      })}
      <Button className={!getToken ? 'quick-order' : 'Buy-Button'}>
        {!getToken ? 'Quick Order' : buyButton}
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
