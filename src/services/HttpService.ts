import axios from 'axios'
import { env } from '@/envinronment'

const config = {
  baseURL: env.api,
  headers: {
    'Accept': 'application/json'
  }
}

// create new axios instance.
const http = axios.create(config)

// Get current access token from storage.
const getTokenFromStorage = async () => {
  return window.localStorage.getItem('token')
}

// sets the access token as a common http header value for all request.
export const HttpSetAuthToken = (token) => {
  http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// gets tokenfrom storage and attaches it to all http requests headers.
const attachBearerTokenFromStorage = async (config?: object) => {
  const token = await getTokenFromStorage()
  HttpSetAuthToken(token)
}

// attach bearer token to all requests.
http.interceptors.request.use(attachBearerTokenFromStorage(config))

// refreshes tokens in case response returns 403 or 401.
http.interceptors.response.use((response) => {
  return response
}, async function(error) {
  /**
   * Refresh the access token in case of a request failure...
   * const originalRequest = error.config
   *   if (error.response.status === 401 && !originalRequest._retry) {
   *     originalRequest._retry = true
   *     await refreshToken()
   *     return http(originalRequest)
   *   }
   */
  return Promise.reject(error)
})

export default http

