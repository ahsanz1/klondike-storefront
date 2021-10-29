const { Types } = require('@teamfabric/xpm')
exports.default = Types.Component({
  id: 'VideoGallery',
  label: 'VideoGallery',
  isGlobal: false,
  description: `Address component where each child has 4 text options  attributes for 
  displaying text as paragraph or list`,
  attributes: {
    heading: Types.String({
      label: 'Heading',
    }),
    paragraph: Types.String({
      label: 'paragraph',
    }),
    bigVideodata: Types.Array({
      label: 'bigger sized video',
      children: Types.Shape({
        children: {
          title: Types.String({ label: 'video title' }),
          src: Types.String({ label: 'video URL' }),
          details: Types.RichText({ label: 'about the video' }),
        },
      }),
    }),
    smallVideodata: Types.Array({
      label: 'smaller sized video',
      children: Types.Shape({
        children: {
          title: Types.String({ label: 'video title' }),
          src: Types.String({ label: 'video URL' }),
          details: Types.RichText({ label: 'about the video' }),
        },
      }),
    }),
  },
})
