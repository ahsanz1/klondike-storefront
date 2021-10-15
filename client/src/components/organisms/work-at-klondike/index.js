import './style.scss'
import React from 'react'
import AboutUsTablist from 'components/organisms/about-us-tablist'
import PCPBottom from 'components/organisms/pcpBottom'

import Label from 'components/atoms/label'

import { overviewData } from 'components/organisms/company-overview/data'
import { PcpBottom, technicalBanner } from 'libs/data/data'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'

const WorkAtKlonedike = () => {
  const { workAtKlondikeData } = overviewData
  return (
    <div className="work-at-klondike-page-wrapper">
      <WebpagesHeroImages {...technicalBanner} />

      <div className="technacil-wriper">
        <div className="custom-tech">
          <AboutUsTablist
            className="warranty-tablist"
            itemName="Why Choose KLONDIKE?"
            // categories={categories}
          />
        </div>
        <div className="work-at-klondike-wrapper">
          {workAtKlondikeData.map((item, i) => {
            return (
              <div key={i} className="work-at-klondike-content">
                <Label className="title">{item.title}</Label>
                <Label className="paragraph">{item.paragraph}</Label>
                <Label className="paragraph more">{item.paragraph}</Label>
              </div>
            )
          })}
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
    </div>
  )
}

export default WorkAtKlonedike
