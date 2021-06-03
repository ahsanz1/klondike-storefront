export const Header = {
  links: [
    {
      label: 'Shop',
      url: '/collections/all-bars',
      mobileOnly: false,
      loggedInOnly: false,
    },
    {
      label: 'Account',
      url: '/account',
      mobileOnly: true,
      loggedInOnly: false,
    },
    { label: 'Refer + Earn', url: '/', mobileOnly: true, loggedInOnly: false },
    {
      label: 'Get 50% Off',
      url: '/#discount',
      mobileOnly: false,
      loggedInOnly: false,
    },
    {
      label: 'Find Us',
      url: '/find-us',
      mobileOnly: false,
      loggedInOnly: false,
    },
    {
      label: 'Wholesale',
      url: '/wholesale',
      mobileOnly: false,
      loggedInOnly: false,
    },
    {
      label: 'Office',
      url: '/office',
      mobileOnly: false,
      loggedInOnly: false,
    },
    {
      label: 'Why IQBAR',
      url: '/why-iqbar',
      mobileOnly: false,
      loggedInOnly: false,
    },
    {
      label: 'About Us',
      url: '/about-us',
      mobileOnly: true,
      loggedInOnly: false,
    },
    // { label: 'FAQ', link: '/faqs', mobileOnly: true, loggedInOnly: false },
    {
      label: 'Logout',
      url: '/account/login?logout=true',
      mobileOnly: true,
      loggedInOnly: true,
    },
  ],
  dynamicLinks: [
    {
      id: 'Wholesale',
      linksArray: [
        {
          label: 'Shop',
          url: '/collections/wholesale',
          mobileOnly: false,
          loggedInOnly: false,
        },
        {
          label: 'Why IQBAR',
          url: '/whyiqbar',
          mobileOnly: false,
          loggedInOnly: false,
        },
        {
          label: 'Logout',
          url: '/account/login?logout=true',
          mobileOnly: true,
          loggedInOnly: true,
        },
      ],
    },
  ],
  // promoData: {
  //   promoOffer: {
  //     label: 'Try 7 Flavors For $14.99!',
  //     link: 'https://www.eatiqbar.com/products/7-bar-trial',
  //   },
  //   promoBanner: 'Free Shipping on All U.S. Orders!',
  //   extraLink: {
  //     label: 'Refer + Earn',
  //     link: '/refer-earn',
  //   },
  // },
  offerLabel: 'Try 7 Flavors For $14.99!',
  offerLink: '/products?sku=7BARSAMPLER',
  promoBanner: 'Free Shipping on All U.S. Orders!',
  referLabel: 'Refer + Earn',
  referLink: '/refer-earn',
  logo: { url: '/static/logo.svg' },
}
