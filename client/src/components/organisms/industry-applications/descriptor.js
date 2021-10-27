const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'IndustryApplications',
  label: 'IndustryApplications',
  isGlobal: false,
  description: `Commited component where each child has 4 text options and boolean attributes for 
  displaying text as paragraph or dialogue`,

  attributes: {
    heading: Types.String({ label: 'Heading Text' }),
    text: Types.String({ label: 'paragragh Text' }),
    videourl: Types.String({ label: 'video url' }),
    paragraph: Types.String({ label: 'paragragh Text' }),
    // aboutUsLinks: Types.Array({
    //   label: 'Page blog post Content',
    //   children: Types.Shape({
    //     children: {
    //       Image: Types.Image({
    //         label: 'Image',
    //         url: Types.String({ label: 'URL' }),
    //         altText: Types.String({ label: 'Alt text' }),
    //       }),
    //       title: Types.String({ label: 'Heading' }),
    //       paragragh: Types.String({ label: 'paragragh Text' }),
    //     },
    //   }),
    // }),
  },
})
