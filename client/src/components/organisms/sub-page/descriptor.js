const { Types } = require('@teamfabric/xpm')
exports.default = Types.Component({
  id: 'SubItem',
  label: 'SubItem',
  isGlobal: false,
  description: `Address component where each child has 4 text options  attributes for 
  displaying text as paragraph or list`,
  attributes: {
    datasubpage: Types.Array({
      label: 'Text ',
      children: Types.Shape({
        children: {
          heading: Types.RichText({ label: 'heading' }),
          Paragraph: Types.RichText({ label: 'Paragraph' }),
          image: Types.Image({
            label: 'Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
        },
      }),
    }),
  },
})
