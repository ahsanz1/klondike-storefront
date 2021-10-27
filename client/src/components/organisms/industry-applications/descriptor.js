const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'IndustryApplications',
  label: 'IndustryApplications',
  isGlobal: false,
  description: `Commited component where each child has 4 text options and boolean attributes for 
  displaying text as paragraph or dialogue`,

  attributes: {
    IndustryApplicationsWrapper: Types.Array({
      label: 'Page Banner Section Content',
      children: Types.Shape({
        children: {
          heading: Types.String({ label: 'Heading' }),
          paragragh: Types.String({ label: 'paragragh Text' }),
          videoUrl: Types.String({ label: 'video URL' }),
          paragragh2: Types.String({ label: 'paragragh Text' }),
        },
      }),
    }),
    aboutUsLinks: Types.Array({
      label: 'Page Banner Section Content',
      children: Types.Shape({
        children: {
          Image: Types.Image({
            label: 'Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          title: Types.String({ label: 'Heading' }),
          paragragh: Types.String({ label: 'paragragh Text' }),
        },
      }),
    }),
  },
})
