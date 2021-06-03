const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'ProductSlider',
  label: 'Product Slider',
  description: 'Product slider component',
  attributes: {
    productsData: Types.Array({
      label: 'Products List',
      children: Types.Shape({
        children: {
          btnText: Types.String({ label: 'Button Text' }),
          btnId: Types.String({ label: 'Button Id' }),
          id: Types.String({ label: 'Products Id (Same as Button Id)' }),
          products: Types.Array({
            label: 'Flavors List',
            children: Types.Shape({
              children: {
                imgUrl: Types.String({ label: 'Image Url' }),
                imgAlt: Types.String({ label: 'Image Alt' }),
                productName: Types.String({ label: 'Product Name' }),
                productDesc: Types.String({ label: 'Product Description' }),
                productIcon: Types.String({ label: 'Icon Url' }),
                productIconAlt: Types.String({ label: 'Icon Alt' }),
                productLink: Types.String({ label: 'Product link' }),
                borderColor: Types.String({ label: 'Border Color' }),
                bgColor: Types.String({ label: 'Background Color' }),
              },
            }),
          }),
        },
      }),
    }),
  },
})
