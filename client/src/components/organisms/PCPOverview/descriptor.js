const { Types } = require('@teamfabric/xpm')
exports.default = Types.Component({
  id: 'PCPOverview',
  label: 'PCP Content',
  isGlobal: false,
  description: `PCP component where each child has 2 text options and boolean attributes for 
  displaying text as paragraph or list`,
  attributes: {
    heading: Types.String({
      label: 'Heading',
    }),

    productcontent: Types.Array({
      label: 'Paragraph',
      children: Types.Shape({
        children: {
          text: Types.String({ label: 'Paragraph' }),
        },
      }),
    }),
  },
})
