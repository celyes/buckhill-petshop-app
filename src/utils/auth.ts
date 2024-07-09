import { env } from '@/envinronment'
import http, { HttpSetAuthToken } from '@/services/HttpService'

export const login = (form: Form) => {
  return new Promise((resolve, reject) => {
    form.post(`${env.api}/user/login`)
      .then(res => {
        window.localStorage.setItem('token', res.data.token)
        HttpSetAuthToken(res.data.token)
        resolve(res)
      })
      .catch(e => {
        console.error('Error during login process:', e)
        reject(e)
      })
  })
}

export const getProfile = () => {
  return new Promise((resolve, reject) => {
    const response = http.get('/user')
      .then(res => resolve(res))
      .catch(e => reject(e))
    return response.data
  })
}