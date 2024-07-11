import { defineStore } from 'pinia'
import http from '@/services/HttpService'

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false,
    profile: {}
  }),

  actions: {
    async login(data): object {
      try {
        const response = await http.post('/user/login', {
          email: data.email,
          password: data.password
        })
        return response.data
      } catch (e) {
        console.log(e)
      }
    },
    logout(): void {
      http
        .get('/user/logout')
        .then(() => {
          this.$reset()
        })
        .catch((e) => {
          console.log(e)
        })
    }
  },
  getters: {
    userFullName: (state): String => {
      return `${state.profile.first_name} ${state.profile.last_name}`
    },
    userDateJoined: (state): String => {
      const date = new Date(state.profile.created_at)
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }
      return new Intl.DateTimeFormat('en-US', options).format(date)
    }
  },
  persist: true
})
