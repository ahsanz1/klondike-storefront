import React from 'react'
import PropTypes from 'prop-types'
import Image from 'components/atoms/image'
import Button from 'components/atoms/button'
import Link from 'components/atoms/link'
import './style.scss'

const PLPBottom = ({
  image,
  button,
  mobileButton,
  buttonUrl,
  mobileButtonUrl,
}) => {
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
          <Link to={buttonUrl}>
            <Button className="dealer-botton">{button}</Button>
          </Link>
        </div>
      </div>
      <div>
        <Link to={mobileButtonUrl}>
          <Button className="mob-button">{mobileButton}</Button>
        </Link>
      </div>
    </div>
  )
}
PLPBottom.propTypes = {
  image: PropTypes.string,
  button: PropTypes.string,
  mobileButton: PropTypes.string,
  buttonUrl: PropTypes.string,
  mobileButtonUrl: PropTypes.string,
}
export default PLPBottom
