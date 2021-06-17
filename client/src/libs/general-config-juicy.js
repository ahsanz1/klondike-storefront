export const algoliaClient = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID || 'AWP6XJTOHO',
  apiKey:
    process.env.REACT_APP_ALGOLIA_API_KEY || 'd3c5cc4d68e0877a76a88e935338b648',
  HITS_PER_PAGE: process.env.REACT_APP_ALGOLIA_HITS_PER_PAGE || 20,
  searchIndex:
    process.env.REACT_APP_ALGOLIA_SEARCH_INDEX ||
    '5f7af113678e590008321c06-sandbox-commerce-search-product',
}

export const gtm = {
  devScriptId: process.env.REACT_APP_GTM_SCRIPT_DEV_ID || 'GTM-MG5SN3V',
  prodScriptId: process.env.REACT_APP_GTM_SCRIPT_PROD_ID || 'GTM-KLS7JNS',
}

export const isDevEnvironment = process.env.REACT_APP_DEV_ENV_MODE
  ? process.env.REACT_APP_DEV_ENV_MODE !== 'PROD'
  : true

export const apiDomain =
  process.env.REACT_APP_API_DOMAIN ||
  'https://dev01-apigw.juicycouture.fabric.zone'
export const account =
  process.env.REACT_APP_ACCOUNT || '5f493c9f30ec2a0007a94fc8'
export const site =
  process.env.REACT_APP_SITE || 'dev01.juicycouture.fabric.zone'
export const stage = process.env.REACT_APP_STAGE || 'dev02'
export const goShippoAPIKEY =
  process.env.REACT_APP_SHIPPO_API_KEY ||
  'g29qNoaJfu9aZm0YO5KmD8326TPuWifl5W7y8KUa'
export const klaviyoPublicKey =
  process.env.REACT_APP_KLAVIYO_PUBLIC_KEY || 'U7Eb42'
export const klaviyoNewsLetterKey =
  process.env.REACT_APP_KLAVIYO_NEWSLETTER_KEY || 'RhvEDG'

export const MOBILE_VIEW_MIN_WIDTH = 768
