const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'TestimonialSection',
  label: 'TestimonialSection',
  isGlobal: false,
  description: 'List of Categories ',
  attributes: {
    heading: Types.String({ label: 'Heading' }),
    testimonials: Types.Array({
      label: 'Testimonial',
      children: Types.Shape({
        children: {
          title: Types.String({ label: 'Title' }),
          subTitle: Types.String({ label: 'Title' }),
        },
      }),
    }),
  },
})
