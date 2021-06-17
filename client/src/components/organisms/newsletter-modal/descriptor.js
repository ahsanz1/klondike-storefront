const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'NewsLetterModal',
  label: 'NewsLetterModal',
  isGlobal: true,
  description:
    'NewsLetterModal component with title, subtitle, image, success code options',
  attributes: {
    image: Types.Image({
      label: 'image',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    successImage: Types.Image({
      label: 'success image',
      url: Types.String({ label: 'URL' }),
      altText: Types.String({ label: 'Alt text' }),
    }),
    title: Types.String({ label: 'Newsletter title' }),
    subTitle: Types.String({ label: 'Newsletter title' }),
    alertTitle: Types.String({ label: 'Alert title' }),
    successAlertText: Types.String({ label: 'Success alert text' }),
    successCode: Types.String({ label: 'success code' }),
  },
})
