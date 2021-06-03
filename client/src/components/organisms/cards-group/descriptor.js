const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'CardsGroup',
  label: 'Cards Group',
  isGlobal: false,
  description:
    'Card group component with options for a card image, primary and secondary text',
  attributes: {
    bgColor: Types.String({
      label: 'background color(eg: #FF0000)',
    }),
    heading: Types.String({
      label: 'heading',
    }),
    cardItemsInRow: Types.String({ label: 'Total card items in row' }),
    imageMaxWidth: Types.String({ label: 'Max width for card image' }),
    cardsData: Types.Array({
      label: 'cards',
      children: Types.Shape({
        children: {
          image: Types.Image({
            label: 'image',
            url: Types.String({ label: 'URL' }),
            altText: Types.String({ label: 'Alt text' }),
          }),
          primaryText: Types.Array({
            label: 'card title',
            children: Types.Shape({
              children: {
                title: Types.String({ label: 'title' }),
              },
            }),
          }),
          secondaryText: Types.Array({
            label: 'card secondary text',
            children: Types.Shape({
              children: {
                secondaryText: Types.String({ label: 'text' }),
              },
            }),
          }),
        },
      }),
    }),
  },
})
