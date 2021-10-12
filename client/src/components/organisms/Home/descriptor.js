const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'Home',
  label: 'Home Banner Content',
  isGlobal: false,
  description: `Home component where each child has 1 text options and other is Button conte`,

  attributes: {
    desktopHeroImage: Types.Image({
      label: 'Desktop hero banner',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    mobileHeroImage: Types.Image({
      label: 'Mobile hero banner',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),

    bannerheading: Types.String({ label: 'Banner Text' }),
    bannerbutton: Types.String({ label: 'Button Text' }),
  },
})
