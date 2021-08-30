const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'PLP',
  label: 'PLP-Page',
  isGlobal: false,
  description: 'Product Listing Page',
  attributes: {
    categories: Types.Array({
      label: 'Categories',
      children: Types.Shape({
        children: {
          categoryName: Types.String({ label: 'Category name' }),
          categoryDesc: Types.String({ label: 'Category Desc' }),
        },
      }),
    }),
  },
})
