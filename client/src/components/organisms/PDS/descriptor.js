const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'PDS',
  label: 'PDS',
  isGlobal: false,
  description: 'PDS bottom section',
  attributes: {
    pcpbottom: Types.Array({
      label: 'Paragraph',
      children: Types.Shape({
        children: {
          image: Types.Image({
            label: 'Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          button: Types.String({ label: 'Button Text' }),
          url: Types.String({ label: 'Button URL' }),
          mobileButton: Types.String({ label: 'Mobile Button Text' }),
        },
      }),
    }),
  },
})
