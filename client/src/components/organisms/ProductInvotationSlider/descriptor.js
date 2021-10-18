const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'ProductInvotationSlider',
  label: 'Product Slider',
  isGlobal: false,
  description: `Product slider component where each child has 2 text options  attributes for 
  displaying text as description and image`,

  attributes: {
    productHeading: Types.String({ label: 'Heading' }),
    productInovation: Types.Array({
      label: 'Section Content',
      children: Types.Shape({
        children: {
          image: Types.Image({
            label: 'Section Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          heading: Types.String({ label: 'Heading' }),
          detail: Types.String({ label: 'Text' }),
          sku: Types.String({ label: 'SKU' }),
        },
      }),
    }),
  },
})
