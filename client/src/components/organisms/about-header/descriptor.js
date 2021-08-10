const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'AboutKlondike',
  label: 'About Klondike',
  isGlobal: false,
  description: 'About Klondike',
  attributes: {
    aboutHeader: Types.Array({
      label: 'About Klondike',
      children: Types.Shape({
        children: {
          name: Types.String({ label: 'About Klondike' }),
        },
      }),
    }),
  },
})
