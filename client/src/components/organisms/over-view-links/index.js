import React from 'react'
import PropTypes from 'prop-types'
// import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import './style.scss'

const OverViewLinks = ({ aboutUsLinks }) => {
  console.log('check link overview', aboutUsLinks)
  return (
    <div className="company-overview">
      <div className="about-us-links">
        {aboutUsLinks?.map((item, i) => {
          return (
            <div key={i} className="about-us-links-item">
              <div className="about-us-links-image">
                <img className="links-image" src={item.image.url} alt="" />
              </div>

              <div className="about-us-links-content">
                <Link className="links-title" to={item.titleLinks}>
                  {item.title}
                </Link>

                <p
                  className="links-paragraph"
                  dangerouslySetInnerHTML={{
                    __html: item.paragraph,
                  }}
                ></p>

                <Link
                  className="discover-more"
                  to={item.buttonLinks}
                  //   to={`about-klondike/${item.redirectUrl}`}
                >
                  {item.buttonText}
                  <span className="discover-more-img">
                    <img
                      className="discover-img"
                      alt=""
                      src={item.buttonImage.url}
                    />
                  </span>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
OverViewLinks.propTypes = {
  aboutUsLinks: PropTypes.array,
}
export default OverViewLinks
