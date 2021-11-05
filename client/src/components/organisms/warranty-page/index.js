import './style.scss'
import React from 'react'

import Techtabllist from '../Technical-tablist'
import PropTypes from 'prop-types'
import Image from 'components/atoms/image'
import MobileTabListTech from '../Technical-tablist/mobile-tab'
import Label from 'components/atoms/label'
// import Link from 'components/atoms/link'
import { useWindowSize } from 'libs/custom-hooks'
const WarrantyPage = ({ heading, warData, image }) => {
  const size = useWindowSize()
  const renderWarrantyPage = () => {
    return (
      <>
        <div className="warranty-page-wrapper">
          <div className="technacil-wriper">
            <div className="technical-data">
              <div className="warranty-page-wrap">
                <Label className="warranty-title">{heading}</Label>
                <div className="image-and-text">
                  <div className="warranty-image">
                    <Image src={image.url} alt={image.alt} />
                  </div>
                  <div className="heading-tech">
                    <Label>
                      {warData &&
                        warData.map((data, i) => {
                          return (
                            <>
                              <p
                                dangerouslySetInnerHTML={{ __html: data.text }}
                              ></p>
                              {/* <Link
                                className="warranty-link"
                                to="https://klondikelubricants.com/wp-content/uploads/2015/05/KLONDIKE_Lubricants_Corporation_Warranty.pdf"
                              >
                                click here.
                              </Link> */}
                            </>
                          )
                        })}
                      <br />
                      {/* <Label className="warranty-refer">
                        For specific warranty details and procedures, please
                        contact us at{' '}
                        <Link className="warranty-link">
                          info@klondikelubricants.com.
                        </Link>
                      </Label> */}
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
  return size[0] > 768 ? (
    <>
      <div className="warranty-page-wrapper">
        <div className="technacil-wriper">
          <div className="custom-tech">
            <Techtabllist
              className="catlog-tablist"
              itemName="Warranty"
              // categories={categories}
            />
          </div>
          {renderWarrantyPage()}
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="custom-tech">
        <MobileTabListTech className="warranty-tablist" itemName="Warranty">
          <div className="tech-page-wrapper">{renderWarrantyPage()}</div>
        </MobileTabListTech>
      </div>
    </>
  )
}

WarrantyPage.DefaultProps = {
  categories: [],
}

WarrantyPage.propTypes = {
  categories: PropTypes.array,
  heading: PropTypes.string,
  image: PropTypes.string,
  warData: PropTypes.object,
  pcpBottom: PropTypes.array,
}

export default WarrantyPage
