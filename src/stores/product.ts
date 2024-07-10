import { defineStore } from 'pinia'
import { useCategoryStore } from '@/stores/category'
import categoriesService from '@/services/Http/CategoriesService'
import { toRaw } from 'vue'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: {}
  }),
  actions: {
    saveProducts() {
      const categoryStore = useCategoryStore()
      for (const categoryProduct in categoryStore.products) {
        for (const product of categoryStore.products[categoryProduct]) {
          this.products[product.uuid] = product
        }
      }
    }
  },
  persist: true,
})
