import React from 'react'
import './style.scss'
import Label from 'components/atoms/label'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import PCPBottom from '../pcpBottom'
import { PcpBottom, aboutUs } from 'libs/data/data'
import { IndustryApplicationsData } from 'components/organisms/industry-applications/data'
import ReactReadMoreReadLess from 'react-read-more-read-less'
import Link from 'components/atoms/link'

const IndustryApplications = () => {
  const { IndustryApplicationsWrapper, aboutUsLinks } = IndustryApplicationsData

  return (
    <>
      <div className="industry-applications">
        <WebpagesHeroImages className="Heroimage" {...aboutUs} />

        <div className="company-overview-detail-container">
          <div className="overview-details">
            {IndustryApplicationsWrapper.map((item, i) => {
              return (
                <div key={i} className="overview-detail-section">
                  <div className="overview-video-and-detail-section">
                    <div>
                      <Label className="title">Industry Applications</Label>

                      <Label className="details-paragragh">
                        {item.paragragh}
                      </Label>
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
                  />
                </>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default IndustryApplications
