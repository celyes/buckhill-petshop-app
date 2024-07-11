import { defineStore } from 'pinia'
import type { List } from 'postcss/lib/list'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: []
  }),
  getters: {
    getLastOrders: (state): Array => {
      let orders = state.orders.slice(state.orders.length - 5, 0)
      orders = orders.map((o) => [
        o.uuid,
        o.order_status[0].title,
        `https://pet-shop.buckhill.com.hr/api/v1/file/${o.uuid}`
      ])
      return orders
    }
  },
  persist: true
})
