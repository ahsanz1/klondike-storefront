const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'WhatSection',
  label: 'Title With Description',
  isGlobal: false,
  description: 'What is IQBAR Section',
  attributes: {
    bgColor: Types.String({ label: 'background color of section' }),
    question: Types.String({ label: 'Title' }),
    answer: Types.String({ label: 'Description' }),
  },
})
