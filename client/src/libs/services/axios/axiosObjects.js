import axios from 'axios'
import { apiDomain } from 'libs/general-config'
import HEADERS from './headers'

export const common = axios.create({
  baseURL: apiDomain,
  headers: HEADERS.common,
})

export const klayvio = axios.create({
  baseURL: apiDomain,
  headers: HEADERS.klayvio,
})
