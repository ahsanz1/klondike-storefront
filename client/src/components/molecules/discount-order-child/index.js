import React from 'react'
import PropTypes from 'prop-types'
import Heading from 'components/molecules/heading'
import ImageContainer from 'components/atoms/image-container'
import ImgButton from 'components/atoms/img-button'
import './styles.scss'

const DiscountOrderChild = props => {
  const headingProps = {
    desktopPrefix: props.desktopPrefix,
    desktopSuffix: props.desktopSuffix,
    mobilePrefix: props.mobilePrefix,
    mobileSuffix: props.mobileSuffix,
    discount: props.discount,
    headingColor: props.headingColor,
    discountColor: props.discountColor,
  }

  const imgButtonProps = {
    text: props.text,
    src: props.src,
    alt: props.alt,
    buttonLink: props.buttonLink,
  }

  const { imageList } = props

  return (
    <div className="discount-order-child">
      <Heading {...headingProps} />
      <div className="discount-order-child__discount-img">
        {imageList &&
          imageList.map((res, index) => (
            <ImageContainer
              key={index}
              src={res.image.url}
              alt={res.image.altText}
              style={res.image.style}
            />
          ))}
      </div>
      <ImgButton {...imgButtonProps} />
    </div>
  )
}

DiscountOrderChild.propTypes = {
  desktopPrefix: PropTypes.string,
  desktopSuffix: PropTypes.string,
  mobilePrefix: PropTypes.string,
  mobileSuffix: PropTypes.string,
  discount: PropTypes.string,
  discountColor: PropTypes.string,
  headingColor: PropTypes.string,
  imageList: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.object,
    }),
  ),
  src: PropTypes.string,
  alt: PropTypes.string,
  text: PropTypes.string,
  buttonLink: PropTypes.string,
}

export default DiscountOrderChild
