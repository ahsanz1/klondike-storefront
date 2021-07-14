const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'CommitedSuccess',
  label: 'CommitedSuccess Component',
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
        },
      }),
    }),
  },
})
