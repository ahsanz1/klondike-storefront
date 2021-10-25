import React from 'react'
import PropTypes from 'prop-types'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import './style.scss'
import { Link } from '@reach/router'

const PCPBottom = ({ image, button, mobileButton, url }) => {
  return (
    <div className="bottom-plp">
      <div className="pcp-bottom">
        <div className="plp-bottom-image">
          <Image
            src={image}
            // alt={image.altText}
            className="plp-bottom-img"
          />
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
PCPBottom.propTypes = {
  image: PropTypes.string,
  button: PropTypes.string,
  mobileButton: PropTypes.string,
  url: PropTypes.string,
}
export default PCPBottom
