export const MAP_LIBS = ['places']
export const METER_TO_UNIT = {
  miles: 1600,
  kilometers: 1000,
}
export const DIRECTION_URL = (sAddress, dAddress, dCity, dState, dZip) =>
  'https://maps.google.com/maps?saddr=' +
  sAddress +
  '&daddr=' +
  dAddress +
  ' ' +
  dCity +
  ' ' +
  dState +
  ' ' +
  dZip
