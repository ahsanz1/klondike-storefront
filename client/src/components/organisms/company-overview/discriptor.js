// const { Types } = require('@teamfabric/xpm')

// exports.default = Types.Component({
//   id: 'OverView',
//   label: 'Company Over View Component',
//   isGlobal: false,
//   description: `Company Over-View component contains the description about each heading and the bottom section contains button that will redirect you to specific page for futher details`,

//   attributes: {
//     mainHeading: Types.String({ label: 'Main Heading' }),
//     commited: Types.Array({
//       label: 'Company Over-View Section Content',
//       children: Types.Shape({
//         children: {
//           subHeading: Types.String({ label: 'Sub Heading' }),
//           subSection: Types.Array({
//             label: 'Description-Section',
//             Children: Types.Shape({
//               children: {
//                 paragraph: Types.String({ label: 'Description' }),
//               },
//             }),
//           }),
//           // butontext: Types.String({ label: 'Button Text' }),
//           // redirectUrl: Types.String({ label: 'Redirect URL' }),
//         },
//       }),
//     }),
//   },
// })
const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'CommitedSuccess',
  label: 'CommitedSuccess Component222',
  isGlobal: false,
  description: `Commited component where each child has 4 text options and boolean attributes for 
  displaying text as paragraph or dialogue`,

  attributes: {
    commited: Types.Array({
      label: 'Commited Section Content',
      children: Types.Shape({
        children: {
          heading: Types.String({ label: 'Heading' }),
          subheading: Types.String({ label: 'Sub Heading' }),
          paragraph: Types.String({ label: 'Text' }),
          butontext: Types.String({ label: 'Button Text' }),
          redirectUrl: Types.String({ label: 'Redirect URL' }),
        },
      }),
    }),
  },
})
