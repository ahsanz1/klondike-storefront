const { Types } = require('@teamfabric/xpm')
exports.default = Types.Component({
  id: 'Catlog',
  label: 'Catlog',
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
    catData: Types.Array({
      label: 'Text ',
      children: Types.Shape({
        children: {
          text: Types.RichText({ label: 'Paragraph' }),
          mobileText: Types.RichText({ label: 'Mobile Paragraph' }),
        },
      }),
    }),
  },
})
