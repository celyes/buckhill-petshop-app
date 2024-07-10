import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import OrderView from '@/views/OrderView.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/order/:id',
      name: 'order',
      component: OrderView,
      beforeEnter: (to) => {
        const userStore = useUserStore()
        return userStore.isLoggedIn
      }
    }
  ]
})

export default router
