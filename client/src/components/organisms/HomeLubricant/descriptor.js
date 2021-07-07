const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'HomeLubricant',
  label: 'Bottom Banner Content',
  description: `Home Bottom Baner component where each child has 2 text options and one is for heading and other is Paragraph`,

  attributes: {
    props: Types.Array({
      label: 'Banner Bottom Content',
      children: Types.Shape({
        children: {
          bannersubheading: Types.String({ label: 'Banner Text' }),
          bannerparagraph: Types.String({ label: 'Text' }),
        },
      }),
    }),
  },
})
