const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'SearchFilter',
  label: 'SearchFilter',
  isGlobal: false,
  description: 'Search component with filters',
  attributes: {
    searchHeading: Types.String({ label: 'Search Heading' }),
  },
})
