var includes = require('lodash').includes

export const algoliaClient = {
  appId: process.env.FABRIC_ALGOLIA_APP_ID || 'AWP6XJTOHO',
  apiKey:
    process.env.FABRIC_ALGOLIA_API_KEY || '7ed14c7f1e3110fd6712b3e854a9fc86',
  searchIndex:
    process.env.FABRIC_ALGOLIA_SEARCH_INDEX ||
    '5fc78dfc6135050007191290-sandbox-commerce-search-product',
  suggestionsIndex:
    process.env.ALGOLIA_SUGGESTIONS_INDEX || 'abchomeSuggestions',
  categoriesIndex:
    process.env.ALGOLIA_CATEGORIES_INDEX || 'abchomesearch_categories',
  subcategoriesIndex:
    process.env.ALGOLIA_SUBCATEGORIES_INDEX ||
    'copilotApi-jobs-production-item-search-index_subcategories',
  priceAscIndex:
    process.env.ALGOLIA_PRICE_ASC ||
    'copilotApi-jobs-production-item-search-index_price_asc',
  priceDescIndex:
    process.env.ALGOLIA_PRICE_DESC ||
    'copilotApi-jobs-production-item-search-index_price_desc',
  alphabeticalIndex:
    process.env.ALGOLIA_ALPHABETICAL_INDEX ||
    'copilotApi-jobs-production-item-search-index_alphabetical',
  newArrivalsIndex:
    process.env.ALGOLIA_NEW_ARRIVALS_INDEX ||
    'copilotApi-jobs-production-item-search-index_new_arrivals',
}
console.log(process.env.FABRIC_API_DOMAIN, 'sdsd')
export const apiDomain =
  process.env.FABRIC_API_DOMAIN ||
  'https://dev01-apigw.iqbarsandbox.fabric.zone'

export const xpmApiDomain =
  process.env.FABRIC_XPM_API_DOMAIN ||
  'https://dev01-apigw.iqbarsandbox.fabric.zone'
export const subApiDomain =
  process.env.FABRIC_SUB_API_DOMAIN ||
  'https://nw9ulr2s82.execute-api.us-east-1.amazonaws.com/dev'
export const account = process.env.FABRIC_ACCOUNT || '5fc78dfc6135050007191290'
export const stage = process.env.FABRIC_STAGE || 'sandbox'
export const channel = process.env.FABRIC_CHANNEL || '12'
export const site = process.env.FABRIC_SITE || 'eatiqbar-dev.herokuapp.com'
export const xApiKey =
  process.env.FABRIC_X_API_KEY || '18ZYT2ElYj2zJqSAg1mX4MW0fe5ZIoR1Q1IVf9g1'
export const orderApiKey =
  process.env.FABRIC_ORDERS_API_KEY ||
  'cEH3r7IiEF9T3qXjlAnAjaI16P7ZIiqdtvcObqt1'
export const klaviyoService = {
  trackApiId: {
    trackApiKey: process.env.FABRIC_KLAVIYO_PUBLIC_KEY || 'U7Eb42',
  },
  newsletter: {
    id: process.env.FABRIC_KLAVIYO_NEWSLETTER_KEY || 'U7Eb42',
  },
  welcomeSeries: {
    id: process.env.KLAVIYO_WELCOME_ID || 'Q24fXL',
  },
}
export const KLAVIYO_SETTINGS = {
  LISTS: {
    checkout: process.env.KLAVIYO_NEWSLETTER_CHECKOUT_ID || 'TSdkgm', // Falling back to staging keys
    footer: process.env.KLAVIYO_NEWSLETTER_FOOTER_ID || 'TSdkgm',
  },
  API_URL: process.env.KLAVIYO_API_URL || 'https://manage.kmail-lists.com/ajax',
  API_KEY: process.env.KLAVIYO_NEWSLETTER_API_KEY || 'HD4ifj',
}
export const affirmPublic = {
  key: process.env.AFFIRM_PUBLIC_KEY || 'X7QA9MIQ8V421CGO',
  // key: process.env.AFFIRM_PUBLIC_KEY,
  script:
    process.env.AFFIRM_SCRIPT ||
    'https://cdn1-sandbox.affirm.com/js/v2/affirm.js',
}
const analyticsSetting = process.env.FEATURE_ANALYTICS_LAYER
const eventBlacklist = (
  process.env.FEATURE_ANALYTICS_EVENT_BLACKLIST || ''
).split(',')
const tagBlacklist = (process.env.FEATURE_ANALYTICS_TAG_BLACKLIST || '').split(
  ',',
)
export const featureFlags = {
  oldAnalytics: analyticsSetting === 'old' || analyticsSetting === 'both',
  newAnalytics: analyticsSetting === 'new' || analyticsSetting === 'both',
  eventBlacklist: eventBlacklist.join(','),
  tagBlacklist: tagBlacklist.join(','),
  talkable: true,
  eventDisabled: event => includes(eventBlacklist, event),
  tagDisabled: tag => includes(tagBlacklist, tag),
}

