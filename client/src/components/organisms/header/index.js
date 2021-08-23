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
  lubricantLink = '',
  searchIcon = '',
  userIcon = '',
  cartIcon = '',
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
  console.log('header logo', cartIcon)

  return (
    <div className="main-header">
      <div className="main-header__wrapper--fix">
        <PromoRail {...promoData} lubricantLink={lubricantLink} />
        <Navbar
          logo={logo.url}
          links={links}
          dynamicLinks={dynamicLinks}
          buyButton={buyButton}
          searchIcon={searchIcon}
          userIcon={userIcon}
          cartIcon={cartIcon}
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
  lubricantLink: PropTypes.string,
  searchIcon: PropTypes.string,
  userIcon: PropTypes.string,
  cartIcon: PropTypes.string,
}
export default Header
