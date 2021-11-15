import './style.scss'
import React from 'react'
import AboutUsTablist from 'components/organisms/about-us-tablist'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'
import ReactReadMoreReadLess from 'react-read-more-read-less'
import { useWindowSize } from 'libs/custom-hooks'
import MobileTabList from '../mobile-tablist'
const WhyKlondike = ({ whyKlondikeData, heading, paragragh }) => {
  const size = useWindowSize()
  const renderWhyklondikePage = () => {
    return (
      <div className="why-klondike-wrapper">
        <div className="text-with-video">
          <div className="text">
            <Label className="title">{heading}</Label>
            <Label className="paragraph">{paragragh}</Label>
          </div>
          <div className="video">
            <iframe
              className="why-klondike-video"
              title="video"
              id="fancybox-frame"
              loading="lazy"
              src="https://player.vimeo.com/video/102849510?"
              frameBorder="0"
              allowFullScreen="allowfullscreen"
            ></iframe>
          </div>
        </div>
        <div className="why-klondike-content">
          {whyKlondikeData.length > 0 &&
            whyKlondikeData.map((item, i) => {
              return (
                <div key={i} className="overview-detail-section">
                  <Label className="details-title">{item.title}</Label>

                  {item.paragragh && (
                    <Label className="details-paragragh">
                      {item.paragragh}
                    </Label>
                  )}

                  {item.paragragh2 && (
                    <Label className="details-paragragh">
                      {item.paragragh2}
                    </Label>
                  )}

                  <div className="overview-detail-section-mobile">
                    <ReactReadMoreReadLess
                      charLimit={200}
                      readMoreText={'Read more'}
                      readLessText={'Read less'}
                      readMoreClassName="read-more-less--more  details-paragragh-mobile"
                      readLessClassName="read-more-less--less  details-paragragh-mobile"
                    >
                      {item.paragragh + item.paragragh2}
                    </ReactReadMoreReadLess>
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    )
  }

  return size[0] > 768 ? (
    <>
      <div className="whyklondike-page-wrapper">
        <div className="technacil-wriper">
          <div className="custom-tech">
            <AboutUsTablist
              className="warranty-tablist"
              itemName="Why Choose KLONDIKE?"
              // categories={categories}
            />
          </div>
          {renderWhyklondikePage()}
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="custom-tech">
        <MobileTabList
          className="warranty-tablist"
          itemName="Why Choose KLONDIKE?"
        >
          <div className="whyklondike-page-wrapper">
            {renderWhyklondikePage()}
          </div>
        </MobileTabList>
      </div>
    </>
  )
}
WhyKlondike.propTypes = {
  whyKlondikeData: PropTypes.object,
  heading: PropTypes.string,
  paragragh: PropTypes.string,
}
export default WhyKlondike
