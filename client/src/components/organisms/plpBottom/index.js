import React from 'react'
import PropTypes from 'prop-types'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import './style.scss'

const PLPBottom = ({ image, button, mobileButton }) => {
  console.log('plp-prop-bottom:', image, button)
  return (
    <div className="bottom-plp">
      <div className="plp-bottom">
        <div>
          <Image
            src={image.url}
            alt={image.altText}
            className="plp-bottom-img"
          />
        </div>
        <div>
          <Button className="dealer-botton">{button}</Button>
        </div>
      </div>
      <div>
        <Button className="mob-button">{mobileButton}</Button>
      </div>
    </div>
  )
}
PLPBottom.propTypes = {
  image: PropTypes.string,
  button: PropTypes.string,
  mobileButton: PropTypes.string,
}
export default PLPBottom
