export const FORMATTED_ADDRESS_URL = ({ lat, lng }, apiKey) =>
  'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
  lat +
  ',' +
  lng +
  '&key=' +
  apiKey

export const SEARCH_LOCATION_URL = (place, apiKey) =>
  'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=' +
  place +
  '&inputtype=textquery&fields=formatted_address,geometry&key=' +
  apiKey
