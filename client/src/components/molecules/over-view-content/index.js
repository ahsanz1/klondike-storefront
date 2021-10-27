import React from 'react'
import Label from 'components/atoms/label'
import ReactReadMoreReadLess from 'react-read-more-read-less'

const overViewContent = ({ overviewWrapper }) => {
  return (
    <div>
      {overviewWrapper.map((item, i) => {
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
  )
}
export default overViewContent
