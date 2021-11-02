import './style.scss'
import React from 'react'
import AboutUsTablist from 'components/organisms/about-us-tablist'
import Label from 'components/atoms/label'
import PropTypes from 'prop-types'
import { useWindowSize } from 'libs/custom-hooks'
import ReactReadMoreReadLess from 'react-read-more-read-less'
import MobileTabList from '../mobile-tablist'

const OurStory = ({ OurStoryData }) => {
  const size = useWindowSize()
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
                    {/* <Label className="details-paragragh" key={i}>
                      {data.paragraph.slice(3, data.paragraph.length - 5)}
                    </Label> */}
                    <p
                      className="details-paragragh"
                      key={i}
                      dangerouslySetInnerHTML={{ __html: data.paragraph }}
                    ></p>
                    <Label className="highlighted-paragraph">
                      {item.highlightedParagraph}
                    </Label>
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
            itemName="Our Story"
            // categories={categories}
          />
        </div>
        {renderOurStoryPage()}
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
  ) : (
    <>
      <div className="custom-tech">
        <MobileTabList className="warranty-tablist" itemName="Our Story">
          <div className="our-story-page-wrapper">{renderOurStoryPage()}</div>
        </MobileTabList>
      </div>
    </>
  )
}

OurStory.DefaultProps = {
  OurStoryData: [],
}

OurStory.propTypes = {
  OurStoryData: PropTypes.array,
}

export default OurStory
