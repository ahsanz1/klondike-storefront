const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'AboutUs',
  label: 'About Us Page',
  description: `About us component where each child has 4 text options and boolean attributes for 
  displaying text as paragraph or dialogue`,

  attributes: {
    desktopHeroImage: Types.Image({
      label: 'Desktop hero banner',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    mobileHeroImage: Types.Image({
      label: 'Mobile hero banner',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    aboutUsContent: Types.Array({
      label: 'Section Content',
      children: Types.Shape({
        children: {
          image: Types.Image({
            label: 'Section Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          text: Types.String({ label: 'Text' }),
          firstText: Types.String({ label: 'First text' }),
          secondText: Types.String({ label: 'Second text' }),
          thirdText: Types.String({ label: 'Third text' }),
          paragraph: Types.Boolean({ label: 'Is paragraph' }),
          dialogue: Types.Boolean({ label: 'Is dialogue' }),
        },
      }),
    }),
  },
})
