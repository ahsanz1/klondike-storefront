const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'PressKit',
  label: 'Press Page',
  isGlobal: false,
  description: 'Press page',
  attributes: {
    desktopImage: Types.Image({
      label: 'Desktop Image',
      url: Types.String({
        label: 'Url of hero image for desktop screen',
      }),
      altText: Types.String({
        label: 'Alt text',
      }),
    }),
    mobileImage: Types.Image({
      label: 'Mobile Image',
      url: Types.String({
        label: 'Url of hero image for mobile screen',
      }),
      altText: Types.String({
        label: 'Alt text',
      }),
    }),
    tabs: Types.Array({
      label: 'Presskit Page Tabs',
      children: Types.Shape({
        children: {
          tabImage: Types.String({ label: 'Link of tab image' }),
          tabDescLink: Types.String({
            label: 'Link of the press source to navigate the user',
          }),
          tabDescImage: Types.String({
            label: 'Link of tab description image',
          }),
          tabDescText: Types.String({ label: 'Tab description text' }),
        },
      }),
    }),
    imagesAndLinks: Types.Array({
      label: 'Presskit Downloadable Content',
      children: Types.Shape({
        children: {
          imageUrl: Types.String({ label: 'Link for main image' }),
          imageAlt: Types.String({ label: 'Alt text' }),
          linkText: Types.String({ label: 'Link text' }),
          link: Types.String({
            label: 'Url of source to download the presskit',
          }),
        },
      }),
    }),
    headingParagraphs: Types.Array({
      label: 'Presskit Information Section',
      children: Types.Shape({
        children: {
          heading: Types.String({ label: 'Section Heading' }),
          firstPart: Types.String({
            label:
              'First part of the description, in case you have to add a link',
          }),
          linkText: Types.String({ label: 'Link text' }),
          linkUrl: Types.String({ label: 'Link for navigating the user' }),
          secondPart: Types.String({
            label:
              'Second part of the description, in case you have to add a link',
          }),
          bgColor: Types.Boolean({ label: 'Apply background color?' }),
        },
      }),
    }),
  },
})
