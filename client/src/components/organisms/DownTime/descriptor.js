const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'DownTime',
  label: 'DowntTime Component',
  isGlobal: false,
  description: `About us component where each child has 4 text options and boolean attributes for 
  displaying text as paragraph or dialogue`,

  attributes: {
    downTimeCosting: Types.Array({
      label: 'Section Content',
      children: Types.Shape({
        children: {
          image: Types.Image({
            label: 'Section Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          heading: Types.String({ label: 'Heading' }),
          text: Types.String({ label: 'Text' }),
          buttontxt: Types.String({ label: 'Button Content' }),
          list: Types.Array({
            label: 'List Item',
            children: Types.Shape({
              children: {
                heading: Types.String({ label: 'List Heading' }),
                text: Types.String({ label: 'List Text' }),
              },
            }),
          }),

          Paragraph: Types.String({ label: 'paragraph' }),
        },
      }),
    }),
  },
})
