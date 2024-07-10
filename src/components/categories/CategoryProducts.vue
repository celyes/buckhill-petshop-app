<template>
    <div class="mb-12">
        <h1 class="text-3xl text-emerald-500 capitalize">{{ props.title }}</h1>
        <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 my-6">
            <ProductCard v-for="(product, index) in products" :key="index"  :product="product" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCategoryStore } from '@/stores/category'
import ProductsService from '@/services/Http/ProductsService'
import ProductCard from '@/components/products/ProductCard.vue'
import { isEmpty } from 'lodash'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true
    }
})

const categoryStore = useCategoryStore()

const products = categoryStore.products[props.uuid]

onMounted(async () => {
    if (isEmpty(categoryStore.products)) {
        const products = await ProductsService.getProduct(props.uuid)
        categoryStore.$patch(state => {
            state.products[props.uuid] = products.data.data
        })
    }
})
</script>