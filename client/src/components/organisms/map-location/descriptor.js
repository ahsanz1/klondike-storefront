const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'MapLocation',
  label: 'Pin Location on Map',
  isGlobal: false,
  description: 'Pin Location on Map',
  attributes: {
    title: Types.String({ label: 'Title' }),
    apiKey: Types.String({ label: 'Api Key' }),
    positionLat: Types.String({ label: 'Coord lat' }),
    positionLng: Types.String({ label: 'Coord lng' }),
    description: Types.String({ label: 'Description' }),
  },
})
