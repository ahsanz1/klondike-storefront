import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Label from 'components/atoms/label'
// import { IndustryApplicationsData } from 'components/organisms/industry-applications/data'
import ReactReadMoreReadLess from 'react-read-more-read-less'
// import Link from 'components/atoms/link'

const IndustryApplications = ({ heading, text, videourl, paragraph }) => {
  // const { IndustryApplicationsWrapper, aboutUsLinks } = IndustryApplicationsData
  console.log(videourl, 'videourl')

  return (
    <>
      <div className="industry-applications">
        <div className="company-overview-detail-container">
          <div className="overview-details">
            <div className="overview-detail-section">
              <div className="overview-video-and-detail-section">
                <div>
                  <Label className="title">{heading}</Label>
                  <Label className="details-paragragh">{text}</Label>
                </div>
                <div className="industry-video">
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

              <Label className="details-paragragh2">{paragraph}</Label>

              <div className="overview-detail-section-mobile">
                <ReactReadMoreReadLess
                  charLimit={200}
                  readMoreText={'Read more'}
                  readLessText={'Read less'}
                  readMoreClassName="read-more-less--more  details-paragragh-mobile"
                  readLessClassName="read-more-less--less  details-paragragh-mobile"
                >
                  {paragraph}
                </ReactReadMoreReadLess>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="about-us-links">
          {aboutUsLinks.map((item, i) => {
            return (
              <div key={i} className="about-us-links-item">
                <div className="about-us-links-image">
                  <img className="links-image" src={item.image} alt="" />
                </div>

                <div className="about-us-links-content">
                  <Label className="links-title">{item.title}</Label>

                  <Label className="links-paragraph">{item.paragragh}</Label>

                  <Link className="discover-more">
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
        </div> */}
      </div>
    </>
  )
}

IndustryApplications.propTypes = {
  text: PropTypes.string,
  heading: PropTypes.string,
  paragraph: PropTypes.string,
  videourl: PropTypes.string,
}

export default IndustryApplications
