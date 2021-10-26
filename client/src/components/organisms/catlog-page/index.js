import React from 'react'
import PCPBottom from 'components/organisms/pcpBottom'
import PropTypes from 'prop-types'
import Techtabllist from 'components/organisms/Technical-tablist'
import './style.scss'
import ReadMoreReact from 'read-more-react'
import { cataogData } from './data'
import { useWindowSize } from 'libs/custom-hooks'
import { technicalBanner, PcpBottom } from 'libs/data/data'
import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
import Link from 'components/atoms/link'
import MobileTabListTech from '../Technical-tablist/mobile-tab'
const Catlogdata = () => {
  const { catData } = cataogData
  const size = useWindowSize()
  return (
    <>
      <div className="catlog-main">
        <div className="catlog-tab"></div>
        <div className="catlog-warp">
          <Label className="catlog-label">Catalog</Label>
          <div className="img-deading">
            <div className="imge-catlog">
              <Image src="/static/images/Catalog.png" />
            </div>
            <div className="heading-catlog">
              {catData.map((data, i) => {
                return size[0] > 768 ? (
                  <> {data.text}</>
                ) : (
                  <>
                    <ReadMoreReact
                      text={data.text}
                      dangerouslySetInnerHTML={{ __html: data.text }}
                      min={150}
                      ideal={300}
                      max={500}
                      readMoreText={data.read}
                    />
                  </>
                )
              })}
              <br />
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

const Catlog = () => {
  const size = useWindowSize()
  // const [size, setSize] = useState(useWindowSize)
  console.log('size', size)
  return size[0] > 768 ? (
    <>
      <WebpagesHeroImages {...technicalBanner} />
      <div className="tech-page-wrapper">
        <div className="technacil-wriper">
          <div className="custom-tech">
            <Techtabllist
              className="catlog-tablist"
              itemName="Catalog"
              // categories={categories}
            />
          </div>
          <Catlogdata />
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
        <MobileTabListTech className="warranty-tablist" itemName="Catalog">
          <div className="tech-page-wrapper">
            <Catlogdata />
          </div>
        </MobileTabListTech>
      </div>
    </>
  )
}
Catlog.propTypes = {
  categories: PropTypes.array,
  itemName: PropTypes.string,
}
export default Catlog
