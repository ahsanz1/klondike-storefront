const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'SearchFlow',
  label: 'Search',
  isGlobal: true,
  description:
    'Header component with company logo, header nav links and promo rail options',
  attributes: {
    clearIcon: Types.Image({
      label: 'Clear Icon',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
  },
})
