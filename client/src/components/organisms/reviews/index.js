import React, { useEffect, useState } from 'react'
import Contanier from 'components/molecules/container'
import Button from 'components/atoms/button'
import Link from 'components/atoms/link'
// import NativeDropdown from 'components/atoms/native-dropdown'
import Category from 'components/organisms/category'
import Review from './review'
import { suggestedProducts } from './data'
// import { sortingOptions } from './data'
import productReviews from 'libs/mock-data/reviews.json'
import products from 'libs/mock-data/products.json'
import './style.scss'

const Reviews = () => {
  const pageSize = 5

  // const { sortingOptions } = sortingOptionData
  const { category } = suggestedProducts
  // const { products } = suggestedProducts

  let sku = new URLSearchParams(location.search).get('sku')
  const [tReviews] = useState(productReviews[sku] || [])
  const [tproducts] = useState(products[sku] || [])
  const [reviews, setReview] = useState([])
  const [offset, setOffset] = useState(1)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    getReviews()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getReviews = () => {
    setLoading(true)
    setTimeout(() => {
      if (pageSize * offset <= tReviews.length) {
        let tempReviews = tReviews.slice(0, pageSize * offset)
        setOffset(prevState => prevState + 1)
        setReview(tempReviews)
      } else {
        setReview([...tReviews])
      }
      setLoading(false)
    }, 1000)
  }
  return (
    <>
      <Contanier className="Ccontainer">
        <Category categoryName={category} tproducts={tproducts} />
      </Contanier>
      <Contanier color="#f8f8f8">
        <div className="reviews-contanier">
          <h2 className="reviews-title">Reviews</h2>
          <div className="reviews-holder">
            <div className="reviewControls">
              <Link className="write-review-btn">Write a Review</Link>

              {/* <NativeDropdown
              items={sortingOptions}
              className="sorting-dropdown"
            /> */}

              {tReviews.length > 0 && (
                <span className="reviews-count">{tReviews.length} Reviews</span>
              )}
            </div>
            {reviews &&
              reviews.map((review, index) => (
                <Review
                  key={index}
                  profileName={review.profileName}
                  reviewTitle={review.reviewTitle}
                  reviewDescription={review.reviewDescription}
                  reviewTime={review.reviewTime}
                  reviewFlag={review.reviewFlag}
                  rating={review.rating}
                />
              ))}
          </div>
          {pageSize * offset <= tReviews.length && (
            <div className="reviews-footer">
              {loading && <div className="loading-more">Loading more...</div>}
              <Button
                disabled={loading}
                onClick={() => {
                  getReviews()
                }}
              >
                Show More
              </Button>
            </div>
          )}
        </div>
      </Contanier>
    </>
  )
}

export default Reviews
