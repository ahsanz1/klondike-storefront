import './style.scss'
import React from 'react'
import PCPBottom from 'components/organisms/pcpBottom'
import { PcpBottom, technicalBanner } from 'libs/data/data'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import Techtabllist from '../Technical-tablist'
import PropTypes from 'prop-types'
import Image from 'components/atoms/image'
import Label from 'components/atoms/label'
import Link from 'components/atoms/link'

const WarrantyPage = ({ categories }) => {
  return (
    <>
      <div className="warranty-page-wrapper">
        <WebpagesHeroImages {...technicalBanner} />

        <div className="technacil-wriper">
          <div className="custom-tech">
            <Techtabllist
              className="warranty-tablist"
              itemName="Warranty"
              categories={categories}
            />
          </div>
          <div className="technical-data">
            <div className="warranty-page-wrap">
              <Label className="warranty-title">Warranty</Label>
              <div className="image-and-text">
                <div className="warranty-image">
                  <Image src="static/images/KL_Warranty_Icon1.png" />
                </div>
                <div className="heading-tech">
                  <Label>
                    In keeping with our goal to produce the highest quality oils
                    and lubricants, we provide warranty on all products bearing
                    the KLONDIKE lubricants brand. To view the KLONDIKE
                    Lubricants Corporation Warranty document, please{' '}
                    <Link className="warranty-link">click here.</Link>
                    <br />
                    <br />
                    <Label className="warranty-refer">
                      For specific warranty details and procedures, please
                      contact us at{' '}
                      <Link className="warranty-link">
                        info@klondikelubricants.com.
                      </Link>
                    </Label>
                  </Label>
                </div>
              </div>
            </div>
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
    </>
  )
}

WarrantyPage.DefaultProps = {
  categories: [],
}

WarrantyPage.propTypes = {
  categories: PropTypes.array,
}

export default WarrantyPage
