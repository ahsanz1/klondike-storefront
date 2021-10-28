const { Types } = require('@teamfabric/xpm')
exports.default = Types.Component({
  id: 'WarrantyPage',
  label: 'WarrantyPage',
  isGlobal: false,
  description: `Address component where each child has 4 text options  attributes for 
  displaying text as paragraph or list`,
  attributes: {
    heading: Types.String({
      label: 'Heading',
    }),
    image: Types.Image({
      label: 'Section Image',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    warData: Types.Array({
      label: 'Text ',
      children: Types.Shape({
        children: {
          text: Types.RichText({ label: 'Paragraph' }),
        },
      }),
    }),
    pcpBottom: Types.Array({
      label: 'PCP-Bottom',
      children: Types.Shape({
        children: {
          image: Types.Image({
            label: 'Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          button: Types.String({ label: 'Button Text' }),
          url: Types.String({ label: 'URL' }),
          mobileButton: Types.String({ label: 'Mobile Button Text' }),
        },
      }),
    }),
  },
})
