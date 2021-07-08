const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'ClientTestimonial',
  label: 'Client Testimonai',
  description: `About us component where each child has 4 text options and boolean attributes for 
  displaying text as paragraph or dialogue`,

  attributes: {
    testimonial: Types.Array({
      label: 'Section Content',
      children: Types.Shape({
        children: {
          image: Types.Image({
            label: 'Section Image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          headingtext: Types.String({ label: 'Heading' }),
          text: Types.String({ label: 'Text' }),
        },
      }),
    }),
  },
})
