import './style.scss'
import React from 'react'
import AboutUsTablist from 'components/organisms/about-us-tablist'
import PCPBottom from 'components/organisms/pcpBottom'

import Label from 'components/atoms/label'

import { overviewData } from 'components/organisms/company-overview/data'
import { PcpBottom, technicalBanner } from 'libs/data/data'
import { useWindowSize } from 'libs/custom-hooks'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import ReactReadMoreReadLess from 'react-read-more-read-less'
import MobileTabList from '../mobile-tablist'

const OurStoryPage = () => {
  const { OurStoryData } = overviewData
  return (
    <div className="our-story-wrapper">
      {OurStoryData.map((item, i) => {
        return (
          <div key={i}>
            <Label className="title">{item.title}</Label>
            <div className="our-story-content">
              <Label className="paragraph">{item.paragraph}</Label>
              <Label className="paragraph more">{item.paragraph2}</Label>
              <Label className="paragraph more">{item.paragraph3}</Label>
              <Label className="paragraph more">{item.paragraph4}</Label>
              <Label className="highlighted-paragraph">
                {item.highlightedParagraph}
              </Label>
            </div>

            <div className="overview-detail-section-mobile">
              <ReactReadMoreReadLess
                charLimit={200}
                readMoreText={'Read more'}
                readLessText={'Read less'}
                readMoreClassName="read-more-less--more  details-paragragh-mobile"
                readLessClassName="read-more-less--less  details-paragragh-mobile"
              >
                {item.paragraph +
                  item.paragraph2 +
                  item.paragraph3 +
                  item.paragraph4}
              </ReactReadMoreReadLess>
              <Label className="highlighted-paragraph">
                {item.highlightedParagraph}
              </Label>
            </div>
          </div>
        )
      })}
    </div>
  )
}

const OurStory = () => {
  const size = useWindowSize()
  return size[0] > 768 ? (
    <div className="our-story-page-wrapper">
      <WebpagesHeroImages {...technicalBanner} />

      <div className="technacil-wriper">
        <div className="custom-tech">
          <AboutUsTablist
            className="warranty-tablist"
            itemName="Our Story"
            // categories={categories}
          />
        </div>
        <OurStoryPage />
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
  ) : (
    <>
      <div className="custom-tech">
        <MobileTabList className="warranty-tablist" itemName="Our Story">
          <div className="our-story-page-wrapper">
            <OurStoryPage />
          </div>
        </MobileTabList>
      </div>
    </>
  )
}

export default OurStory
