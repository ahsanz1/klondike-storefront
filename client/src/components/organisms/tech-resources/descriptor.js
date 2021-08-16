const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'TechResources',
  label: 'Tech Resources',
  isGlobal: false,
  description: 'Tech Resources',
  attributes: {
    techResources: Types.Array({
      label: 'Resources',
      children: Types.Shape({
        children: {
          name: Types.String({ label: 'Resource' }),
        },
      }),
    }),
  },
})
