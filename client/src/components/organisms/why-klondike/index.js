import './style.scss'
import React from 'react'
import AboutUsTablist from 'components/organisms/about-us-tablist'
import PCPBottom from 'components/organisms/pcpBottom'
import PropTypes from 'prop-types'
import Label from 'components/atoms/label'

import ReactReadMoreReadLess from 'react-read-more-read-less'

import { PcpBottom, aboutUs } from 'libs/data/data'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
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
          {whyKlondikeData &&
            whyKlondikeData.map((item, i) => {
              return (
                <div key={i} className="overview-detail-section">
                  <Label className="details-title">{item.title}</Label>

                  <Label className="details-paragragh">{item.paragragh}</Label>

                  <Label className="details-paragragh">{item.paragragh2}</Label>

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

  // const [size, setSize] = useState(useWindowSize)

  return size[0] > 768 ? (
    <>
      <div className="whyklondike-page-wrapper">
        <WebpagesHeroImages {...aboutUs} />

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
        <div className="technical-bottom">
          <div className="technical-bottom-section">
            {PcpBottom &&
              PcpBottom.map((item, i) => (
                <>
                  <PCPBottom
                    image={item.image}
                    button={item.button}
                    mobileButton={item.mobileButton}
                    url={item.url}
                  />
                </>
              ))}
          </div>
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
