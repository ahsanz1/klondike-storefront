import './style.scss'
import React from 'react'
import IndustryAppTablist from 'components/molecules/industry-applications-tablist'
import IndustryAppMobileTabList from 'components/molecules/industry-applications-mobile-tablist'
import Label from 'components/atoms/label'
import PropTypes from 'prop-types'
import { useWindowSize } from 'libs/custom-hooks'
import Button from 'components/atoms/button'
import Link from 'components/atoms/link'

const AgriculturePage = ({
  title,
  paragraph,
  subHeading,
  featuredProduct,
  exploreCatagoryHeading,
  exploreCatagory,
  activeTablist,
}) => {
  const [readMore, setReadMore] = React.useState(false)
  const size = useWindowSize()
  const renderAgriculturePage = () => {
    const more = () => {
      setReadMore(true)
    }
    return (
      <div className="agricultural-wrapper">
        <Label className="title">{title}</Label>
        <div className="our-story-content">
          <>
            <p
              className="details-paragraph"
              dangerouslySetInnerHTML={{
                __html: paragraph,
              }}
            ></p>

            <div className="overview-detail-section-mobile">
              {readMore
                ? paragraph.slice(3, paragraph.length - 5)
                : paragraph.slice(3, 200) + '...'}
              {!readMore && (
                <span className="read-more">
                  <Button href className="button" onClick={more}>
                    Read More
                  </Button>
                </span>
              )}
            </div>
            <div className="featured-products">
              <Label className="feat-title">{subHeading}</Label>
              <div className="feat-products">
                {featuredProduct.map((item, i) => {
                  return (
                    <div key={i} className="feat-product">
                      <img
                        className="feat-image"
                        alt=""
                        src={item.imgURL.url}
                      />
                      <Link
                        to={`/${item.productRedirect}`}
                        className="feat-link"
                      >
                        {item.produckSKU}
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className="explore-all">
              <Label className="explore-title">{exploreCatagoryHeading}</Label>
              <div className="explore-links">
                {exploreCatagory.map((item, i) => {
                  return (
                    <Link
                      key={i}
                      to={`${item.catagoryRedirect}`}
                      className="explore-link"
                    >
                      {item.catagory}
                    </Link>
                  )
                })}
              </div>
            </div>
          </>
        </div>
      </div>
    )
  }
  return size[0] > 768 ? (
    <div className="agricultural-page-wrapper">
      <div className="technacil-wriper">
        <div className="custom-tech">
          <IndustryAppTablist
            className="warranty-tablist"
            itemName={activeTablist}
            // categories={categories}
          />
        </div>
        {renderAgriculturePage()}
      </div>
    </div>
  ) : (
    <>
      <div className="custom-tech">
        <IndustryAppMobileTabList
          className="warranty-tablist"
          itemName={activeTablist}
        >
          <div className="agricultural-page-wrapper">
            {renderAgriculturePage()}
          </div>
        </IndustryAppMobileTabList>
      </div>
    </>
  )
}

AgriculturePage.DefaultProps = {
  title: '',
  paragraph: '',
  subHeading: '',
  featuredProduct: [],
  exploreCatagoryHeading: '',
  exploreCatagory: [],
  activeTablist: '',
}

AgriculturePage.propTypes = {
  title: PropTypes.string,
  paragraph: PropTypes.string,
  subHeading: PropTypes.string,
  featuredProduct: PropTypes.array,
  exploreCatagoryHeading: PropTypes.string,
  exploreCatagory: PropTypes.array,
  activeTablist: PropTypes.string,
}

export default AgriculturePage
