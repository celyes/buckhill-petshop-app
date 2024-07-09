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

// refreshes the token and sets them to local storage.
const refreshToken = async () => {
  const data = {
    'refreshToken': window.localStorage.getItem('refreshToken'),
    'token': window.localStorage.getItem('token')
  }

  // change later...
  const response = await http.post('/refresh-token', data)
  window.localStorage.setItem('token', response.data.token)
  window.localStorage.setItem('refreshToken', response.data.refreshToken)
  window.location.reload()
}

// sets the access token as a common http header value for all request.
export const HttpSetAuthToken = (token) => {
  http.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

// gets tokenfrom storage and attaches it to all http requests headers.
const attachBearerTokenFromStorage = async (config) => {
  const token = await getTokenFromStorage()
  HttpSetAuthToken(token)
}

// attach bearer token to all requests.
http.interceptors.request.use(attachBearerTokenFromStorage(config))

// refreshes tokens in case response returns 403 or 401.
http.interceptors.response.use((response) => {
  return response
}, async function(error) {
  const originalRequest = error.config
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    await refreshToken()
    return http(originalRequest)
  }
  return Promise.reject(error)
})

export default http

