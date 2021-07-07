import React from 'react'
import PropTypes from 'prop-types'
import Button from 'components/atoms/button'
import './style.scss'

const PageBannerContent = ({
  backgroundimg,
  banerlogoimg,
  heading,
  buttontxt,
}) => {
  return (
    <>
      <div className="pagebanner-wrapper">
        <img src={backgroundimg.url} alt="" className="backgrounimg" />
        <div className="pagebanner-internal">
          <div className="imgwrapper">
            <img src={banerlogoimg.url} alt="" />
            <p>{heading}</p>
          </div>

          <Button>{buttontxt}</Button>
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
}

export default PageBannerContent
