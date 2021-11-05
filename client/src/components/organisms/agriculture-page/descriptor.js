const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'AgriculturePage',
  label: 'Agriculture Page',
  isGlobal: false,
  description: `agriculture page in industry applications`,

  attributes: {
    activeTablist: Types.String({ label: 'Active Tablist' }),
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
          imgURL: Types.Image({
            label: 'image URL',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          productRedirect: Types.String({ label: 'Redirect to product(URL)' }),
          produckSKU: Types.String({ label: 'product SKU name for link' }),
        },
      }),
    }),
    exploreCatagoryHeading: Types.String({ label: 'explore more heading' }),
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
