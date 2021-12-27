import React, { useState, useEffect, useContext } from 'react'
// import { AppContext } from 'libs/context'
/* eslint-disable jsx-a11y/no-onchange */
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import Link from 'components/atoms/link'
import { SHOW, HIDE, SLIDER_CONFIG } from './constant'
import rightImage from '/static/images/chevron right-black.png'
import Button from 'components/atoms/button'
// import Select from 'components/atoms/dropdown'
import './styles.scss'
import Cookies from 'js-cookie'
import { AppContext } from 'libs/context'

const PromoRail = ({
  promoOffer = {},
  promoBtn = '',
  promoBanner = '',
  promoLogo = '',
  extraLink = {},
  lubricantLink = '',
}) => {
  // const { user } = useContext(AppContext)
  const [showPromo, setShowPromo] = useState(SHOW)
  const [lastScrollTop, setLastScrollTop] = useState(
    window.pageYOffset || document.documentElement.scrollTop,
  )
  const [selectedLang, setSelectedLang] = useState()
  const { handleAppLanguage } = useContext(AppContext)
  const langOptions = [
    { lang: 'ENG', value: '/auto/en' },
    { lang: 'FR', value: '/auto/fr' },
  ]

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

  useEffect(() => {
    const lang = Cookies.get('googtrans') || '/auto/en'
    setTimeout(() => {
      handleLangChange(lang)
    }, 500)
  }, [])

  const handleLangChange = (lang = '/auto/en') => {
    if (Cookies.get('googtrans') && Cookies.get('googtrans') !== lang) {
      Cookies.set('googtrans', lang)
    }
    const script = document.createElement('script')

    script.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    document.head.appendChild(script)

    if (lang === '/auto/en') {
      setSelectedLang('ENG')
    } else {
      setSelectedLang('FR')
    }
    handleAppLanguage(lang)
  }

  return (
    <div className={`promo-rail ${showPromo}`}>
      <div className="promo-rail__page-width">
        <div
          style={{
            display: 'none',
          }}
          id="google_translate_element"
        ></div>
        <select
          onChange={e => handleLangChange(e.target.value)}
          className="language-selector notranslate"
        >
          {langOptions.map((option, i) => (
            <option
              selected={option.lang === selectedLang}
              key={i}
              value={option.value}
            >
              {option.lang}
            </option>
          ))}
        </select>
        {/* <Select
          items={selectItem}
          style={{
            width: '100px',
            color: '#000',
            padding: 0,
            lineHeight: '0px',
            alignSelf: 'center',
            outline: 'none',
          }}
        /> */}
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
            <span className="promo-rail__promo-item">{promoOffer.label}</span>
            <Button className="Promo-search-button">
              <img src={rightImage} alt="rightarrow" />
            </Button>
            <div className="promo-logo">
              <Link to={promoOffer.link}>
                <img src={lubricantLink && lubricantLink.url} alt="alt" />
              </Link>
            </div>
          </div>
          <div className="promo-rail__promo-item-wrapper">
            <p className="promo-rail__promo-item">{promoBanner}</p>
          </div>

          {/* <div className="promo-rail__links">
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
          </div> */}
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
  // promoOffer: PropTypes.string,
  promoBtn: PropTypes.string,
  promoLogo: PropTypes.string,
  // promoBtn: PropTypes.object,
  lubricantLink: PropTypes.string,
}
export default PromoRail
