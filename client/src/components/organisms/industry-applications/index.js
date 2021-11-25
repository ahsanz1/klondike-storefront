import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './style.scss'
import Label from 'components/atoms/label'
import Button from 'components/atoms/button'

const IndustryApplications = ({ heading, text, videourl, paragraph }) => {
  // const { IndustryApplicationsWrapper, aboutUsLinks } = IndustryApplicationsData

  const [readMore, setReadMore] = useState(false)
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
                <p
                  dangerouslySetInnerHTML={{
                    __html: readMore
                      ? text.slice(0, text.length)
                      : text.slice(0, 550),
                  }}
                ></p>
                <p
                  dangerouslySetInnerHTML={{
                    __html: readMore
                      ? paragraph.slice(0, paragraph.length)
                      : paragraph.slice(250, 250),
                  }}
                ></p>
                {text.length > 300 && (
                  <span className={readMore ? 'read-less' : 'read-more'}>
                    <Button
                      href
                      className="button"
                      onClick={() => {
                        setReadMore(!readMore)
                      }}
                    >
                      {readMore ? 'Read Less' : 'Read More'}
                    </Button>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
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
