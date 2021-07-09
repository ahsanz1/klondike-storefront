const { Types } = require('@teamfabric/xpm')
exports.default = Types.Component({
  id: 'ProductItemList',
  label: 'PCP Product',
  isGlobal: false,
  description: `PCP component where each child has 2 text options and boolean attributes for 
  displaying text as paragraph or list`,
  attributes: {
    ProductList: Types.Array({
      label: 'Product',
      children: Types.Shape({
        children: {
          image: Types.Image({
            label: 'Product Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          title: Types.String({ label: 'Title' }),
        },
      }),
    }),
  },
})
