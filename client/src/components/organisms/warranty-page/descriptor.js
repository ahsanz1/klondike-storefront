const { Types } = require('@teamfabric/xpm')
exports.default = Types.Component({
  id: 'WarrantyPage',
  label: 'WarrantyPage',
  isGlobal: false,
  description: `Address component where each child has 4 text options  attributes for 
  displaying text as paragraph or list`,
  attributes: {
    heading: Types.String({
      label: 'Heading',
    }),
    image: Types.Image({
      label: 'Section Image',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    warData: Types.Array({
      label: 'Text ',
      children: Types.Shape({
        children: {
          text: Types.RichText({ label: 'Paragraph' }),
          Url: Types.String({ label: 'link URL' }),
        },
      }),
    }),
  },
})
