const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'HomeLubricant',
  label: 'Bottom Banner Content',
  isGlobal: false,
  description: `Home Bottom Baner component where each child has 2 text options and one is for heading and other is Paragraph`,

  attributes: {
    bannersubheading: Types.String({ label: 'Banner Heading' }),
    bannerparagraph: Types.String({ label: 'Text' }),
  },
})
