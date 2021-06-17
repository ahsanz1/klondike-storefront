const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'WebpageGlobalHeroBanner',
  label: 'Hero Banner',
  isGlobal: false,
  description: 'Hero Banner in webpages',
  attributes: {
    desktopImage: Types.Image({
      label: 'Desktop Hero Image',
      url: Types.String({ label: 'url of desktop hero image' }),
      altText: Types.String({
        label: 'alternative text of the desktop hero image',
      }),
    }),
    mobileImage: Types.Image({
      label: 'Mobile Image',
      url: Types.String({ label: 'url of mobile hero image' }),
      altText: Types.String({
        label: 'alternative text of the mobile hero image',
      }),
    }),
  },
})
