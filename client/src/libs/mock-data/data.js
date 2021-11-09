// import MissionStatementData from 'components/organisms/mission-statement/data'
import WebpageGlobalHeroBannerData from 'components/organisms/webpages-hero-image-banner/data'
// import discountOrderData from 'components/organisms/discount-order/data'
// import testimonialsData from 'components/organisms/testimonials/data'
// import productSliderData from 'components/organisms/product-slider/data'
// import instagramPosts from 'components/organisms/instagram-section/data'
import { categoriesXPM as categories } from 'components/organisms/plp/data'
import SliderTabbableData from 'components/organisms/slider-tabable/data'
import { testimonialData } from 'components/organisms/testimonial-section/data'
import { accountData } from 'components/molecules/accounts-page/data'
// import tableAccoData from 'components/organisms/faqs/data'

import {
  merchandiseOptions,
  benefits,
  review,
  // reviews,
  requestFormData,
  faqsData,
  whyEatIQBAR,
  whatSectionData,
  // myAccount,
  accountTabsData,
  accountAddress,
  locationsData,
  findUsBanner,
  authLoginFormData,
  authRegisterFormData,
  authForgetPasswordFormData,
  referEarn,
  shippingFormData,
  category,
  shopBanner,
  authResetPasswordFormData,
  aboutUsPage,
  ProductOverview,
  ProductItem,
  heroBannerdata,
  bannerlubricants,
  DownTime,
  Testimonial,
  ProductInovationslider,
  CommitedSuccess,
  homebanneer,
  distributionSecond,
  // ProductLubricant,
  LubricantComponent,
  distributionproduct,
  TermsCondition,
  PrivacyPolicy,
  // customizedProductDescription,
  PressKit,
  // MainPageHeroData,
  DeliveryStatus,
  subscriptionBillingInfo,
  PurchaseHistory,
  PSusbcribed as subscribed,
  PProductsData as products,
  PSusbcribeNewItem,
  OrderDetailsData,
  pdpSkuData,
  SingleOrderDetails,
  subscriptionOrderDetails,
  cancelSubData,
  officeBanner,
  whyUsBanner,
  requestFormOfficeData,
  // simpleFormData,
  contactUsBanner,
  policyData,
  emptyCartData,
  ourProduct,
  pdpdata,
  pdpdatasheet,
  RadioData,
  Packagerorder,
  bulkorder,
  PlpBottom,
  pcp,
  searchFlow,
  delarship,
  cataogData,
  indusrtyapplication,
  warrantyData,
  overviewData,
  oamdata,
  technicalBanner,
  bigVideodata,
  smallVideodata,
  rendersubpage,
  EzeBox,
} from 'libs/data/data'
const mockData = {
  // '/': [
  //   {
  //     id: 'MainPageHero',
  //     params: MainPageHeroData,
  //   },
  //   {
  //     id: 'MissionStatement',
  //     params: MissionStatementData,
  //   },
  //   {
  //     id: 'ProductSlider',
  //     params: productSliderData,
  //   },
  //   {
  //     id: 'DiscountOrder',
  //     params: discountOrderData,
  //   },
  //   {
  //     id: 'Testimonials',
  //     params: reviews,
  //   },
  //   {
  //     id: 'InstagramSection',
  //     params: instagramPosts,
  //   },
  // ],

  '/': [
    {
      id: 'Home',
      params: heroBannerdata,
    },
    {
      id: 'HomeLubricant',
      params: bannerlubricants,
    },
    // {
    //   id: 'ProductLubricant',
    //   params: ProductLubricant,
    // },
    {
      id: 'DistributionProduct',
      params: LubricantComponent,
    },
    {
      id: 'DownTime',
      params: DownTime,
    },
    {
      id: 'HomeBanner',
      params: homebanneer,
    },
    {
      id: 'DistributionProduct',
      params: distributionSecond,
    },
    {
      id: 'DistributionProduct',
      params: distributionproduct,
    },
    {
      id: 'CommitedSuccess',
      params: CommitedSuccess,
    },
    {
      id: 'ClientTestimonial',
      params: Testimonial,
    },
    {
      id: 'ProductInvotationSlider',
      params: ProductInovationslider,
    },
    {
      id: 'DownTime',
      params: DownTime,
    },
  ],
  '/PCP': [
    {
      id: 'WebpageGlobalHeroBanner',
      params: { ...contactUsBanner, key: '112233446677' },
    },
    {
      id: 'PCPOverview',
      params: ProductOverview,
    },
    {
      id: 'ProductItemList',
      params: ProductItem,
    },
    {
      id: 'PCPBottom',
      params: pcp,
    },
    {
      id: 'DownTime',
      params: DownTime,
    },
  ],
  '/pds': [
    {
      id: 'PDS',
      params: pcp,
    },
  ],
  '/SubItem': [
    {
      id: 'SubItem',
      params: rendersubpage,
    },
  ],
  '/terms-condition': [
    {
      id: 'TermsCondition',
      params: TermsCondition,
    },
  ],
  '/privacy-policy': [
    {
      id: 'PrivacyPolicy',
      params: PrivacyPolicy,
    },
  ],
  '/PLPBottom': [
    {
      id: 'PLPBottom',
      params: PlpBottom,
    },
  ],
  '/SearchFlow': [
    {
      id: 'SearchFlow',
      params: searchFlow,
    },
  ],
  '/search-filter': [
    {
      id: 'SearchFilter',
    },
  ],
  '/about-klondike/eze-box': [
    {
      id: 'EzeBox',
      params: EzeBox,
    },
  ],

  '/cart': [
    {
      id: 'CartPage',
      params: { ...emptyCartData },
    },
  ],
  '/account': [
    {
      id: 'MyAccount',
      // params: { myAccount },
      params: { accountTabsData },
    },
  ],
  '/account/address': [
    {
      id: 'AccountAddress',
      params: { ...accountAddress },
    },
  ],
  '/account/login': [
    {
      id: 'AuthForm',
      params: { ...authLoginFormData, key: '1232332' },
    },
  ],
  '/account/register': [
    {
      id: 'AuthForm',
      params: { ...authRegisterFormData, key: '12323334' },
    },
  ],
  '/account/forgetpassword': [
    {
      id: 'AuthForm',
      params: { ...authForgetPasswordFormData, key: '12323325' },
    },
  ],
  '/set-password': [
    {
      id: 'AuthForm',
      params: { ...authResetPasswordFormData, key: '1232336' },
    },
  ],
  '/wholesale': [
    {
      id: 'WebpageGlobalHeroBanner',
      params: { ...WebpageGlobalHeroBannerData, key: '112233' },
    },
    {
      id: 'CardsGroup',
      params: merchandiseOptions,
    },
    {
      id: 'CardsGroup',
      params: benefits,
    },
    {
      id: 'RequestForms',
      params: { ...requestFormData, key: '1232337' },
    },
  ],
  '/office': [
    {
      id: 'WebpageGlobalHeroBanner',
      params: { ...officeBanner, key: '11223344' },
    },
    {
      id: 'CardsGroup',
      params: { ...benefits, bgColor: '#fff' },
    },
    {
      id: 'Testimonials',
      params: review,
    },
    {
      id: 'RequestForms',
      params: { ...requestFormOfficeData, key: '1232338' },
    },
  ],
  '/why-iqbar': [
    {
      id: 'WebpageGlobalHeroBanner',
      params: { ...whyUsBanner, key: '1122334455' },
    },
    {
      id: 'WhatSection',
      params: whatSectionData,
    },
    {
      id: 'CardsGroup',
      params: { ...whyEatIQBAR, bgColor: '#fff' },
    },
    {
      id: 'SliderTabbable',
      params: { ...SliderTabbableData },
    },
    {
      id: 'Faqs',
      params: faqsData,
    },
  ],

  '/Price-List': [
    {
      id: 'Faqs',
      params: faqsData,
    },
  ],
  '/search': [
    {
      id: 'SiteSearch',
      params: { pdpUrl: '/products' },
    },
  ],
  '/find-us': [
    {
      id: 'WebpageGlobalHeroBanner',
      params: { ...findUsBanner, key: '112233445566' },
    },
    {
      id: 'StoreLocator',
      params: locationsData,
    },
  ],
  '/refer-earn': [
    {
      id: 'ReferEarn',
      params: { ...referEarn },
    },
  ],
  '/checkout': [
    {
      id: 'CheckoutPage',
      params: { ...shippingFormData },
    },
  ],
  '/review': [
    {
      id: 'Reviews',
    },
  ],
  '/ourProduct': [
    {
      id: 'OurProduct',
      params: ourProduct,
    },
  ],
  '/collections': [
    {
      id: 'Category',
      params: { ...category },
    },
  ],
  '/plp-page': [
    {
      id: 'WebpageGlobalHeroBanner',
      params: shopBanner,
    },
    {
      id: 'PLP',
      params: { categories },
    },
  ],

  '/about-us': [
    {
      id: 'AboutUs',
      params: aboutUsPage,
    },
  ],
  '/products': [
    {
      id: 'ProductDescription',
      params: pdpSkuData,
    },
    {
      id: 'Reviews',
      params: {},
    },
  ],
  '/products/swag': [
    {
      id: 'SwwagProductDescription',
      params: {},
    },
  ],
  '/products/pdp': [
    {
      id: 'DirectProductDescription',
      params: {},
    },
  ],
  '/press': [
    {
      id: 'PressKit',
      params: PressKit,
    },
  ],
  '/subscription/delivery-status': [
    {
      id: 'DeliveryStatus',
      params: DeliveryStatus,
    },
  ],
  '/subscription/delivery-schedule': [
    {
      id: 'DeliverySchedule',
      params: {},
    },
  ],
  '/subscription/billing-information': [
    {
      id: 'SubscriptionBillingInformation',
      params: subscriptionBillingInfo,
    },
  ],
  '/account/purchase-history': [
    {
      id: 'PurchaseHistory',
      params: PurchaseHistory,
    },
  ],
  '/account/subscription/swap': [
    {
      id: 'PLPSusbcribed',
      params: { subscribed, products },
    },
  ],
  '/account/subscription/swap/detail': [
    {
      id: 'PDPSusbcription',
      params: { subscribed, PSusbcribeNewItem },
    },
  ],
  '/checkout-success': [
    {
      id: 'CheckoutSuccess',
      params: {},
    },
  ],
  '/subscription/order-detail': [
    {
      id: 'OrderDetails',
      params: OrderDetailsData,
    },
  ],
  '/account/singleorderdetail': [
    {
      id: 'SingleOrderDetails',
      params: SingleOrderDetails,
    },
  ],
  '/account/subscriptionOrderDetails': [
    {
      id: 'SubscriptionOrderDetails',
      params: subscriptionOrderDetails,
    },
  ],
  '/account/subscription/cancel-subsciption': [
    {
      id: 'CancelSubscription',
      params: cancelSubData,
    },
  ],
  '/contact-us': [
    {
      id: 'ContactUs',
      params: {},
    },
  ],
  '/policies/privacy-policy': [
    {
      id: 'PolicyPage',
      params: policyData,
    },
  ],
  '/subscription/address': [
    {
      id: 'SubscriptionAddresses',
      params: {},
    },
  ],
  '/oats': [
    {
      id: 'Oats',
      params: {},
    },
  ],
  '/PDP': [
    {
      id: 'PDP',
      params: { pdpdata, pdpdatasheet, RadioData, categories },
    },
    {
      id: 'PDS',
      params: pcp,
    },
  ],
  '/Order': [
    {
      id: 'order',
      params: { ...Packagerorder },
    },
  ],
  '/bulk': [
    {
      id: 'order',
      params: { ...bulkorder },
    },
  ],
  '/productorderform': [
    {
      id: 'ProductOrderList',
      params: {},
    },
  ],
  '/quickorder': [
    {
      id: 'QuickOrder',
      params: {},
    },
  ],
  '/Checkoutsection': [
    {
      id: 'Checkoutsection',
      params: {},
    },
  ],
  '/tech-resources/Technical-doucment': [
    {
      id: 'Technical',
      params: {},
    },
  ],

  '/tech-resources/OEMApprovals': [
    {
      id: 'Oamspproval',
      params: oamdata,
    },
  ],
  '/confirmation-order': [
    {
      id: 'Confirmation',
      params: {},
    },
  ],
  '/tech-resources/warranty': [
    {
      id: 'WarrantyPage',
      params: warrantyData,
    },
  ],
  '/tech-resources/video-gallery': [
    {
      id: 'WebpageGlobalHeroBanner',
      params: { ...technicalBanner, key: '112233446677' },
    },
    {
      id: 'VideoGallery',
      params: { bigVideodata, smallVideodata },
    },
    // {
    //   id: 'PCPBottom',
    //   params: { ...PcpBottom },
    // },
  ],

  '/Techtabllist': [
    {
      id: 'Techtabllist',
      params: {},
    },
  ],
  '/tech-resources/tech-news-blog': [
    {
      id: 'TechNews',
      params: {},
    },
  ],
  '/tech-resources/catlog': [
    {
      id: 'Catlog',
      params: cataogData,
    },
  ],
  '/tech-resource': [
    {
      id: 'TechResource',
      params: {},
    },
  ],
  '/about-klondike/overview': [
    {
      id: 'WebpageGlobalHeroBanner',
      params: { ...contactUsBanner, key: '112233446677' },
    },
    {
      id: 'OverView',
      params: {},
    },
    {
      id: 'OverViewLinks',
      params: {},
    },
  ],
  '/about-klondike/why-klondike': [
    {
      id: 'WhyKlondike',
      params: overviewData,
    },
  ],
  '/about-klondike/work-at-klondike': [
    {
      id: 'WorkAtKlonedike',
      params: {},
    },
  ],
  '/about-klondike/industry-applications': [
    {
      id: 'IndustryApplications',
      params: indusrtyapplication,
    },
  ],
  '/about-klondike/safety-environment': [
    {
      id: 'SafetyEnvironment',
      params: {},
    },
  ],
  '/about-klondike/our-story': [
    {
      id: 'OurStory',
      params: {},
    },
  ],
  '/dealership-opportunity': [
    {
      id: 'Dealership',
      params: delarship,
    },
  ],
  '/about-klondike/industry-applications/agriculture': [
    {
      id: 'AgriculturePage',
      params: {},
    },
  ],
  '/about-klondike/industry-applications/On-road-heavy-duty': [
    {
      id: 'AgriculturePage',
      params: {},
    },
  ],
  '/testimonials': [
    {
      id: 'TestimonialSection',
      params: { ...testimonialData },
    },
  ],
  '/account-page': [
    {
      id: 'Accounts',
      params: { ...accountData },
    },
  ],
}
export default mockData
