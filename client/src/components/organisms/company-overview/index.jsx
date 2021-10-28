import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Label from 'components/atoms/label'
// import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
// import PCPBottom from '../pcpBottom'
// import { PcpBottom, aboutUs } from 'libs/data/data'
import { overviewData } from 'components/organisms/company-overview/data'
// import ReactReadMoreReadLess from 'react-read-more-read-less'
import Link from 'components/atoms/link'
import OverViewContent from 'components/organisms/over-view-content'

const OverView = ({ commited }) => {
  const {
    // overviewWrapper,
    aboutUsLinks,
  } = overviewData
  console.log('check overview props:', commited)
  return (
    <>
      <div className="company-overview">
        {/* <WebpagesHeroImages className="Heroimage" {...aboutUs} /> */}

        <div className="company-overview-detail-container">
          <div className="overview-details">
            <Label className="title">Company Overview</Label>
            <OverViewContent />
            {/* {overviewWrapper.map((item, i) => {
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
            })} */}
          </div>
        </div>

        <div className="about-us-links">
          {aboutUsLinks.map((item, i) => {
            return (
              <div key={i} className="about-us-links-item">
                <div className="about-us-links-image">
                  <img className="links-image" src={item.image} alt="" />
                </div>

                <div className="about-us-links-content">
                  <Label className="links-title">{item.title}</Label>

                  <Label className="links-paragraph">{item.paragragh}</Label>

                  <Link
                    className="discover-more"
                    to={`about-klondike/${item.link}`}
                  >
                    Discover More
                    <span className="discover-more-img">
                      <img
                        className="discover-img"
                        alt=""
                        src="static/images/discover-more.png"
                      />
                    </span>
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* <div className="technical-bottom">
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
        </div> */}
      </div>
    </>
  )
}
OverView.propTypes = {
  mainHeading: PropTypes.string,
  commited: PropTypes.array,
}
export default OverView
