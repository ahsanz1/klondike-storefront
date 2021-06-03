const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'MainPageHero',
  label: 'HomePage Hero Banner',
  isGlobal: false,
  description: 'Hero banner for homepage',
  attributes: {
    desktopVideo: Types.String({ label: 'Url of desktop video' }),
    mobileVideo: Types.String({ label: 'Url of mobile video' }),
    heroImage: Types.Image({
      label: 'Hero Box Image',
      url: Types.String({ label: 'url of hero banner image' }),
      altText: Types.String({
        label: 'alternative text of the hero banner image',
      }),
    }),
    firstDesktopHeading: Types.String({
      label: 'first heading on desktop',
    }),
    secondDesktopHeading: Types.String({
      label: 'second heading on desktop',
    }),
    mobileHeading: Types.String({
      label: 'heading on mobile',
    }),
    bulletPoints: Types.Array({
      label: 'Bullet Points',
      children: Types.Shape({
        children: {
          bulletUrl: Types.String({ label: 'Bullet icon url' }),
          bulletPoint: Types.String({ label: 'Bullet point text' }),
        },
      }),
    }),
    buttonText: Types.String({ label: 'Text of the button' }),
    buttonLink: Types.String({ label: 'Link of the button' }),
  },
})
