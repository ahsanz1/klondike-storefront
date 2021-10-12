const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'DistributionProduct',
  label: 'Alt Img Text Product',
  isGlobal: false,
  description: `Distribution component where each child has 4 text options and boolean attributes for 
  displaying text as paragraph or dialogue`,

  attributes: {
    distributionheading: Types.String({ label: 'Text' }),
    LubricantContent: Types.Array({
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
          btnUrl: Types.String({ label: 'Button Url' }),
          redirecturl: Types.String({ label: 'Redirect Url' }),
          outerboreder: Types.Boolean({ label: 'Border' }),
        },
      }),
    }),
  },
})
