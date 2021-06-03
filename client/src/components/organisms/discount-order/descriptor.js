const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'DiscountOrder',
  label: 'HomePage Discounted Order',
  description: 'Discount Order Component',
  attributes: {
    desktopPrefix: Types.String({ label: 'Prefix Heading for Desktop' }),
    desktopSuffix: Types.String({ label: 'Suffix Heading for Desktop' }),
    mobilePrefix: Types.String({ label: 'Prefix Heading for Mobile' }),
    mobileSuffix: Types.String({ label: 'Suffix Heading for Mobile' }),
    discount: Types.String({ label: 'Discount Amount' }),
    discountColor: Types.String({ label: 'Discount Color' }),
    headingColor: Types.String({ label: 'Heading Color' }),
    text: Types.String({ label: 'Button Text' }),
    src: Types.String({ label: 'Button Icon Url' }),
    alt: Types.String({ label: 'Button Icon Alt' }),
    buttonLink: Types.String({ label: 'Button Link' }),
    imageList: Types.Array({
      label: 'Image List',
      children: Types.Shape({
        children: {
          image: Types.Image({
            label: 'Image',
            url: Types.String({ label: 'Image Url' }),
            altText: Types.String({ label: 'Image Alt' }),
            style: Types.String({ label: 'Image style' }),
          }),
        },
      }),
    }),
  },
})
