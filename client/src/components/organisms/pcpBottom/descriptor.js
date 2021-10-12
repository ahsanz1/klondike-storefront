const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'PCPBottom',
  label: 'pcp bottom section',
  isGlobal: false,
  description: 'pcp bottom section',
  attributes: {
    plpBottom: Types.Array({
      label: 'PCP-Bottom',
      children: Types.Shape({
        children: {
          plpBottomImage: Types.Image({
            label: 'Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          button: Types.String({ label: 'Button Text' }),
          mobileButton: Types.String({ label: 'Mobile Button Text' }),
        },
      }),
    }),
  },
})
