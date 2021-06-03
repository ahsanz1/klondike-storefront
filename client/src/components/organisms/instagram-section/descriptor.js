const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'InstagramSection',
  label: 'Instagram Section',
  description: 'Instagram section for homepage',
  attributes: {
    title: Types.String({ label: 'Title' }),
    link: Types.String({ label: 'Instagram profile link' }),
    accessToken: Types.String({ label: 'Instagram Access Token ' }),
    instaId: Types.String({ label: 'Instagram Insta ID ' }),
  },
})
