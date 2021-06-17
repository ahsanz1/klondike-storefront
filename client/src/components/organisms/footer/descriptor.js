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
    policyText: Types.String({ label: 'Policy text with year ' }),
    privacyTitle: Types.String({ label: 'privacy policy title' }),
    privacyLink: Types.String({ label: 'privacy policy link' }),
    returnPolicyTitle: Types.String({ label: 'Return policy title' }),
    returnPolicyLink: Types.String({ label: 'Return Policy Link' }),
    tosTitle: Types.String({ label: 'TOS Title' }),
    tosLink: Types.String({ label: 'TOS Link' }),

    newsLetterTitle: Types.String({ label: 'NewsLetter Title' }),
    newsLetterDesc: Types.String({ label: 'NewsLetter Desc' }),
    paymentText: Types.String({ label: 'Payment Text' }),
    paymentMethodsImage: Types.Image({
      label: 'Payment Method Image',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
  },
})
