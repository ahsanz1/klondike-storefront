const { Types } = require('@teamfabric/xpm')

exports.default = Types.Component({
  id: 'StoreLocator',
  label: 'Store Locator',
  isGlobal: false,
  description: 'store locator',
  attributes: {
    apiKey: Types.String({ label: 'Google maps API key' }),
    locations: Types.Array({
      label: 'Locations',
      children: Types.Shape({
        children: {
          name: Types.String({ label: 'Location name' }),
          address: Types.String({ label: 'Address' }),
          city: Types.String({ label: 'City' }),
          state: Types.String({ label: 'State' }),
          zip: Types.String({ label: 'Zip Code' }),
          lat: Types.Number({ label: 'Latitude' }),
          lng: Types.Number({ label: 'Longitude' }),
        },
      }),
    }),
  },
})
