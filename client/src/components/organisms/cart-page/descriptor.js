const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'CartPage',
  label: 'Cart Page',
  isGlobal: false,
  description: 'Cart page component',
  attributes: {
    emptyCartPageTitle: Types.String({ label: 'Empty Cart Page Title' }),
    emptyCartPageSubtitle: Types.String({ label: 'Empty Cart Page Subtitle' }),
    emptyCartBtnText: Types.String({ label: 'Shop Btn Text' }),
    emptyCartBtnLink: Types.String({ label: 'Shop Btn URL' }),
  },
})
