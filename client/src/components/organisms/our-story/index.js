import './style.scss'
import React, { useState } from 'react'
import AboutUsTablist from 'components/organisms/about-us-tablist'
import Button from 'components/atoms/button'
import Label from 'components/atoms/label'
import PropTypes from 'prop-types'
import { useWindowSize } from 'libs/custom-hooks'
import MobileTabList from '../mobile-tablist'
import { useLocation } from '@reach/router'

const OurStory = ({ OurStoryData, activeTablist }) => {
  const size = useWindowSize()
  const location = useLocation()
  const [readMore, setReadMore] = useState(false)
  const renderOurStoryPage = () => {
    const more = () => {
      setReadMore(!readMore)
    }
    return (
      <div className="our-story-wrapper">
        {OurStoryData.map((item, i) => {
          return (
            <div
              className={`safety-para ${location.pathname ===
                '/about-klondike/safety-environment' && 'safety-para'}`}
              key={i}
            >
              <Label className="title">{item.title}</Label>
              {item.subSection.map((data, i) => (
                <div key={i} className="our-story-content">
                  <>
                    <p
                      className={`paragraph ${location.pathname ===
                        '/about-klondike/safety-environment' &&
                        'safety-paragraph'}`}
                      dangerouslySetInnerHTML={{ __html: data.paragraph }}
                    ></p>
                    <p
                      className="highlighted-paragraph"
                      dangerouslySetInnerHTML={{
                        __html: data.highlightedParagraph,
                      }}
                    ></p>

                    <div className="overview-detail-section-mobile">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: readMore
                            ? data.paragraph.slice(3, data.paragraph.length)
                            : data.paragraph.slice(3, 535),
                        }}
                      ></p>
                      {data.paragraph.length > 540 && (
                        <span className={readMore ? 'read-less' : 'read-more'}>
                          <Button href className="button" onClick={more}>
                            {readMore ? 'Read Less' : 'Read More'}
                          </Button>
                        </span>
                      )}

                      <p
                        className="highlighted-paragraph-mobile"
                        dangerouslySetInnerHTML={{
                          __html: data.highlightedParagraph,
                        }}
                      ></p>
                    </div>
                  </>
                </div>
              ))}
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
