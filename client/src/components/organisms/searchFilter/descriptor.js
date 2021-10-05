const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'SearchFilter',
  label: 'Search-Filter',
  isGlobal: false,
  description: 'Search component with filters',
  attributes: {
    searchHeading: Types.String({ label: 'Search Heading' }),
  },
})
