const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'OverViewLinks',
  label: 'OverViewLinks',
  isGlobal: false,
  description: `Company Over-View component contains the description about each heading and the bottom section contains button that will redirect you to specific page for futher details`,

  attributes: {
    aboutUsLinks: Types.Array({
      label: 'Mid Over-View Section Content',
      children: Types.Shape({
        children: {
          image: Types.Image({
            label: 'Section Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          title: Types.String({ label: 'Title' }),
          paragraph: Types.RichText({ label: 'Description' }),
          buttonText: Types.String({ label: 'Button Text' }),
          redirectUrl: Types.String({ label: 'Redirect URL' }),
          buttonImage: Types.Image({
            label: 'Button Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
        },
      }),
    }),
  },
})
