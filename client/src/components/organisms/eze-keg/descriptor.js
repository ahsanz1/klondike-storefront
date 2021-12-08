const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'EzeKEG',
  label: 'EZE-KEG',
  isGlobal: false,
  description: `EZE-KEG Descriptor`,

  attributes: {
    mainHeading: Types.String({ label: 'Main Heading' }),
    topImage: Types.Image({
      label: 'Section Image',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    easeDescription: Types.String({ label: 'Description' }),
    benifits: Types.Array({
      label: 'Benefits',
      children: Types.Shape({
        children: {
          heading: Types.String({ label: 'Heading' }),
          desc: Types.Array({
            label: 'Benefits Description',
            children: Types.Shape({
              children: {
                heading: Types.String({ label: 'Heading' }),
                description: Types.String({ label: 'Description' }),
              },
            }),
          }),
        },
      }),
    }),
    whyEze: Types.Array({
      label: 'Why Choose EZE-KEG',
      children: Types.Shape({
        children: {
          heading: Types.String({ label: 'Heading' }),
          desc: Types.Array({
            label: 'Why EZE-KEG Description',
            children: Types.Shape({
              children: {
                heading: Types.String({ label: 'Heading' }),
                description: Types.String({ label: 'Description' }),
              },
            }),
          }),
        },
      }),
    }),
    EzePproducts: Types.Array({
      label: 'EZE-KEG PRODUCTS',
      children: Types.Shape({
        children: {
          heading: Types.String({ label: 'Heading' }),
          productlist: Types.Array({
            label: 'Why-EZE-KEG Description',
            children: Types.Shape({
              children: {
                subHeading: Types.String({ label: 'Heading' }),
                product: Types.Array({
                  label: 'Product Data',
                  children: Types.Shape({
                    children: {
                      image: Types.Image({
                        label: 'Section Image',
                        url: Types.String({ label: 'URL' }),
                        altText: Types.String({ label: 'Alt text' }),
                      }),
                      name: Types.String({ label: 'Product Name' }),
                      sku: Types.String({ label: 'SKU' }),
                    },
                  }),
                }),
              },
            }),
          }),
        },
      }),
    }),
  },
})
