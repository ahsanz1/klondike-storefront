const { Types } = require('@teamfabric/xpm')
exports.default = Types.Component({
  id: 'TermsCondition',
  label: 'Legal',
  isGlobal: false,
  description: `Legal component where each child has 4 text options and boolean attributes for 
  displaying text as paragraph or list`,
  attributes: {
    heading: Types.String({
      label: 'Heading',
    }),
    subheading: Types.String({
      label: 'Sub Heading',
    }),
    paragraph: Types.String({
      label: 'Paragraph',
    }),
    termlist: Types.Array({
      label: 'List item',
      children: Types.Shape({
        children: {
          text: Types.String({ label: 'Text' }),
        },
      }),
    }),
  },
})
