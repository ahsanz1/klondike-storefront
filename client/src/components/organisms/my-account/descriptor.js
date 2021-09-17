const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'MyAccount',
  label: 'Account',
  isGlobal: false,
  description: 'My account page',
  attributes: {
    orderLink: Types.String({ label: 'Order Item Link' }),
    title: Types.String({ label: 'Account' }),
    logoutBtnText: Types.String({ label: 'Log out' }),
  },
})
