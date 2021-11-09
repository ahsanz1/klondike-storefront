const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'TechNews',
  label: 'TechNews',
  isGlobal: false,
  description: `Tech News component contains the description about each heading`,

  attributes: {
    mainHeading: Types.String({ label: 'Main Heading' }),
    categoryHeading: Types.String({ label: 'Categories Heading' }),
    techBlogData: Types.Array({
      label: 'Tech Blog Data',
      children: Types.Shape({
        children: {
          image: Types.Image({
            label: 'Section Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          date: Types.String({ label: 'Date' }),
          descHeading: Types.String({ label: 'Description Heading' }),
          text: Types.String({ label: 'Description' }),
          catagory: Types.String({ label: 'Category' }),
        },
      }),
    }),
  },
})
