const { Types } = require('@teamfabric/xpm')
exports.default = Types.Component({
  id: 'ContactAddres',
  label: 'Address',
  isGlobal: false,
  description: `Address component where each child has 4 text options and boolean attributes for 
  displaying text as paragraph or list`,
  attributes: {
    Addresdata: Types.Array({
      label: 'Address List ',
      children: Types.Shape({
        children: {
          heading: Types.String({ label: 'Heading' }),
          label: Types.String({ label: 'Label' }),
          street: Types.String({ label: 'Street' }),
          postal: Types.String({ label: 'Postal' }),
        },
      }),
    }),
  },
})
