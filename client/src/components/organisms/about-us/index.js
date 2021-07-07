// import React from 'react'
// import PropTypes from 'prop-types'
// import './style.scss'
// import WebpagesHeroImages from 'components/molecules/webpages-hero-images'
// import AlternateTextImage from 'components/molecules/alternate-text-image'
// // import HomepageHeroTextLinks from 'components/molecules/mainpage-hero/homepage-hero-text-links'
// import HomeBanner from 'components/molecules/homebanner'
// import DowntimeCosting from 'components/molecules/downtime-costing'
// import PageBannerContent from 'components/molecules/pageBannerContent'
// import Commited from 'components/molecules/commited'
// import Testimonial from 'components/molecules/testimonial'
// import ProductInovation from 'components/molecules/ProductInovation'
// import DistributionProduct from 'components/molecules/DistributionProduct'
// import BannerLubricant from 'components/molecules/BannerLubricant'

// const AboutUs = ({
//   desktopHeroImage,
//   mobileHeroImage,
//   aboutUsContent,
//   aboutUsSecondContent,
//   headingtext,
//   bannersubheading,
//   bannercontent,
//   downTimeCosting,
//   bannerComponent,
//   commited,
//   testimonial,
//   productInovation,
//   productHeading,
//   distributionProduct,
//   distributionheading,
//   bannerlubricants,
// }) => {
//   console.log('productHeading', productHeading)
//   const heroBanner = {
//     desktopImage: desktopHeroImage,
//     mobileImage: mobileHeroImage,
//   }
//   console.log('productInovation', productInovation)
//   return (
//     <>
//       <div className="heroimgwrapper">
//         <WebpagesHeroImages {...heroBanner} />
//       </div>
//       <div className="bannercontetwraper">
//         <HomeBanner {...bannercontent} />
//       </div>
//       <div className="lubricant-wrapper">
//         <BannerLubricant {...bannerlubricants} />
//       </div>
//       <div className="oil-component-heading-wrapper">
//         {headingtext && (
//           <h1 className="oil-component-heading">{headingtext.headingtext}</h1>
//         )}
//       </div>
//       {aboutUsContent.map((aboutUsSingle, id) => (
//         <AlternateTextImage {...aboutUsSingle} key={id} />
//       ))}
//       <div className="downtime-wrapper ">
//         {downTimeCosting.map((down, i) => (
//           <DowntimeCosting {...down} key={i} />
//         ))}
//       </div>
//       <div className="banner-component">
//         {bannerComponent.map((content, i) => (
//           <PageBannerContent {...content} key={i} />
//         ))}
//       </div>

//       <div>
//         {aboutUsSecondContent.map((content, i) => (
//           <DistributionProduct {...content} key={i} />
//         ))}
//       </div>

//       <div className="banner-component">
//         {commited.map((content, i) => (
//           <Commited {...content} key={i} />
//         ))}
//       </div>

//       <div className="distribute-wraper">
//         {distributionheading && (
//           <h1 className="distribute-heading">
//             {distributionheading.headingtext}
//           </h1>
//         )}
//         {distributionProduct.map((content, i) => (
//           <DistributionProduct {...content} key={i} />
//         ))}
//       </div>

//       <Testimonial testimonial={testimonial} />
//       <div className="productHeading">
//         {productHeading && <h1>{productHeading.productHeading}</h1>}
//         <ProductInovation productInovation={productInovation} />
//       </div>

//       <div className="downtime-wrapper ">
//         {downTimeCosting.map((down, i) => (
//           <DowntimeCosting {...down} key={i} />
//         ))}
//       </div>
//     </>
//   )
// }

// AboutUs.propTypes = {
//   desktopHeroImage: PropTypes.object,
//   mobileHeroImage: PropTypes.object,
//   aboutUsContent: PropTypes.array,
//   aboutUsSecondContent: PropTypes.array,
//   headingtext: PropTypes.string,
//   bannersubheading: PropTypes.string,
//   bannercontent: PropTypes.array,
//   downTimeCosting: PropTypes.array,
//   bannerComponent: PropTypes.array,
//   commited: PropTypes.string,
//   testimonial: PropTypes.array,
//   productInovation: PropTypes.array,
//   productHeading: PropTypes.string,
//   distributionProduct: PropTypes.string,
//   distributionheading: PropTypes.string,
//   bannerlubricants: PropTypes.string,
// }

// export default AboutUs
