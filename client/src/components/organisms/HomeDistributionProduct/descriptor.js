const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'HomeDistributionProduct ',
  label: 'Distribution Product',
  description: `About us component where each child has 4 text options and boolean attributes for 
  displaying text as paragraph or dialogue`,

  attributes: {
    distributionProduct: Types.Array({
      label: 'Product List',
      children: Types.Shape({
        children: {
          image: Types.Image({
            label: 'Section Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          text: Types.String({ label: 'Text' }),
          headingtext: Types.String({ label: 'Heading text' }),
          btntext: Types.String({ label: 'button text' }),
          outerboreder: Types.Boolean({ label: 'Border' }),
        },
      }),
    }),
  },
})
