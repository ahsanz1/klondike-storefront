const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'SearchFlow',
  label: 'SearchFlow',
  isGlobal: true,
  description: 'Search component with Clear Icon',
  attributes: {
    logo: Types.Image({
      label: 'Clear Icon',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
  },
})
