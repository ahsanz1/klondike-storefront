const { Types } = require('@teamfabric/xpm')
exports.default = Types.Component({
  id: 'Oamspproval',
  label: 'Oamspproval',
  isGlobal: false,
  description: `Address component where each child has 4 text options  attributes for 
  displaying text as paragraph or list`,
  attributes: {
    heading: Types.String({
      label: 'Heading',
    }),
    oam: Types.Array({
      label: 'Text ',
      children: Types.Shape({
        children: {
          image: Types.Image({
            label: 'main image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          heading: Types.String({ label: 'Paragraph' }),
          description: Types.RichText({ label: 'Paragraph' }),
          lebal: Types.Image({
            label: 'arrow ',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
        },
      }),
    }),
  },
})
