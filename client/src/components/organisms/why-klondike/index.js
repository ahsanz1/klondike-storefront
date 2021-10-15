import './style.scss'
import React from 'react'
import AboutUsTablist from 'components/organisms/about-us-tablist'
import PCPBottom from 'components/organisms/pcpBottom'

import Label from 'components/atoms/label'

import { overviewData } from 'components/organisms/company-overview/data'
import ReactReadMoreReadLess from 'react-read-more-read-less'

import { PcpBottom, aboutUs } from 'libs/data/data'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import { useWindowSize } from 'libs/custom-hooks'
import MobileTabList from '../mobile-tablist'

const WhyklondikePage = () => {
  const { whyKlondikeData } = overviewData
  return (
    <div className="why-klondike-wrapper">
      <div className="text-with-video">
        <div className="text">
          <Label className="title">Why Choose KLONDIKE?</Label>
          <Label className="paragraph">
            At KLONDIKE, we understand that reliability, durability, improved
            engine life and up-time are vital to your success. With an in-depth
            understanding of the unique needs and challenges of the lubrication
            world today our premium quality product range of certified packaged
            and bulk oils, greases, industrial lubricants and chemicals are
            designed to optimize performance and provide exceptional value in
            all automotive and heavy duty industries.
          </Label>
        </div>
        <div className="video">
          <iframe
            className="why-klondike-video"
            title="video"
            id="fancybox-frame"
            loading="lazy"
            src="https://player.vimeo.com/video/102849510?"
            frameBorder="0"
            allowFullScreen="allowfullscreen"
          ></iframe>
        </div>
      </div>
      <div className="why-klondike-content">
        {whyKlondikeData.map((item, i) => {
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
    </div>
  )
}
const WhyKlondike = () => {
  const size = useWindowSize()
  // const [size, setSize] = useState(useWindowSize)
  console.log('size', size)
  return size[0] > 768 ? (
    <>
      <div className="whyklondike-page-wrapper">
        <WebpagesHeroImages {...aboutUs} />

        <div className="technacil-wriper">
          <div className="custom-tech">
            <AboutUsTablist
              className="warranty-tablist"
              itemName="Why Choose KLONDIKE?"
              // categories={categories}
            />
          </div>
          <WhyklondikePage />
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
      </div>
    </>
  ) : (
    <>
      <div className="custom-tech">
        <MobileTabList
          className="warranty-tablist"
          itemName="Why Choose KLONDIKE?"
        >
          <div className="whyklondike-page-wrapper">
            <WhyklondikePage />
          </div>
        </MobileTabList>
      </div>
    </>
  )
}

export default WhyKlondike
