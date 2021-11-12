const { Types } = require('@teamfabric/xpm')
exports.default = Types.Component({
  id: 'PrivacyPolicy',
  label: 'Privacy Policy',
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
    paragraph: Types.Array({
      label: 'Paragraph',
      children: Types.Shape({
        children: {
          paragraphs: Types.String({ label: 'Paragraph' }),
        },
      }),
    }),
    policyList: Types.Array({
      label: 'List item',
      children: Types.Shape({
        children: {
          heading: Types.String({ label: 'heading' }),
          data: Types.RichText({ label: 'body' }),
        },
      }),
    }),
  },
})
