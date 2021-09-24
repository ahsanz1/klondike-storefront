const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'Techtabllist',
  label: 'Category Technical side bare',
  isGlobal: false,
  description: 'List of Categories ',
  attributes: {
    categories: Types.Array({
      label: 'Categories',
      children: Types.Shape({
        children: {
          categoryName: Types.String({ label: 'Category name' }),
        },
      }),
    }),
  },
})
