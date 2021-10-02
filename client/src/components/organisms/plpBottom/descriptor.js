const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'PLPBottom',
  label: 'plp bottom section',
  isGlobal: false,
  description: 'plp bottom section',
  attributes: {
    plpBottom: Types.Array({
      label: 'PLP-Bottom',
      children: Types.Shape({
        children: {
          plpBottomImage: Types.Image({
            label: 'Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          button: Types.String({ label: 'Button Text' }),
          buttonUrl: Types.String({ label: 'Button URL' }),
          mobileButton: Types.String({ label: 'Mobile Button Text' }),
          mobileButtonUrl: Types.String({ label: 'Mobile Button URL' }),
        },
      }),
    }),
  },
})
