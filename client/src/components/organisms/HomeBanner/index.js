import React from 'react'
import PropTypes from 'prop-types'
// import './style.scss'
import PageBannerContent from 'components/molecules/pageBannerContent'

const HomeBanner = ({ bannerComponent }) => {
  console.log('bannerComponent', bannerComponent)
  return (
    <>
      {bannerComponent.map((content, i) => (
        <PageBannerContent {...content} key={i} />
      ))}
    </>
  )
}

HomeBanner.propTypes = {
  bannerComponent: PropTypes.string,
}

export default HomeBanner
