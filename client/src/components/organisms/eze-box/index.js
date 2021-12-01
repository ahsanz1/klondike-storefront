import React from 'react'
import PropTypes from 'prop-types'
import AboutUsTablist from 'components/organisms/about-us-tablist'
import Lable from 'components/atoms/label'
import Image from 'components/atoms/image'
import MobileTabList from '../mobile-tablist'
import './style.scss'
import { navigate } from '@reach/router'

const EzeBox = ({
  mainHeading,
  topImage,
  easeDescription,
  benifits,
  whyEze,
  EzePproducts,
}) => {
  console.log('ezebox:', mainHeading)
  return (
    <div className="eze-box">
      <AboutUsTablist className="warranty-tablist desktop" itemName="EZE-BOX" />
      <div className="benefits-section desk-bene">
        <div className="benefits">
          <div className="benefits-image">
            <Lable className="eze-heading">{mainHeading}</Lable>
            <div className="img-section">
              <Image src={topImage.url} alt={topImage.altText} />
            </div>
          </div>
          <div className="benefits-content">
            <Lable>{easeDescription}</Lable>
            {benifits?.map(row => (
              <>
                <div className="benefits-heading">{row.heading}</div>
                <div className="benefits-desc">
                  {row.desc.map((item, i) => (
                    <>
                      <div>
                        <span className="first">{item.heading[0]}</span>
                        <span>
                          {item.heading.slice(1, item.heading.length)}
                        </span>
                      </div>
                      <Lable>{item.description}</Lable>
                    </>
                  ))}
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="why-eze">
          {whyEze?.map(ezeItem => (
            <>
              <div className="why-heading">{ezeItem.heading}</div>
              <ol>
                {ezeItem?.desc?.map((item, i) => (
                  <li key={i}>
                    <div>{item.heading}</div>
                    <Lable>{item.description}</Lable>
                  </li>
                ))}
              </ol>
            </>
          ))}
        </div>
        <div className="eze-products">
          {EzePproducts?.map(productItem => (
            <>
              <div className="products-heading">{productItem.heading}</div>
              {productItem?.productlist?.map((item, i) => (
                <>
                  <div className="sub-heading">{item.subHeading}</div>
                  <div className="product-collection">
                    {item.product?.map((data, i) => (
                      <>
                        <div className="product-set" key={i}>
                          <li>
                            <div className="product-image-section">
                              <Image
                                src={data && data.image.url}
                                alt="alt"
                                onClick={() => navigate('/PDP')}
                              />
                            </div>
                            <div className="name notranslate">{data?.name}</div>
                          </li>
                        </div>
                      </>
                    ))}
                  </div>
                </>
              ))}
            </>
          ))}
        </div>
      </div>
      <div className="custom-tech">
        <MobileTabList className="warranty-tablist" itemName="EZE-BOX">
          <div className="our-story-page-wrapper">
            <div className="benefits-section ">
              <div className="benefits">
                <div className="benefits-image">
                  <Lable className="eze-heading">{mainHeading}</Lable>
                  <div className="img-section">
                    <Image src={topImage.url} alt={topImage.altText} />
                  </div>
                </div>
                <div className="benefits-content">
                  <Lable>{easeDescription}</Lable>
                  {benifits?.map(row => (
                    <>
                      <div className="benefits-heading">{row.heading}</div>
                      <div className="benefits-desc">
                        {row.desc.map((item, i) => (
                          <>
                            <div>
                              <span className="first">{item.heading[0]}</span>
                              <span className="remaining-heading">
                                {item.heading.slice(1, item.heading.length)}
                              </span>
                            </div>
                            <Lable>{item.description}</Lable>
                          </>
                        ))}
                      </div>
                    </>
                  ))}
                </div>
              </div>
              <div className="why-eze">
                {whyEze?.map(ezeItem => (
                  <>
                    <div className="why-heading">{ezeItem.heading}</div>
                    <ol>
                      {ezeItem?.desc?.map((item, i) => (
                        <li key={i}>
                          <div>{item.heading}</div>
                          <Lable>{item.description}</Lable>
                        </li>
                      ))}
                    </ol>
                  </>
                ))}
              </div>
              <div className="eze-products">
                {EzePproducts?.map(productItem => (
                  <>
                    <div className="products-heading">
                      {productItem.heading}
                    </div>
                    {productItem?.productlist?.map((item, i) => (
                      <>
                        <div className="sub-heading">{item.subHeading}</div>
                        <div className="product-collection">
                          {item.product?.map((data, i) => (
                            <>
                              <div className="product-set" key={i}>
                                <li>
                                  <div className="product-image-section">
                                    <Image
                                      src={data && data.image.url}
                                      alt="alt"
                                      onClick={() => navigate('/PDP')}
                                    />
                                  </div>
                                  <div className="name notranslate">
                                    {data?.name}
                                  </div>
                                </li>
                              </div>
                            </>
                          ))}
                        </div>
                      </>
                    ))}
                  </>
                ))}
              </div>
            </div>
          </div>
        </MobileTabList>
      </div>
    </div>
  )
}
EzeBox.propTypes = {
  mainHeading: PropTypes.string,
  easeDescription: PropTypes.string,
  topImage: PropTypes.object,
  benifits: PropTypes.object,
  whyEze: PropTypes.object,
  EzePproducts: PropTypes.object,
}
export default EzeBox
