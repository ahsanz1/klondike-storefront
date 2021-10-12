import React from 'react'
import PropTypes from 'prop-types'
import Techtabllist from 'components/organisms/Technical-tablist'
import './style.scss'
import { technicalBanner } from 'libs/data/data'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import Link from 'components/atoms/link'
const Catlog = ({ categories }) => {
  return (
    <>
      <WebpagesHeroImages {...technicalBanner} />
      <div className="catlog-main">
        <div className="catlog-tab">
          <Techtabllist categories={categories} itemName="Catlog" />
        </div>
        <div className="catlog-warp">
          <Label className="catlog-label">Catalog</Label>
          <div className="img-deading">
            <div className="imge-catlog">
              <Image src="static/images/Catalogue.png" />
            </div>
            <div className="heading-catlog">
              KLONDIKE has a comprehensive range of 530 oils and greases
              covering 9 product categories and 15 package sizes. We designed
              our new catalog to make the process of going through this
              extensive product range and finding the right lubricant easy and
              efficient for you, our customer and partner! The new KLONDIKE
              catalog features all our SKUs organized by product and product
              category. You will also find package sizes, part numbers, OEM
              approvals, industry applications, warranty and cross reference
              documents. <br />
              <br />
              Download an electronic copy of the
              <Link className="english-link"> ENGLISH catalog </Link>
              or the<Link className="english-link"> FRENCH catalog.</Link>
              <br />
              <br />
              Request your free printed catalog at
              <Link className="english-link">
                {' '}
                info@klondikelubricants.com{' '}
              </Link>
              now!
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
Catlog.propTypes = {
  categories: PropTypes.array,
}
export default Catlog
