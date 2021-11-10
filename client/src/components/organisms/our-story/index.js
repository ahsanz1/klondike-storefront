import './style.scss'
import React from 'react'
import AboutUsTablist from 'components/organisms/about-us-tablist'
import Label from 'components/atoms/label'
import PropTypes from 'prop-types'
import { useWindowSize } from 'libs/custom-hooks'
import ReactReadMoreReadLess from 'react-read-more-read-less'
import MobileTabList from '../mobile-tablist'
import { useLocation } from '@reach/router'

const OurStory = ({ OurStoryData, activeTablist }) => {
  const size = useWindowSize()
  const location = useLocation()
  const renderOurStoryPage = () => {
    return (
      <div className="our-story-wrapper">
        {OurStoryData.map((item, i) => {
          return (
            <div key={i}>
              <Label className="title">{item.title}</Label>
              <div className="our-story-content">
                {item.subSection.map((data, i) => (
                  <>
                    <p
                      className={`paragraph ${location.pathname ===
                        '/about-klondike/safety-environment' &&
                        'safety-paragraph'}`}
                      key={i}
                      dangerouslySetInnerHTML={{ __html: data.paragraph }}
                    ></p>
                    <p
                      className="highlighted-paragraph"
                      dangerouslySetInnerHTML={{
                        __html: data.highlightedParagraph,
                      }}
                    ></p>

                    <div className="overview-detail-section-mobile">
                      <ReactReadMoreReadLess
                        charLimit={200}
                        readMoreText={'Read more'}
                        readLessText={'Read less'}
                        readMoreClassName="read-more-less--more  details-paragragh-mobile"
                        readLessClassName="read-more-less--less  details-paragragh-mobile"
                      >
                        {data.paragraph.slice(3, data.paragraph.length - 5)}
                      </ReactReadMoreReadLess>
                    </div>
                  </>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
  return size[0] > 768 ? (
    <div className="our-story-page-wrapper">
      <div className="technacil-wriper">
        <div className="custom-tech">
          <AboutUsTablist
            className="warranty-tablist"
            itemName={activeTablist}
            // categories={categories}
          />
        </div>
        {renderOurStoryPage()}
      </div>
    </div>
  ) : (
    <>
      <div className="custom-tech">
        <MobileTabList className="warranty-tablist" itemName={activeTablist}>
          <div className="our-story-page-wrapper">{renderOurStoryPage()}</div>
        </MobileTabList>
      </div>
    </>
  )
}

OurStory.DefaultProps = {
  OurStoryData: [],
  activeTablist: '',
}

OurStory.propTypes = {
  OurStoryData: PropTypes.array,
  activeTablist: PropTypes.string,
}

export default OurStory
