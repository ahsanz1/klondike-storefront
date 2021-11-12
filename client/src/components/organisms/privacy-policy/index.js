import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// import Privacy from '../../molecules/privacy-policy'
import Button from 'components/atoms/button'

const PrivacyPolicy = ({ heading, subheading, paragraph, policyList }) => {
  const [readMore, setReadMore] = React.useState(false)
  const more = () => {
    setReadMore(!readMore)
  }
  return (
    <div className="PrivacyPolicy-wrapper">
      <div className="PrivacyPolicy-container">
        <div className="privacy-body">
          <p className="main-heading">{heading}</p>
          <p className="sub-heading">{subheading}</p>
          {paragraph.length > 0 &&
            paragraph.map((data, i) => {
              return <p key={i}>{data.paragraphs}</p>
            })}

          {policyList.length > 0 &&
            policyList.map((policy, i) => {
              return (
                <div key={i}>
                  <p className="main-heading">{policy.heading}</p>
                  <p
                    className="privacy-main-data"
                    dangerouslySetInnerHTML={{ __html: policy.data }}
                  ></p>
                  <div className="privacy-body-mobile">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: readMore
                          ? policy.data.slice(3, policy.data.length - 5)
                          : policy.data.slice(3, 450),
                      }}
                    ></p>

                    {policy.data.length > 540 && (
                      <span className={readMore ? 'read-less' : 'read-more'}>
                        <Button href className="button" onClick={more}>
                          {readMore ? 'Read Less' : 'Read More'}
                        </Button>
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
        {/* //----- */}
      </div>
    </div>
  )
}

PrivacyPolicy.defaultProps = {
  policyList: [],
  heading: '',
  subheading: '',
  paragraph: [],
}

PrivacyPolicy.propTypes = {
  policyList: PropTypes.array,
  heading: PropTypes.string,
  subheading: PropTypes.string,
  paragraph: PropTypes.array,
}
export default PrivacyPolicy
