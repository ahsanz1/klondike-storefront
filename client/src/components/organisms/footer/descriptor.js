const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'Footer',
  label: 'Footer',
  isGlobal: true,
  description:
    'Footer component with options for bgColor, company logo image and footer links',
  attributes: {
    backgroundColor: Types.String({
      label: 'Footer background color(eg: #FF0000)',
    }),
    footerimg: Types.Image({
      label: 'Footer Img',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),

    logoImage: Types.Image({
      label: 'logo',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    footerLinks: Types.Array({
      label: 'Footer Links',
      children: Types.Shape({
        children: {
          heading: Types.String({ label: 'Links heading' }),
          footerAccount: Types.String({ label: 'Footer Account' }),
          headingLinks: Types.String({ label: 'Footer Heading Link' }),
          links: Types.Array({
            label: 'Links',
            children: Types.Shape({
              children: {
                text: Types.String({ label: 'title' }),
                url: Types.String({ label: 'URL' }),
                external: Types.Boolean({ label: 'Is External Link?' }),
              },
            }),
          }),
        },
      }),
    }),
    socialLinks: Types.Array({
      label: 'Social Links',
      children: Types.Shape({
        children: {
          link: Types.String({ label: 'Url' }),
          icon: Types.Image({
            label: 'logo',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
        },
      }),
    }),
    logoDescription: Types.String({ label: 'Description' }),
    logoDescriptionValues: Types.String({ label: 'Footer Description' }),
    privacyLink: Types.String({ label: 'privacy policy link' }),
    returnPolicyTitle: Types.String({ label: 'Terms Condition title' }),
    returnPolicyLink: Types.String({ label: 'Terms Conditions Link' }),
    connectKlondike: Types.String({ label: 'Connect klondike' }),
    connectKlondikeLink: Types.String({ label: 'Connect klondike Link' }),
    policyText: Types.String({ label: 'Copyright text with year ' }),
    privacyTitle: Types.String({ label: 'privacy policy title' }),
    // newsLetterTitle: Types.String({ label: 'NewsLetter Title' }),
    // newsLetterDesc: Types.String({ label: 'NewsLetter Desc' }),
    // paymentText: Types.String({ label: 'Payment Text' }),
    // paymentMethodsImage: Types.Image({
    //   label: 'Payment Method Image',
    //   url: Types.String({ label: 'URL' }),
    //   altText: Types.String({ label: 'Alt text' }),
    // }),
  },
})