const defaultGTMContainerId = featureFlags.newAnalytics
  ? 'GTM-TT37HR'
  : 'GTM-NB2STXV'

// UA-109221007-1
// UA-11090278-9 is the 2020.abchome.local.web property in GA, used for local development
const defaultGAPropertyId = featureFlags.newAnalytics ? '' : null

export const googleAnalyticsKey = process.env.GOOGLE_KEY || defaultGAPropertyId
export const googleTagManagerKey =
  process.env.GTM_SCRIPT_KEY || defaultGTMContainerId
export const rakutenAffiliateNetworkID = process.env.RAKUTEN_ID
// GTM-5MV444X
export const gtm = {
  devScriptId: process.env.REACT_APP_GTM_SCRIPT_DEV_ID || '',
  prodScriptId: process.env.REACT_APP_GTM_SCRIPT_PROD_ID || '',
}
// GTM-5MV444X
// App Dynamic Key
export const appDynamicApiKey = process.env.APP_DYNAMIC_KEY || 'AD-AAB-AAY-DUG'

export const dynamicYieldKey = process.env.dynamicYieldKey || '8773517'

// export const enableHeroWebPlugin = process.env.ENABLE_HERO_WEB_PLUGIN

export const paymentService = {
  apiKey:
    process.env.PAYMENT_APIKEY || '8rwFyeJGPV93s25CyS6g43lQxoMfkvr42oT5b6cd',
  actionTokenUrl: {
    sandbox: 'https://test.authorize.net/payment/payment',
    production: 'https://accept.authorize.net/payment/payment',
  },
  vendor: process.env.PAYMENT_VENDOR || 'authorize.net',
}

export const externalService = {
  apiKey:
    process.env.AVALARA_APIKEY || 'ku02tBC5W494oLdBSUsd51KF1De5JvkJ6I070Xt2',
}

// No fallback needed because we will only use it in PRODUCTION env.
export const heapAppId = process.env.HEAP_APP_ID
export const shippingApi = {
  apiKey:
    process.env.SHIPPING_API_KEY || 'd4VkTED0VK3Jb86M5jY147fa2daMEjChUTc86wF7',
}

export const PROD_HOSTNAME = process.env.PROD_HOSTNAME

export const audioEyeKey = process.env.AUDIO_EYE || false

export const externalShippingFreeMinAmount =
  process.env.EXTERNAL_SHIPPING_FREE_MIN_AMOUNT

export const csrEmailRecipients =
  process.env.CSR_EMAIL_RECIPIENTS || 'divya.bharti@fabric.inc'

export const externalShippingFreeName = process.env.EXTERNAL_SHIPPING_FREE_NAME

export const useNavApi =
  JSON.parse(
    process.env.USE_NAVIGATION_API ? process.env.USE_NAVIGATION_API : 'false',
  ) || false
export const showNarvarReturn =
  JSON.parse(
    process.env.SHOW_NARVAR_RETURN ? process.env.SHOW_NARVAR_RETURN : 'false',
  ) || false

export const ordersApi = {
  apiKey:
    process.env.ORDERS_API_KEY || 'ZKValev5a6aofGHFxISMx7uLSvIDTjUf5bH5iPIj',
}
export const narvarBaseTrackingUrl =
  process.env.NARVAR_BASE_TRACKING_URL ||
  'https://tracking-st01.narvar.qa/tracking/abchome/'

export const narvarBaseReturnUrl =
  process.env.NARVAR_BASE_RETURN_URL_LATEST ||
  'https://returns.narvar.com/abchome/returns'
export const localShippingThreshold =
  process.env.LOCAL_SHIPPING_THRESHOLD || 1000
export const orderReturnWindow = process.env.ORDERS_RETURN_WINDOW || 30
export const inHomeDelivery = process.env.IN_HOME_DELIVERY || false
export const defaultLeadTime = process.env.DEFAULT_LEAD_TIME || '10-18 weeks'
export const s3Env = process.env.S3_BUCKET_ENV || 'dev01'
export const shippingTableBucketBaseUrl =
  process.env.SHIPPING_TABLE_BUCKET_URL ||
  'https://abchome-mt-config.s3.amazonaws.com/'

// promotion switch
// export const ENABLE_PROMO = process.env.ENABLE_PROMO

export const isDevEnvironment = process.env.REACT_APP_DEV_ENV_MODE
  ? process.env.REACT_APP_DEV_ENV_MODE !== 'PROD'
  : true
