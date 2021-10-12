const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'PLP-Filter',
  label: 'Product Listing Page',
  isGlobal: false,
  description: 'Product Listing Page',
  attributes: {
    filterSelect: Types.Array({
      label: 'Options',
      children: Types.Shape({
        children: {
          name: Types.String({ label: 'Option name' }),
        },
      }),
    }),
    size: Types.Array({
      label: 'Size',
      children: Types.Shape({
        children: {
          size: Types.String({ label: 'Add Size' }),
        },
      }),
    }),
    part: Types.Array({
      label: 'Part',
      children: Types.Shape({
        children: {
          part: Types.String({ label: 'Add Part' }),
        },
      }),
    }),
    unit: Types.Array({
      label: 'Unit',
      children: Types.Shape({
        children: {
          unit: Types.String({ label: 'Add Unit' }),
        },
      }),
    }),
    untitled: Types.Array({
      label: 'untitled',
      children: Types.Shape({
        children: {
          untitled: Types.String({ label: 'Add Untitled' }),
        },
      }),
    }),
    // multiFilter: Types.string({
    //   label: 'filter OPtion',
    //   attributes: {
    //     size: Types.Array({
    //       label: 'Size',
    //       children: Types.Shape({
    //         children: {
    //           size: Types.String({ label: 'Enter Size' }),
    //         },
    //       }),
    //     }),
    //   },
    // }),
  },
})
