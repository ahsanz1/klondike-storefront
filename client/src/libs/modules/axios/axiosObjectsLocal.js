import axios from 'axios'
import HEADERS from './headers'

export const common = axios.create({
  baseURL: '/',
  headers: HEADERS.common,
})
