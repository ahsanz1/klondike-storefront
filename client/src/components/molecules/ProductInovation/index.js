import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
import SwiperCore, { Scrollbar, A11y } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss'
import 'swiper/components/pagination/pagination.scss'
import 'swiper/components/scrollbar/scrollbar.scss'

// install Swiper modules
SwiperCore.use([Scrollbar, A11y])

const ProductInovation = ({ productInovation }) => {
  const [size] = useWindowSize()

  return (
    <div className="product-wrapper">
      <Swiper
        spaceBetween={20}
        slidesPerView={size < 768 ? 1 : 4}
        //   navigation
        //   pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={swiper => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <div>
          {productInovation.map((content, i) => (
            <SwiperSlide key={i}>
              <div className="Product-content">
                <div className="product_img_wraper">
                  <img src={content.image.url} alt="" />
                </div>
                <p>{content.detail}</p>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  )
}

// const { array } = PropTypes
ProductInovation.propTypes = {
  productInovation: PropTypes.array,
}
export default ProductInovation
