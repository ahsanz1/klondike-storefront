const { Types } = require('@teamfabric/xpm')
exports.default = Types.Component({
  id: 'Dealership',
  label: 'Dealership',
  isGlobal: false,
  description: `Address component where each child has 4 text options  attributes for 
  displaying text as paragraph or list`,
  attributes: {
    heading: Types.String({
      label: 'Heading',
    }),
    oppertunity: Types.Array({
      label: 'Text ',
      children: Types.Shape({
        children: {
          title: Types.RichText({ label: 'Paragraph' }),
        },
      }),
    }),
  },
})
