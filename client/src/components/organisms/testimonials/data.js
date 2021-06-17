import Testimonial1 from 'images/testimonials_1.svg'
import Testimonial2 from 'images/testimonials_2.svg'
import Testimonial3 from 'images/testimonials_3.svg'

const testimonialsData = {
  desktopPrefix: '2,000+',
  desktopSuffix: 'Reviews',
  mobilePrefix: '2k+',
  mobileSuffix: 'Reviews',
  discount: '★★★★★',
  headingColor: '#000',
  discountColor: '#ffd17b',
  testimonials: [
    {
      desc:
        '“IQBAR provides a perfect combination of clean, mindful ingredients that fuel my body and keep me focused while teaching yoga classes - I keep the studio stocked!”',
      name: '- Taylor P., Portland, ME',
      imgUrl: Testimonial1,
      imgAlt: 'Testimonial 1',
    },
    {
      desc: `“Killer pre or post workout bar! Love that it's high in plant protein, and keto too.”`,
      name: '- Ryan G., Cincinnati, OH',
      imgUrl: Testimonial2,
      imgAlt: 'Testimonial 2',
    },
    {
      desc:
        '“I’m always reaching for these bars when working late nights on projects. They keep me energized without worrying about a sugar crash.”',
      name: '- Olivia M., Seattle, WA',
      imgUrl: Testimonial3,
      imgAlt: 'Testimonial 3',
    },
  ],
}

export default testimonialsData
