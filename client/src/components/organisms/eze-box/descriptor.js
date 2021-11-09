const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'EzeBox',
  label: 'EZE-Box',
  isGlobal: false,
  description: `EZE-BOX Descriptor`,

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
      label: 'Why Choose EZE-BOX',
      children: Types.Shape({
        children: {
          heading: Types.String({ label: 'Heading' }),
          desc: Types.Array({
            label: 'Why EZE Description',
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
      label: 'EZE PRODUCTS',
      children: Types.Shape({
        children: {
          heading: Types.String({ label: 'Heading' }),
          productlist: Types.Array({
            label: 'Why-EZE Description',
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
