import React from 'react'

import PropTypes from 'prop-types'
import Techtabllist from 'components/organisms/Technical-tablist'
import './style.scss'
import ReadMoreReact from 'read-more-react'
// import { cataogData } from './data'
import { useWindowSize } from 'libs/custom-hooks'

import Label from 'components/atoms/label'
import Image from 'components/atoms/image'
// import Link from 'components/atoms/link'
import MobileTabListTech from '../Technical-tablist/mobile-tab'
// const Catlogdata = ({ cataogData }) => {
//   const { catData } = cataogData
//   const size = useWindowSize()
//   return (
//     <>
//       <div className="catlog-main">
//         <div className="catlog-tab"></div>
//         <div className="catlog-warp">
//           <Label className="catlog-label">{heading}</Label>
//           <div className="img-deading">
//             <div className="imge-catlog">
//               <Image src="/static/images/Catalog.png" />
//             </div>
//             <div className="heading-catlog">
//               {catData.map((data, i) => {
//                 return size[0] > 768 ? (
//                   <> {data.text}</>
//                 ) : (
//                   <>
//                     <ReadMoreReact
//                       text={data.text}
//                       dangerouslySetInnerHTML={{ __html: data.text }}
//                       min={150}
//                       ideal={300}
//                       max={500}
//                       readMoreText={data.read}
//                     />
//                   </>
//                 )
//               })}
//               <br />
//               <br />
//               Download an electronic copy of the
//               <Link className="english-link"> ENGLISH catalog </Link>
//               or the<Link className="english-link"> FRENCH catalog.</Link>
//               <br />
//               <br />
//               Request your free printed catalog at
//               <Link className="english-link">info@klondikelubricants.com</Link>
//               now!
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

const Catlog = ({ heading, catData, image }) => {
  // console.log('zdfgsdf',cataogData)
  const size = useWindowSize()

  const renderCatlogdata = () => {
    return (
      <>
        <div className="catlog-main">
          <div className="catlog-tab"></div>
          <div className="catlog-warp">
            <Label className="catlog-label">{heading}</Label>
            <div className="img-deading">
              <div className="imge-catlog">
                <Image src={image.url} alt={image.alt} />
              </div>
              <div className="heading-catlog">
                {catData &&
                  catData.map((data, i) => {
                    return size[0] > 768 ? (
                      <p dangerouslySetInnerHTML={{ __html: data.text }}></p>
                    ) : (
                      <>
                        <ReadMoreReact
                          text={data.mobileText}
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
                {/* Download an electronic copy of the
                <Link
                  className="english-link"
                  to="https://klondikelubricants.com/wp-content/uploads/2021/07/2021.06.01_KLONDIKE-Catalogue-Spring_Summer-2021-Edition_English_website.pdf"
                >
                  ENGLISH catalog
                </Link>
                or the
                <Link
                  className="english-link"
                  to="https://klondikelubricants.com/wp-content/uploads/2021/07/2021.06.01_KLONDIKE-Catalogue-Spring_Summer-2021-Edition_English_website.pdf"
                >
                  FRENCH catalog.
                </Link>
                <br />
                <br />
                Request your free printed catalog at
                <Link className="english-link">
                  info@klondikelubricants.com
                </Link>
                now! */}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  // const [size, setSize] = useState(useWindowSize)
  return size[0] > 768 ? (
    <>
      <div className="tech-page-wrapper">
        <div className="technacil-wriper">
          <div className="custom-tech">
            <Techtabllist
              className="catlog-tablist"
              itemName="Catalog"
              // categories={categories}
            />
          </div>
          {renderCatlogdata()}
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="custom-tech">
        <MobileTabListTech className="warranty-tablist" itemName="Catalog">
          <div className="tech-page-wrapper">{renderCatlogdata()}</div>
        </MobileTabListTech>
      </div>
    </>
  )
}
// Catlog.propTypes = {
//   heading: PropTypes.string,
//   categories: PropTypes.array,
//   itemName: PropTypes.string,
// }

Catlog.propTypes = {
  catData: PropTypes.object,
  heading: PropTypes.string,
  franch: PropTypes.string,
  english: PropTypes.string,
  categories: PropTypes.array,
  itemName: PropTypes.string,
  image: PropTypes.string,
}
export default Catlog
