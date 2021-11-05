const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'ancelliry',
  label: 'ancelliry Sidebar',
  isGlobal: false,
  description: `ancelliry descriptor sidebar`,

  attributes: {
    AboutUsXPM: Types.Array({
      label: 'Common Sidebar',
      children: Types.Shape({
        children: {
          title: Types.String({ label: 'Title' }),
          categoryName: Types.String({ label: 'Title' }),
          subItem: Types.String({ label: 'Title' }),
          link: Types.String({ label: 'Title' }),
        },
      }),
    }),
  },
})
