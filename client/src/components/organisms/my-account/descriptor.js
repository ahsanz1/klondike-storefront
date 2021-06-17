const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'MyAccount',
  label: 'My Account Page',
  isGlobal: false,
  description: 'My account page',
  attributes: {
    btnText: Types.String({ label: 'Subscription Button Text' }),
    btnLink: Types.String({ label: 'Subscription Button Link' }),
    orderLink: Types.String({ label: 'Order Item Link' }),
    addressesText: Types.String({ label: 'Address Page Link Text' }),
    addressesLink: Types.String({ label: 'Addresses Page Link' }),
    shopBtnText: Types.String({ label: 'Shop Button Text' }),
    shopBtnLink: Types.String({ label: 'Shop Button Link' }),
  },
})
