import MissionStatementData from 'components/organisms/mission-statement/data'
import WebpageGlobalHeroBannerData from 'components/organisms/webpages-hero-image-banner/data'
import discountOrderData from 'components/organisms/discount-order/data'
// import testimonialsData from 'components/organisms/testimonials/data'
import productSliderData from 'components/organisms/product-slider/data'
import instagramPosts from 'components/organisms/instagram-section/data'
import { categoriesXPM as categories } from 'components/organisms/plp/data'
import SliderTabbableData from 'components/organisms/slider-tabable/data'

import {
  merchandiseOptions,
  benefits,
  review,
  reviews,
  requestFormData,
  faqsData,
  whyEatIQBAR,
  whatSectionData,
  myAccount,
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
  // customizedProductDescription,
  PressKit,
  MainPageHeroData,
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
  mapLocationData,
  policyData,
  simpleFormData,
  emptyCartData,
} from 'libs/data/data'
const mockData = {
  '/': [
    {
      id: 'MainPageHero',
      params: MainPageHeroData,
    },
    {
      id: 'MissionStatement',
      params: MissionStatementData,
    },
    {
      id: 'ProductSlider',
      params: productSliderData,
    },
    {
      id: 'DiscountOrder',
      params: discountOrderData,
    },
    {
      id: 'Testimonials',
      params: reviews,
    },
    {
      id: 'InstagramSection',
      params: instagramPosts,
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
      params: { myAccount },
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
  '/faqs': [
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
  '/collections': [
    {
      id: 'Category',
      params: { ...category },
    },
  ],
  '/collections/all-bars': [
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
      id: 'WebpageGlobalHeroBanner',
      params: { ...contactUsBanner, key: '112233446677' },
    },
    {
      id: 'SimpleForm',
      params: simpleFormData,
    },
    {
      id: 'MapLocation',
      params: mapLocationData,
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
}

export default mockData
