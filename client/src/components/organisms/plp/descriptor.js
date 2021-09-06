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
    plpBottom: Types.Array({
      label: 'PLP-Bottom',
      children: Types.Shape({
        children: {
          plpBottomImage: Types.Image({
            label: 'Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          button: Types.String({ label: 'Button Text' }),
          mobileButton: Types.String({ label: 'Mobile Button Text' }),
        },
      }),
    }),
  },
})
