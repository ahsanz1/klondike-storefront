const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'ReferEarn',
  label: 'Refer Earn Page',
  description: 'ReferEarn component',
  attributes: {
    bannerImage: Types.Image({
      label: 'logo',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    title: Types.String({ label: 'Heading' }),
    textBody: Types.String({ label: 'Description' }),
    emailPrimaryText: Types.String({ label: 'Email primary text' }),
    emailSecondaryText: Types.String({ label: 'Email secondary text' }),
    namePrimaryText: Types.String({ label: 'Name primary text' }),
    nameSecondaryText: Types.String({ label: 'Name secondary text' }),
    emailPlaceholder: Types.String({ label: 'Email Placeholder' }),
    namePlaceholder: Types.String({ label: 'Name Placeholder' }),
    getInviteButtonText: Types.String({ label: 'Invite Button text' }),

    inviteFooterheading: Types.String({ label: 'Heading' }),
    inviteFooterIcons: Types.Array({
      label: 'Icons',
      children: Types.Shape({
        children: {
          icon: Types.Image({
            label: 'Icon Image',
            url: Types.String({ label: 'Icon URL' }),
            altText: Types.String({ label: 'Alt Text' }),
          }),
          text: Types.String({ label: 'title' }),
        },
      }),
    }),
  },
})
