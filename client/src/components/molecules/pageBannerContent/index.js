import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/atoms/button'
import Link from 'components/atoms/link'
import './style.scss'

const PageBannerContent = ({
  backgroundimg,
  banerlogoimg,
  heading,
  buttontxt,
  searchUrl,
}) => {
  console.log('searchUrl:', searchUrl)
  return (
    <>
      <div className="pagebanner-wrapper">
        <img src={backgroundimg.url} alt="" className="backgrounimg" />
        <div className="pagebanner-internal">
          <div className="imgwrapper">
            <img src={banerlogoimg.url} alt="" />
            <p>{heading}</p>
          </div>
          <Link to={searchUrl}>
            <Button>{buttontxt}</Button>
          </Link>
        </div>
      </div>
    </>
  )
}

PageBannerContent.propTypes = {
  backgroundimg: PropTypes.string,
  banerlogoimg: PropTypes.string,
  heading: PropTypes.string,
  buttontxt: PropTypes.string,
  searchUrl: PropTypes.string,
}

export default PageBannerContent
