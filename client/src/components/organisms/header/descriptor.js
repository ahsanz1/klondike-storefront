const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'Header',
  label: 'Header',
  isGlobal: true,
  description:
    'Header component with company logo, header nav links and promo rail options',
  attributes: {
    logo: Types.Image({
      label: 'logo',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    mobileLogo: Types.Image({
      label: 'mobile-logo',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    links: Types.Array({
      label: 'Default Header Links',
      children: Types.Shape({
        children: {
          label: Types.String({ label: 'label' }),
          url: Types.String({ label: 'URL' }),
          mobileOnly: Types.Boolean({ label: 'Mobile Only' }),
          productDropDown: Types.Array({
            label: 'Our Product',
            children: Types.Shape({
              children: {
                label: Types.String({ label: 'name' }),
                image: Types.Image({
                  label: 'logo',
                  url: Types.String({ label: 'URL' }),
                  altText: Types.String({ label: 'Alt text' }),
                }),
                url: Types.String({ label: 'Redirect Url' }),
              },
            }),
          }),
        },
      }),
    }),
    dynamicLinks: Types.Array({
      label: 'Dynamic Links Section',
      children: Types.Shape({
        children: {
          id: Types.String({ label: 'Section ID (String)' }),
          linksArray: Types.Array({
            label: 'Dynamic Links List',
            children: Types.Shape({
              children: {
                label: Types.String({ label: 'label' }),
                url: Types.String({ label: 'URL' }),
                mobileOnly: Types.Boolean({ label: 'Mobile Only' }),
              },
            }),
          }),
        },
      }),
    }),
    // promoData: Types.Shape({
    //   children: {
    //     promoOffer: Types.Shape({
    //       children: {
    //         label: Types.String({ label: 'label' }),
    //         url: Types.String({ label: 'URL' }),
    //       },
    //     }),
    //     promoBanner: Types.String({ label: 'URL' }),
    //     extraLink: Types.Shape({
    //       children: {
    //         label: Types.String({ label: 'label' }),
    //         url: Types.String({ label: 'URL' }),
    //       },
    //     }),
    //   },
    // }),
    offerLabel: Types.String({ label: 'Offer label' }),
    offerLink: Types.String({ label: 'Offer URL' }),
    promoBanner: Types.String({ label: 'Promo Banner' }),
    referLabel: Types.String({ label: 'Refer label' }),
    referLink: Types.String({ label: 'Refer URL' }),
    buyButton: Types.String({ label: 'Button Text' }),
    menuBottom: Types.String({ label: 'Menu Bottom Text' }),
    lubricantLink: Types.Image({
      label: 'lubricant Link',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    searchIcon: Types.Image({
      label: 'search Icon',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    userIcon: Types.Image({
      label: 'user Icon',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    cartIcon: Types.Image({
      label: 'cart Icon',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    mobileMenu: Types.Image({
      label: 'Menu Expand Icon',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    mobileMenuOpen: Types.Image({
      label: 'Menu Open Icon',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    mobileMenuClose: Types.Image({
      label: 'Menu Close Icon',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
  },
})
