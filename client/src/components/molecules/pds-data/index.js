import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import Link from 'components/atoms/link'

const PdsData = ({ image, url, button, mobileButton }) => {
  return (
    <div className="bottom-plp">
      <div className="pcp-bottom">
        <div className="plp-bottom-image">
          <Image src={image} alt="hii" className="plp-bottom-img" />
        </div>
        <div>
          <Button className="dealer-botton">
            <Link to={url} className="download-Pds_link">
              {button}
            </Link>
          </Button>
        </div>
        <div className="mob">
          <Button className="mob-button">
            <Link to={url}>{mobileButton}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
PdsData.propTypes = {
  image: PropTypes.string,
  mobileButton: PropTypes.string,
  url: PropTypes.string,
  button: PropTypes.string,
}
export default PdsData
