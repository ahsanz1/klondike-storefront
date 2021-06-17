const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'ProductDescription',
  label: 'Product Description Page',
  isGlobal: false,
  description: 'Product Description Page',
  attributes: {
    sku: Types.String({ label: 'SKU for this product' }),
  },
})
