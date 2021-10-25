import React from 'react'
import './style.scss'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import { PcpBottom, techresource } from 'libs/data/data'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'
import PCPBottom from 'components/organisms/pcpBottom'
import Image from 'components/atoms/image'
const Dealership = () => {
  return (
    <>
      <div className="Dealership-wraper">
        <WebpagesHeroImages {...techresource} />
        <Image className="banner-img" src="/static/images/you.png" />
        <div className="Dealership-heading">
          <Label>Dealership Opportunity</Label>
        </div>
        <div className="description">
          At KLONDIKE, our strengths are in our people and the commitment to our
          customers. We take a collaborative approach with our dealers, staying
          engaged with them and responsive to demands within their industry. We
          are there every step of the way by providing proactive on-the-ground
          support and tailored marketing solutions for each specific market.
          <br />
          <br />
          Empower your independence in your marketplace with our unique business
          opportunity. Designed to enable you to gain immediate access to your
          key markets and build a highly profitable business with market leading
          customer retention. <br />
          <br /> We are currently seeking distribution partners in key regions
          of North America. If you feel you are the right company to represent
          our fast-growing brand and extensive line of oils, lubricants and
          chemicals,
          <Link className="link-contact" to="/contact-us">
            {' '}
            Contact Us{' '}
          </Link>{' '}
          to find out how to join our dealer network.
        </div>
      </div>
      <div className="technical-bottom">
        <div className="technical-bottom-section">
          {PcpBottom &&
            PcpBottom.map((item, i) => (
              <>
                <PCPBottom
                  image={item.image}
                  button={item.button}
                  mobileButton={item.mobileButton}
                />
              </>
            ))}
        </div>
      </div>
    </>
  )
}

export default Dealership
