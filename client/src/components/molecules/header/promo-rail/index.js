import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from 'libs/context'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import Link from 'components/atoms/link'
import { SHOW, HIDE, SLIDER_CONFIG } from './constant'
import './styles.scss'

const PromoRail = ({ promoOffer = {}, promoBanner = '', extraLink = {} }) => {
  const { user } = useContext(AppContext)
  const [showPromo, setShowPromo] = useState(SHOW)
  const [lastScrollTop, setLastScrollTop] = useState(
    window.pageYOffset || document.documentElement.scrollTop,
  )

  useEffect(() => {
    const handleScroll = () => {
      var st = window.pageYOffset || document.documentElement.scrollTop
      if (st > lastScrollTop) {
        if (showPromo !== HIDE) setShowPromo(HIDE)
      } else {
        if (showPromo !== SHOW) setShowPromo(SHOW)
      }
      setLastScrollTop(st <= 0 ? 0 : st)
    }

    window.addEventListener('scroll', handleScroll)

    return _ => {
      window.removeEventListener('scroll', handleScroll)
    }
  })

  return (
    <div className={`promo-rail ${showPromo}`}>
      <div className="promo-rail__page-width">
        <div className="promo-rail__wrapper">
          <Slider className="promo-rail__slider" {...SLIDER_CONFIG}>
            <div className="promo-rail__promo-item-slide">
              <Link className="promo-rail__promo-item" to={promoOffer.link}>
                {promoOffer.label}
              </Link>
            </div>
            <div className="promo-rail__promo-item-slide">
              <p className="promo-rail__promo-item">{promoBanner}</p>
            </div>
          </Slider>
          <div className="promo-rail__promo-item-wrapper">
            <Link className="promo-rail__promo-item" to={promoOffer.link}>
              {promoOffer.label}
            </Link>
          </div>
          <div className="promo-rail__promo-item-wrapper">
            <p className="promo-rail__promo-item">{promoBanner}</p>
          </div>

          <div className="promo-rail__links">
            <Link to={extraLink.link}>{extraLink.label}</Link>
            <span className="promo-rail__dot">•</span>
            {user.accessToken ? (
              <>
                <Link to="/account">Account</Link>
                <span className="promo-rail__dot">•</span>
                <Link to="/account/login?logout=true">Logout</Link>
              </>
            ) : (
              <Link to="/account/login">Log In</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
PromoRail.propTypes = {
  promoOffer: PropTypes.object,
  promoBanner: PropTypes.string,
  extraLink: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
}
export default PromoRail
