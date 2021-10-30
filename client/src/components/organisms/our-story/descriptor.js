const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'Our Story',
  label: 'Our Story',
  isGlobal: false,
  description: `Our Story component contains details which are to be printed on the our story page, it contains title, paragraphs and seperate highlighted paragraph`,

  attributes: {
    OurStoryData: Types.Array({
      label: 'Our Story Data',
      children: Types.Shape({
        children: {
          title: Types.String({ label: 'Title' }),
          subSection: Types.Array({
            label: 'paragraph-Section',
            children: Types.Shape({
              children: {
                paragraph: Types.RichText({ label: 'paragraph' }),
                highlightedParagraph: Types.RichText({
                  label: 'highlighted paragraph',
                }),
              },
            }),
          }),
        },
      }),
    }),
  },
})
