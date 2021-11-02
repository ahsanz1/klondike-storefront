const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'Technical',
  label: 'Technical Document',
  isGlobal: false,
  description: 'Technical Docutments page',

  attributes: {
    title: Types.String({
      label: 'Title',
    }),
    paragraph: Types.RichText({
      label: 'paragraph',
    }),
    faq: Types.Array({
      label: 'accordian box',
      children: Types.Shape({
        children: {
          question: Types.String({ label: 'heading' }),
          tableData: Types.Array({
            label: 'accordian table',
            children: Types.Shape({
              children: {
                product: Types.String({ label: 'table product title' }),
                PSDENGLISH: Types.String({ label: 'english PSD link ' }),
                PSDFRENCH: Types.String({ label: 'french PSD link ' }),
                SDSENGLISH: Types.String({ label: 'english SDS link ' }),
                SDSFRENCH: Types.String({ label: 'french SDS link ' }),
              },
            }),
          }),
        },
      }),
    }),
  },
})
