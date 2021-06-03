const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'Faqs',
  label: 'Faqs Page',
  isGlobal: false,
  description: `FAQs component with options for bgColor, section heading and an array of questions
                and answers`,
  attributes: {
    backgroundColor: Types.String({
      label: 'Faqs background color(eg: #FF0000)',
    }),
    desktopHeading: Types.String({ label: 'faqs heading' }),
    mobileHeading: Types.String({ label: 'faqs mobile heading' }),
    faqsData: Types.Array({
      label: 'faqs',
      children: Types.Shape({
        children: {
          question: Types.String({ label: 'question' }),
          answer: Types.RichText({ label: 'answer' }),
        },
      }),
    }),
  },
})
