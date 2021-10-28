import React from 'react'
// import Label from 'components/atoms/label'
// import Link from 'components/atoms/link'
import './style.scss'

const OverViewLinks = () => {
  return (
    <div className="company-overview">
      <div className="about-us-links">
        {/* {aboutUsLinks?.map((item, i) => {
          return (
            <div key={i} className="about-us-links-item">
              <div className="about-us-links-image">
                <img className="links-image" src={item.image} alt="" />
              </div>

              <div className="about-us-links-content">
                <Label className="links-title">{item.title}</Label>

                <Label className="links-paragraph">{item.paragragh}</Label>

                <Link
                  className="discover-more"
                  to={`about-klondike/${item.link}`}
                >
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
        })} */}
      </div>
    </div>
  )
}
export default OverViewLinks
