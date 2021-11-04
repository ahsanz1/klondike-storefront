const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'AgriculturePage',
  label: 'Agriculture Page',
  isGlobal: false,
  description: `agriculture page in industry applications`,

  attributes: {
    title: Types.String({
      label: 'Page title',
    }),
    paragraph: Types.RichText({
      label: 'page paragraph',
    }),
    subHeading: Types.String({
      label: 'subheading',
    }),
    featuredProduct: Types.Array({
      label: 'featured Products',
      children: Types.Shape({
        children: {
          imgURL: Types.String({ label: 'image URL' }),
          productRedirect: Types.String({ label: 'Redirect to product(URL)' }),
          produckSKU: Types.String({ label: 'product SKU name for link' }),
        },
      }),
    }),
    exploreCatagoryHeading: Types.String({ label: 'ecplore more heading' }),
    exploreCatagory: Types.Array({
      label: 'explore catagorys',
      children: Types.Shape({
        children: {
          catagoryRedirect: Types.String({ label: 'catagory Redirect URL' }),
          catagory: Types.String({ label: 'Catagory name' }),
        },
      }),
    }),
  },
})
