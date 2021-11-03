const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'HomeBanner',
  label: 'HomeBanner Component',
  isGlobal: false,
  description: `Commited component where each child has 4 text options and boolean attributes for 
  displaying text as paragraph or dialogue`,

  attributes: {
    bannerComponent: Types.Array({
      label: 'Page Banner Section Content',
      children: Types.Shape({
        children: {
          backgroundimg: Types.Image({
            label: 'background Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          backgroundimgMobile: Types.Image({
            label: 'Mobile background Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          banerlogoimg: Types.Image({
            label: 'Section Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          heading: Types.String({ label: 'Heading' }),
          mobileHeading: Types.String({ label: 'Mobile Heading' }),
          buttontxt: Types.String({ label: 'Button Text' }),
          searchUrl: Types.String({ label: 'Search URL' }),
        },
      }),
    }),
  },
})
