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
// import Testimonial from '../testimonial'

// install Swiper modules
SwiperCore.use([Scrollbar, A11y])

const MobileTestimonial = ({ testimonial }) => {
  const [size] = useWindowSize()

  return (
    <div className="testimonial-wrapper">
      <h1 className="buy-heading">Why I buy KLONDIKE</h1>
      <div className="product-wrapperz">
        <Swiper
          spaceBetween={20}
          slidesPerView={size < 768 ? 1 : 4}
          onSwiper={swiper => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          breakpoints={{ 370: { width: 284 } }}
        >
          <div>
            {testimonial.map((content, i) => (
              <SwiperSlide key={i}>
                <div className="Product-content">
                  <div className="product_img_wraper">
                    {content.image.url && (
                      <img
                        className="img-design"
                        src={content.image.url}
                        alt=""
                      />
                    )}
                    <p>{content.headingtext}</p>
                    <p className="comment">{content.text}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </div>
  )
}

// const { array } = PropTypes
MobileTestimonial.propTypes = {
  testimonial: PropTypes.array,
}
export default MobileTestimonial
