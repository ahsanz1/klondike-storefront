const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'Testimonials',
  label: 'Testimonials',
  description: 'Testimonials section',
  attributes: {
    bgColor: Types.String({ label: 'Background Color' }),
    desktopPrefix: Types.String({ label: 'Prefix Heading for Desktop' }),
    desktopSuffix: Types.String({ label: 'Suffix Heading for Desktop' }),
    mobilePrefix: Types.String({ label: 'Prefix Heading for Mobile' }),
    mobileSuffix: Types.String({ label: 'Suffix Heading for Mobile' }),
    discount: Types.String({ label: 'Stars ★' }),
    discountColor: Types.String({ label: 'Stars Color' }),
    headingColor: Types.String({ label: 'Heading Color' }),
    testimonials: Types.Array({
      label: 'Testimonials List',
      children: Types.Shape({
        children: {
          name: Types.String({ label: 'Testimonial Name' }),
          desc: Types.String({ label: 'Testimonial Description' }),
          testimonialImg: Types.Image({
            label: 'Testimonial Image',
            url: Types.String({ label: 'Image Url' }),
            altText: Types.String({ label: 'Image Alt' }),
          }),
        },
      }),
    }),
  },
})
