import { getCookie, setCookie } from 'tiny-cookie'

export const getJSONCookie = key => getCookie(key, JSON.parse)

export const setJSONCookie = (key, value, options) =>
  setCookie(key, value, JSON.stringify, options)
