import React from 'react'
import Label from 'components/atoms/label'
import ReactReadMoreReadLess from 'react-read-more-read-less'
import './style.scss'

const overViewContent = ({ mainHeading, overviewWrapper }) => {
  console.log('check naaa...', overviewWrapper)
  return (
    <>
      <div className="company-overview">
        <div className="company-overview-detail-container">
          <div className="overview-details">
            <Label className="title">{mainHeading}</Label>
            {overviewWrapper?.map((item, i) => {
              return (
                <div key={i} className="overview-detail-section">
                  <Label className="details-title">{item.subHeading}</Label>
                  {item.subSection.map((data, i) => (
                    <>
                      <Label className="details-paragragh" key={i}>
                        {data.paragraph.slice(3, data.paragraph.length - 5)}
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
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
export default overViewContent
