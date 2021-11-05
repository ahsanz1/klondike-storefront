/* eslint-disable react/display-name */
import React from 'react'
import SampleXPMComponent from 'components/organisms/sample-xpm-component'
import InstagramSection from 'components/organisms/instagram-section'
import ProductSlider from 'components/organisms/product-slider'
import DiscountOrder from 'components/organisms/discount-order'
import MainPageHero from 'components/organisms/mainpage-hero'
import WebpageGlobalHeroBanner from 'components/organisms/webpages-hero-image-banner'
import MissionStatement from 'components/organisms/mission-statement'
import Testimonials from 'components/organisms/testimonials'
import CardsGroup from 'components/organisms/cards-group'
import CartPage from 'components/organisms/cart-page'
import Faqs from 'components/organisms/faqs'
import RequestForms from 'components/organisms/request-forms'
import WhatSection from 'components/organisms/what-section'
import SiteSearch from 'components/organisms/site-search'
import MyAccount from 'components/organisms/my-account'
import AccountAddress from 'components/organisms/account-address'
import StoreLocator from 'components/organisms/store-locator'
import AuthForm from 'components/organisms/auth-form'
import ReferEarn from 'components/organisms/refer-earn'
import ProductDescription from 'components/organisms/product-description'
import Reviews from 'components/organisms/reviews'
import CheckoutPage from 'components/organisms/checkout-page'
import Category from 'components/organisms/category'
import PLP from 'components/organisms/plp'
// import ResetPassword from 'components/organisms/auth-form/reset-password'
import PressKit from 'components/organisms/press-kit'
import CancelSubscription from './cancel-subscription'
import DeliveryStatus from 'components/organisms/delivery-status'
import DeliverySchedule from 'components/organisms/subscription-delivery-schedule'
import SubscriptionBillingInformation from 'components/organisms/subscription-billing-information'
import PurchaseHistory from 'components/organisms/purchase-history'
import PLPSusbcribed from 'components/organisms/plp-subscription'
import PDPSusbcription from 'components/organisms/pdp-subscription'
import CheckoutSuccess from 'components/molecules/checkout/checkout-success'
import SingleOrderDetails from 'components/organisms/single-order-details'
import OrderDetails from 'components/organisms/order-details'
import SliderTabbable from 'components/organisms/slider-tabable'
import ProductInvotationSlider from 'component/organisms/ProductInvotationSlider'
import Home from 'component/organisms/Home'
import HomeLubricant from 'components/organisms/HomeLubricant'
import DistributionProduct from 'components/organisms/DistributionProduct'
import DownTime from 'components/organisms/DownTime'
import HomeBanner from 'components/organisms/HomeBanner'
import CommitedSuccess from 'components/organisms/CommitedSuccess'
import ClientTestimonial from 'components/organisms/ClientTestimonial'
import ContactAddres from 'components/organisms/ContactAddres'
import Oats from 'components/organisms/OATS/index'
import PlpTabList from 'components/organisms/plp-tab-list'
import PCPOverview from 'components/organisms/PCPOverview'
import ProductItemList from 'components/organisms/ProductItemList'
import ProductOrderList from 'components/organisms/productorderlist'
import QuickOrder from 'components/organisms/quick-order'
import ContactUs from 'components/organisms/contact-us-page'
import Checkoutsection from 'components/organisms/checkout-section'
import Technical from 'components/organisms/Technical-document'
import Oamspproval from 'components/organisms/oam-approval'
import Confirmation from 'components/organisms/confirmation'
import WarrantyPage from 'components/organisms/warranty-page'
import VideoGallery from 'components/organisms/video-gallery'
import Techtabllist from 'components/organisms/Technical-tablist'
import TechNews from 'components/organisms/tech-news-page'
import Catlog from 'components/organisms/catlog-page'
import TechResource from 'components/organisms/Tech-Resource'
import OverView from 'components/organisms/company-overview'
import PrivacyPolicy from 'components/organisms/privacy-policy'
import WhyKlondike from 'components/organisms/why-klondike'
import WorkAtKlonedike from 'components/organisms/work-at-klondike'
import IndustryApplications from 'components/organisms/industry-applications'
import SafetyEnvironment from 'components/organisms/safety-environment'
import OurStory from 'components/organisms/our-story'
import PDS from 'components/organisms/PDS'
import SubItem from 'components/organisms/sub-page'
import Dealership from 'components/organisms/Dealership-page'
import AgriculturePage from 'components/organisms/agriculture-page'
import TestimonialSection from 'components/organisms/testimonial-section'
export default {
  ContactAddres: params => <ContactAddres {...params} />,
  ClientTestimonial: params => <ClientTestimonial {...params} />,
  CommitedSuccess: params => <CommitedSuccess {...params} />,
  HomeBanner: params => <HomeBanner {...params} />,
  DownTime: params => <DownTime {...params} />,
  DistributionProduct: params => <DistributionProduct {...params} />,
  HomeLubricant: params => <HomeLubricant {...params} />,
  Home: params => <Home {...params} />,
  ProductInvotationSlider: params => <ProductInvotationSlider {...params} />,
  Faqs: params => <Faqs {...params} />,
  Reviews: params => <Reviews {...params} />,
  CardsGroup: params => <CardsGroup {...params} />,
  // AboutUs: params => <AboutUs {...params} />,
  WhatSection: params => <WhatSection {...params} />,
  Category: params => <Category {...params} />,
  ReferEarn: params => <ReferEarn {...params} />,
  ShopRoom: params => <SampleXPMComponent {...params} />,
  ProductsByCategory: params => <SampleXPMComponent {...params} />,
  HorizontalCarouselWithTitle: params => <SampleXPMComponent {...params} />,
  ProductSlider: params => <ProductSlider {...params} />,
  MainPageHero: params => <MainPageHero {...params} />,
  MissionStatement: params => <MissionStatement {...params} />,
  DiscountOrder: params => <DiscountOrder {...params} />,
  Testimonials: params => <Testimonials {...params} />,
  InstagramSection: params => <InstagramSection {...params} />,
  RequestForms: params => <RequestForms {...params} key={Date.now()} />,
  Banner: params => <SampleXPMComponent {...params} />,
  WebpageGlobalHeroBanner: params => <WebpageGlobalHeroBanner {...params} />,
  CartPage: params => <CartPage {...params} />,
  SiteSearch: params => <SiteSearch {...params} />,
  ProductDescription: params => <ProductDescription {...params} />,
  CheckoutPage: params => <CheckoutPage {...params} />,
  MyAccount: params => <MyAccount {...params} />,
  AccountAddress: params => <AccountAddress {...params} key={Date.now()} />,
  StoreLocator: params => <StoreLocator {...params} />,
  PLP: params => <PLP {...params} />,
  PressKit: params => <PressKit {...params} />,
  CheckoutSuccess: params => <CheckoutSuccess {...params} />,
  AuthForm: params => <AuthForm {...params} key={Date.now()} />,
  CancelSubscription: params => <CancelSubscription {...params} />,
  DeliveryStatus: params => <DeliveryStatus {...params} />,
  DeliverySchedule: params => <DeliverySchedule {...params} />,
  SubscriptionBillingInformation: params => (
    <SubscriptionBillingInformation {...params} />
  ),
  PurchaseHistory: params => <PurchaseHistory {...params} key={Date.now()} />,
  // ResetPassword: params => <ResetPassword {...params} key={Date.now()} />,
  PLPSusbcribed: params => <PLPSusbcribed {...params} />,
  PDPSusbcription: params => <PDPSusbcription {...params} />,
  default: params => <SampleXPMComponent {...params} />,
  SingleOrderDetails: params => <SingleOrderDetails {...params} />,
  SubscriptionOrderDetails: params => <subscriptionOrderDetails {...params} />,
  OrderDetails: params => <OrderDetails {...params} />,
  SliderTabbable: params => <SliderTabbable {...params} />,
  Oats: params => <Oats {...params} />,
  PlpTabList: params => <PlpTabList {...params} />,
  PCPOverview: params => <PCPOverview {...params} />,
  ProductItemList: params => <ProductItemList {...params} />,
  ProductOrderList: params => <ProductOrderList {...params} />,
  Checkoutsection: params => <Checkoutsection {...params} />,
  QuickOrder: params => <QuickOrder {...params} />,
  Technical: params => <Technical {...params} />,
  ContactUs: params => <ContactUs {...params} />,
  Oamspproval: params => <Oamspproval {...params} />,
  Confirmation: params => <Confirmation {...params} />,
  WarrantyPage: params => <WarrantyPage {...params} />,
  VideoGallery: params => <VideoGallery {...params} />,
  Techtabllist: params => <Techtabllist {...params} />,
  TechNews: params => <TechNews {...params} />,
  Catlog: params => <Catlog {...params} />,
  TechResource: params => <TechResource {...params} />,
  OverView: params => <OverView {...params} />,
  PrivacyPolicy: params => <PrivacyPolicy {...params} />,
  WhyKlondike: params => <WhyKlondike {...params} />,
  WorkAtKlonedike: params => <WorkAtKlonedike {...params} />,
  IndustryApplications: params => <IndustryApplications {...params} />,
  SafetyEnvironment: params => <SafetyEnvironment {...params} />,
  OurStory: params => <OurStory {...params} />,
  Dealership: params => <Dealership {...params} />,
  PDS: params => <PDS {...params} />,
  SubItem: params => <SubItem {...params} />,
  AgriculturePage: params => <AgriculturePage {...params} />,
  TestimonialSection: params => <TestimonialSection {...params} />,
}
