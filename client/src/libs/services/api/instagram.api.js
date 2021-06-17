import axios from 'axios'
import ENDPOINTS from 'libs/services/endpoints'

export const fetchInstaPosts = (accessToken, instaId) => {
  return axios.get(ENDPOINTS.GET.getInstagramPosts(accessToken, instaId))
}

export const fetchInstaProfile = (accessToken, instaId) => {
  return axios.get(ENDPOINTS.GET.getInstaUser(accessToken, instaId))
}
