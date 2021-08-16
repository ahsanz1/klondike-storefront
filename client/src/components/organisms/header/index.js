import React from 'react'
import PropTypes from 'prop-types'
import PromoRail from 'components/molecules/header/promo-rail'
import Navbar from 'components/molecules/header/navbar'

import './styles.scss'

const Header = ({
  offerLabel = '',
  promoButton = '',
  buyButton = '',
  url = '',
  offerLink = '',
  promoBanner = '',
  referLabel = '',
  referLink = '',
  logo = {},
  links = [],
  dynamicLinks = [],
}) => {
  const promoData = {
    promoOffer: {
      label: offerLabel,
      link: offerLink,
    },
    promoBtn: {
      label: promoButton,
      link: offerLink,
    },
    promoBanner: promoBanner,
    extraLink: {
      label: referLabel,
      link: referLink,
    },
    promoLogo: {
      url: '/static/images/promologo.png',
      altText: 'alt',
    },
    // navButton: {
    //   label: buyButton,
    //   link: offerLink,
    // },
  }
  console.log('header logo', logo)

  return (
    <div className="main-header">
      <div className="main-header__wrapper--fix">
        <PromoRail {...promoData} />
        <Navbar
          logo={logo.url}
          links={links}
          dynamicLinks={dynamicLinks}
          buyButton={buyButton}
        />
      </div>
    </div>
  )
}
Header.propTypes = {
  promoData: PropTypes.object,
  links: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.object,
  offerLabel: PropTypes.string,
  promoButton: PropTypes.string,
  buyButton: PropTypes.string,
  offerLink: PropTypes.string,
  referLabel: PropTypes.string,
  referLink: PropTypes.string,
  url: PropTypes.string,
  dynamicLinks: PropTypes.array,
  promoBanner: PropTypes.string,
}
export default Header
