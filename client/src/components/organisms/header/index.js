import React from 'react'
import PropTypes from 'prop-types'
import PromoRail from 'components/molecules/header/promo-rail'
import Navbar from 'components/molecules/header/navbar'

import './styles.scss'

const Header = ({
  offerLabel = '',
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
    promoBanner: promoBanner,
    extraLink: {
      label: referLabel,
      link: referLink,
    },
  }

  return (
    <div className="main-header">
      <div className="main-header__wrapper--fix">
        <PromoRail {...promoData} />
        <Navbar logo={logo.url} links={links} dynamicLinks={dynamicLinks} />
      </div>
    </div>
  )
}
Header.propTypes = {
  promoData: PropTypes.object,
  links: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.object,
  offerLabel: PropTypes.string,
  offerLink: PropTypes.string,
  promoBanner: PropTypes.string,
  referLabel: PropTypes.string,
  referLink: PropTypes.string,
  dynamicLinks: PropTypes.array,
}
export default Header
