import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import HomeBanner from 'components/molecules/homebanner'
// import Oats from './OATS'

const Home = ({
  desktopHeroImage,
  mobileHeroImage,
  bannerheading,
  bannerbutton,
}) => {
  const heroBanner = {
    desktopImage: desktopHeroImage,
    mobileImage: mobileHeroImage,
  }
  const bannercontent = {
    bannerbutton: bannerbutton,
    bannerheading: bannerheading,
  }
  return (
    <>
      <div className="heroimgwrapper">
        <WebpagesHeroImages {...heroBanner} />
      </div>
      <div className="bannercontetwraper">
        <HomeBanner {...bannercontent} />
      </div>
      {/* <Oats/> */}
    </>
  )
}

Home.propTypes = {
  desktopHeroImage: PropTypes.object,
  mobileHeroImage: PropTypes.object,
  bannercontent: PropTypes.string,
  bannerheading: PropTypes.string,
  bannerbutton: PropTypes.string,
}
export default Home
