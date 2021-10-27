import React from 'react'
import PropTypes from 'prop-types'
import './style.scss'
// import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
// import { PcpBottom, techresource } from 'libs/data/data'
import Label from 'components/atoms/label'
// import PCPBottom from 'components/organisms/pcpBottom'
import Image from 'components/atoms/image'
const Dealership = ({ oppertunity, heading }) => {
  return (
    <>
      <div className="Dealership-wraper">
        {/* <WebpagesHeroImages {...techresource} /> */}
        <Image className="banner-img" src="/static/images/you.png" />
        <div className="Dealership-heading">
          <Label>{heading}</Label>
        </div>
        <div className="description">
          {oppertunity.map((data, i) => {
            console.log(data, 'data')
            return (
              <p key={i} dangerouslySetInnerHTML={{ __html: data.title }}></p>
            )
          })}
        </div>
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
    </>
  )
}

Dealership.propTypes = {
  oppertunity: PropTypes.object,
  heading: PropTypes.string,
}
export default Dealership
