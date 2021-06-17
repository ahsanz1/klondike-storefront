import React from 'react'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'
import StarRatings from 'react-star-ratings'
import useWindowSize from 'libs/custom-hooks/useWindowSize'
import Label from 'components/atoms/label'
import './style.scss'
const Review = ({
  profileName = '',
  reviewTitle = '',
  reviewDescription = '',
  reviewTime = '',
  reviewFlag = '',
  rating = 0,
}) => {
  const [screenSize] = useWindowSize()
  return (
    <div className="review-box">
      <Row>
        <Col xs={24} sm={24} md={8} className="left-side">
          <div>
            <span className="profile-name">{profileName}</span>
            <span
              className="profile-country"
              style={{
                backgroundImage: 'url(' + reviewFlag + ')',
              }}
            ></span>
          </div>
          <div className="profile-status">Verified Buyer</div>
        </Col>
        <Col xs={24} sm={24} md={16} className="right-side">
          <Row className="review-meta">
            <Col xs={8} sm={8} md={8}>
              <StarRatings
                rating={rating}
                starRatedColor="#ffb829"
                starDimension={screenSize > 768 ? '30px' : '15px'}
                starSpacing="1px"
                numberOfStars={5}
                name="rating"
              />
            </Col>
            <Col xs={16} sm={16} md={16} className="review-date">
              <span>{reviewTime}</span>
            </Col>
          </Row>
          <div className="review-main">
            <h2>{reviewTitle}</h2>
            <Label>{reviewDescription}</Label>
          </div>
        </Col>
      </Row>
    </div>
  )
}

Review.propTypes = {
  profileName: PropTypes.string,
  reviewTime: PropTypes.string,
  reviewTitle: PropTypes.string,
  reviewDescription: PropTypes.string,
  reviewFlag: PropTypes.string,
  rating: PropTypes.number,
}

export default Review
