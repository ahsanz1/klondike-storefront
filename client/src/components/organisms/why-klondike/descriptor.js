const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'WhyKlondike',
  label: 'WhyKlondike',
  isGlobal: false,
  description: 'WhyKlondike section',
  attributes: {
    heading: Types.String({ label: 'Heading' }),
    paragragh: Types.String({ label: 'Paragraph' }),

    whyKlondikeData: Types.Array({
      label: 'Heading & Paragaph',
      children: Types.Shape({
        children: {
          title: Types.String({ label: 'Heading Text' }),
          paragragh: Types.String({ label: 'Paragraph' }),
        },
      }),
    }),
  },
})
