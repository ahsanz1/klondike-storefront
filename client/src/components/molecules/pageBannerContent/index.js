import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/atoms/button'
import Link from 'components/atoms/link'
import './style.scss'

const PageBannerContent = ({
  backgroundimg,
  backgroundimgMobile,
  banerlogoimg,
  heading,
  mobileHeading,
  buttontxt,
  searchUrl,
}) => {
  console.log('searchUrl:', backgroundimgMobile)
  return (
    <>
      <div className="pagebanner-wrapper">
        <img src={backgroundimg.url} alt="" className="backgrounimg" />
        <img
          src={backgroundimgMobile.url}
          alt={backgroundimgMobile.altText}
          className="backgrounimgmobile"
        />
        <div className="pagebanner-internal">
          <div className="imgwrapper">
            <img src={banerlogoimg.url} alt="" />
            <p className="deskHeading">{heading}</p>
            <p className="mobHeading">{mobileHeading}</p>
          </div>
          <Link to="/oats">
            <Button>{buttontxt}</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

PageBannerContent.propTypes = {
  backgroundimg: PropTypes.string,
  backgroundimgMobile: PropTypes.string,
  banerlogoimg: PropTypes.string,
  heading: PropTypes.string,
  mobileHeading: PropTypes.string,
  buttontxt: PropTypes.string,
  searchUrl: PropTypes.string,
}

export default PageBannerContent
