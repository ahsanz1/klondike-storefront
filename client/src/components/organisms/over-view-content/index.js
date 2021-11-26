import React, { useState } from 'react'
import Label from 'components/atoms/label'
import PropTypes from 'prop-types'
import './style.scss'

const OverViewContent = ({ mainHeading, overviewWrapper }) => {
  const [readMore, setReadMore] = useState('')
  const more = name => {
    console.log('more name:', name)
    setReadMore(name)
  }
  return (
    <>
      <div className="company-overview">
        <div className="company-overview-detail-container">
          <div className="overview-details">
            {mainHeading && <Label className="title">{mainHeading}</Label>}
            {overviewWrapper.length > 0 &&
              overviewWrapper.map((item, i) => {
                return (
                  <div key={i} className="overview-detail-section">
                    {item.subHeading && (
                      <Label className="details-title">{item.subHeading}</Label>
                    )}
                    {item.subSection.length > 0 &&
                      item.subSection.map((data, i) => (
                        <>
                          {data.paragraph && (
                            <Label className="details-paragragh" key={i}>
                              {data.paragraph.slice(
                                3,
                                data.paragraph.length - 5,
                              )}
                            </Label>
                          )}
                        </>
                      ))}
                    <div className="overview-detail-section-mobile">
                      {readMore === item.subHeading
                        ? item.subSection.length > 0 &&
                          item.subSection.map((data, i) => (
                            <>
                              {data.paragraph && (
                                <Label
                                  className="details-paragragh-mobile"
                                  key={i}
                                >
                                  {data.paragraph.slice(
                                    3,
                                    data.paragraph.length - 5,
                                  )}
                                </Label>
                              )}
                            </>
                            // eslint-disable-next-line indent
                          ))
                        : item.subSection[0].paragraph.slice(3, 200) + '...'}
                    </div>
                    {readMore !== item.subHeading && (
                      <button
                        className="read-more"
                        onClick={() => more(item.subHeading)}
                      >
                        Read more
                      </button>
                    )}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}
OverViewContent.propTypes = {
  overviewWrapper: PropTypes.array,
  mainHeading: PropTypes.string,
}
export default OverViewContent
