const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'MissionStatement',
  label: 'HomePage Mission Statement',
  isGlobal: false,
  description: 'Mission statement banner for home page',
  attributes: {
    desktopPrefix: Types.String({ label: 'Text before underline text' }),
    desktopSuffix: Types.String({ label: 'Text after underline text' }),
    headingColor: Types.String({ label: 'Heading color' }),
    underlineText: Types.String({ label: 'Underline text' }),
    underlineTextColor: Types.String({ label: 'Underline text color' }),
    image: Types.Image({
      label: 'Mission statement Image',
      url: Types.String({ label: 'Image URL' }),
      altText: Types.String({
        label: 'Alt text',
      }),
    }),
  },
})
