const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'OverView',
  label: 'OverView',
  isGlobal: false,
  description: `Company Over-View component contains the description about each heading and the bottom section contains button that will redirect you to specific page for futher details`,

  attributes: {
    mainHeading: Types.String({ label: 'Main Heading' }),
    commited: Types.Array({
      label: 'Company Over-View Section Content',
      children: Types.Shape({
        children: {
          subHeading: Types.String({ label: 'Sub Heading' }),
          subSection: Types.Array({
            label: 'Description-Section',
            children: Types.Shape({
              children: {
                paragraph: Types.RichText({ label: 'Description' }),
              },
            }),
          }),
        },
      }),
    }),
  },
})
