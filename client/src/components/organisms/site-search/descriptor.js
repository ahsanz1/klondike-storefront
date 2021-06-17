const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'SiteSearch',
  label: 'Search Page',
  isGlobal: false,
  description: 'Site Search',
  attributes: {
    pdpUrl: Types.String({ label: 'Product Page Url' }),
  },
})
