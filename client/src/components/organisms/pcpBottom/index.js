import React from 'react'
import PropTypes from 'prop-types'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import './style.scss'

const PCPBottom = ({ image, button, mobileButton }) => {
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
          <Button className="dealer-botton">{button}</Button>
        </div>
        <div className="mob">
          <Button className="mob-button">{mobileButton}</Button>
        </div>
      </div>
    </div>
  )
}
PCPBottom.propTypes = {
  image: PropTypes.string,
  button: PropTypes.string,
  mobileButton: PropTypes.string,
}
export default PCPBottom
