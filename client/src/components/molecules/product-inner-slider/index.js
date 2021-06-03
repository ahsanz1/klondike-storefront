import React, { useState, useEffect, useRef } from 'react'
import Slider from 'react-slick'
import PropTypes from 'prop-types'
import ProductSliderCard from 'components/molecules/product-slider-card'
import './styles.scss'

const ProductInnerSlider = ({
  data = [],
  setBackgroundColor,
  setBorderColor,
}) => {
  const [beforeSlide, setBeforeSilde] = useState(0)
  const slider = useRef()

  useEffect(() => {
    const { borderColor = '#eee', bgColor = '#eee' } = data[beforeSlide] || {}
    setBackgroundColor(bgColor)
    setBorderColor(borderColor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, beforeSlide])

  const settings = {
    arrows: false,
    infinite: true,
    dots: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    // slidesToShow: 3,
    slidesToShow: data.length > 3 ? 3 : 1,
    slidesToScroll: 1,
    centerMode: false,
    dotsClass: 'slick-new-nav',
    responsive: [
      {
        breakpoint: 2561,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 2560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (current, next) => {
      setBeforeSilde(next)
    },
    // eslint-disable-next-line react/display-name
    appendDots: dots => {
      return (
        <div>
          <div className="slick-new-inner">
            <ul className="slick-new-ul"> {dots} </ul>
          </div>
        </div>
      )
    },
    // eslint-disable-next-line react/display-name
    customPaging: i => {
      const {
        productIcon = '/',
        productIconAlt = 'unknown img',
        borderColor = '#eee',
      } = data[i] || {}
      let borderBottomValue = `4px solid transparent`
      if (beforeSlide === i) {
        borderBottomValue = `4px solid ${borderColor}`
      }
      return (
        <div
          className="slick-new-item"
          style={{
            borderBottom: borderBottomValue,
          }}
        >
          <div className="slick-new-img">
            <img src={productIcon} alt={productIconAlt} />
          </div>
        </div>
      )
    },
  }
  return (
    <div className="product-inner">
      <button
        className={`arrow-btn prev ${data.length > 3 ? '' : 'single'}`}
        onClick={() => {
          slider.current.slickPrev()
        }}
      >
        <span className="pis--span chevron-left"></span>
      </button>
      <button
        className={`arrow-btn next ${data.length > 3 ? '' : 'single'}`}
        onClick={() => slider.current.slickNext()}
      >
        <span className="pis--span chevron-right"></span>
      </button>
      <Slider ref={slider} {...settings}>
        {data.map((res, index) => (
          <ProductSliderCard key={res.productName} {...res} />
        ))}
      </Slider>
    </div>
  )
}

ProductInnerSlider.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      desc: PropTypes.string,
      name: PropTypes.string,
      imgUrl: PropTypes.string,
      imgAlt: PropTypes.string,
      productIcon: PropTypes.string,
      productIconAlt: PropTypes.string,
      borderColor: PropTypes.string,
      bgColor: PropTypes.string,
    }),
  ),
  setBackgroundColor: PropTypes.func,
  setBorderColor: PropTypes.func,
}

export default ProductInnerSlider
