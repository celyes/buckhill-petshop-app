import { defineStore } from 'pinia'
import http from '@/services/HttpService'

export const useUserStore = defineStore('user', {
  state: ()  => ({
    user: { },
    isLoggedIn: false
  }),

  actions: {
    login(data) {
      const response = http.post(
        '/user/login',
        {
          email: data.email,
          password: data.password
        }).catch(e => {
        console.log(e)
      })
      return response.data

    }
  },
  persist: true,
})
