const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'OurProduct',
  label: 'Product list',
  isGlobal: false,
  description: 'List of Products',
  attributes: {
    ourProduct: Types.Array({
      label: 'Products',
      children: Types.Shape({
        children: {
          name: Types.String({ label: 'Product name' }),
          image: Types.String({ label: 'Product Image' }),
        },
      }),
    }),
  },
})
