const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'SliderTabbable',
  label: 'Slider Tabbable',
  description: 'Slider Tabbable Component',
  attributes: {
    desktopHeading: Types.String({ label: 'Heading for Desktop' }),
    mobileHeading: Types.String({ label: 'Heading for Mobile' }),
    desktopHeadline: Types.String({ label: 'Headline for Desktop' }),
    mobileHeadline: Types.String({ label: 'Headline for Mobile' }),
    color: Types.String({ label: 'Text Color of heading, tabs and content' }),
    nutrients: Types.Array({
      label: 'Nutrients List',
      children: Types.Shape({
        children: {
          nutrientName: Types.String({ label: 'Nutrient Name' }),
          nutrientHeading1: Types.String({ label: 'Nutrient Heading 1' }),
          nutrientText: Types.String({ label: 'Nutrient Text' }),
          nutrientHeading2: Types.String({ label: 'Nutrient Heading 2' }),
          imgUrl: Types.String({ label: 'Image Url' }),
          imgAlt: Types.String({ label: 'Image Alt' }),
          mobileTitleImg: Types.String({ label: 'Mobile Title Image Url' }),
          mobileTitleImgAlt: Types.String({ label: 'Mobile Title Image Alt' }),
          benifits: Types.Array({
            label: 'Benifits',
            children: Types.Shape({
              children: {
                text: Types.String({ label: 'List text' }),
              },
            }),
          }),
          readmore: Types.RichText({ label: 'Read more' }),
          bgColor: Types.String({ label: 'Background Color' }),
          activeTabColor: Types.String({
            label: 'Active Tab Button Background Color',
          }),
        },
      }),
    }),
  },
})
