const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'PolicyPage',
  label: 'Policy Page',
  isGlobal: false,
  description: 'Policy Page',
  attributes: {
    page: Types.RichText({ label: 'Policy page' }),
  },
})
