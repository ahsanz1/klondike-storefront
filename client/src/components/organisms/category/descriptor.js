const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'Category',
  label: 'Category Listing Page',
  isGlobal: false,
  description: 'Category Listing Page',
  attributes: {
    categoryName: Types.String({ label: 'Category Name' }),
  },
})
