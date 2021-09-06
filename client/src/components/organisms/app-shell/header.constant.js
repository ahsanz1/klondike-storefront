export const Header = {
  links: [
    {
      label: 'About KLONDIKE',
      url: '/',
      mobileOnly: false,
      loggedInOnly: false,
      dropDown: [
        {
          name: 'Overview',
        },
        {
          name: 'our story',
        },
        {
          name: 'why klondike',
        },
        {
          name: 'indusrty applications',
        },
        {
          name: 'Safety & environment',
        },
        {
          name: 'work at klondike',
        },
      ],
    },
    // {
    //   label: 'OUR PRODUCTS',
    //   url: '/account',
    //   mobileOnly: true,
    //   loggedInOnly: false,
    // },
    // { label: 'Refer + Earn', url: '/', mobileOnly: true, loggedInOnly: false },
    {
      label: 'OUR PRODUCTS',
      url: '/#discount',
      mobileOnly: false,
      loggedInOnly: false,
      dropDown: [
        {
          name: 'Products Overview',
          image: '/static/images/nanoil.png',
        },
        {
          name: 'nano',
          image: '/static/images/klondike1.png',
        },
        {
          name: 'Heavy Duty Engine Oils',
          image: '/static/images/klondike2.png',
        },
        {
          name: 'Automotive Engine Oils',
          image: '/static/images/klondike3.png',
        },
        {
          name: 'Gear Lubricants',
          image: '/static/images/klondike1.png',
        },
        {
          name: 'Transmission Fluids',
          image: '/static/images/klondike2.png',
        },
        {
          name: 'Hydraulic Fluids',
          image: '/static/images/klondike3.png',
        },
        {
          name: 'Industrial Oils',
          image: '/static/images/klondike1.png',
        },
        {
          name: 'Greases',
          image: '/static/images/klondike2.png',
        },
        {
          name: 'Biodegradable Lubricants',
          image: '/static/images/klondike3.png',
        },
      ],
    },
    {
      label: 'TECH RESOURCES',
      url: '/find-us',
      mobileOnly: false,
      loggedInOnly: false,
      dropDown: [
        {
          name: 'Technical Documents',
        },
        {
          name: 'OEM Approvals',
        },
        {
          name: 'Catalog',
        },
        {
          name: 'Warranty',
        },
        {
          name: 'Video Gallery',
        },
        {
          name: 'Tech/News Blog',
        },
      ],
    },
    // {
    //   label: 'CONTACT KLONDIKE',
    //   url: '/wholesale',
    //   mobileOnly: false,
    //   loggedInOnly: false,
    // },
    // {
    //   label: 'Office',
    //   url: '/office',
    //   mobileOnly: false,
    //   loggedInOnly: false,
    // },
    // {
    //   label: 'Why IQBAR',
    //   url: '/why-iqbar',
    //   mobileOnly: false,
    //   loggedInOnly: false,
    // },
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
  offerLabel: 'FIND THE RIGHT OIL FOR YOUR APPLICATION',
  buyButton: 'HOW TO BUY',
  promoButton: 'Search Now',
  promoLogo: { url: '/static/images/promologo.png' },
  url: '/account/login?logout=true',

  // offerLink: '/products?sku=7BARSAMPLER',
  // promoBanner: 'Free Shipping on All U.S. Orders!',
  // referLabel: 'Refer + Earn',
  // referLink: '/refer-earn',
  logo: { url: '/static/images/logo.png' },
}
