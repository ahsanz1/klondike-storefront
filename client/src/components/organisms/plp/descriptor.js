const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'PLP',
  label: 'PLP',
  isGlobal: false,
  description: 'Product Listing Page',
  attributes: {
    categories: Types.Array({
      label: 'Categories',
      children: Types.Shape({
        children: {
          title: Types.String({ label: 'Tab title' }),
          categoryName: Types.String({ label: 'Category name' }),
        },
      }),
    }),
  },
})
