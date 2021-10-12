import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// import { AppContext } from 'libs/context'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import HomeBanner from 'components/molecules/homebanner'

const Home = ({ desktopHeroImage, mobileHeroImage, bannercontent }) => {
  const heroBanner = {
    desktopImage: desktopHeroImage,
    mobileImage: mobileHeroImage,
  }
  // const { setPlpRedirect } = useContext(AppContext)
  return (
    <>
      <WebpagesHeroImages {...heroBanner} />
      <div className="bannercontetwraper">
        <HomeBanner {...bannercontent} />
      </div>
    </>
  )
}

Home.propTypes = {
  desktopHeroImage: PropTypes.object,
  mobileHeroImage: PropTypes.object,
  bannercontent: PropTypes.string,
}
export default Home
