<template>
    <div class="container py-6">
        <h1 class="text-3xl text-emerald-700">Order: {{ order.uuid }}</h1>
        <div class="grid grid-cols-1 md:grid-cols-3">
            <div class="my-4">
                <p class="text-gray-500 leading-3 my-4">Amount</p>
                <p class="leading-6">¥ {{ order.amount }}</p>
            </div>
            <div class="my-4">
                <p class="text-gray-500 leading-3 my-4">Status</p>
                <OrderStatusBadge :status="order.order_status[0].title" />
            </div>
            <div class="my-4">
                <p class="text-gray-500 leading-3 my-4">Shipping address</p>
                <p class="leading-6">{{ order.address.shipping }}</p>
            </div>
            <div class="my-4">
                <p class="text-gray-500 leading-3 my-4">Billing address</p>
                <p class="leading-6">{{ order.address.billing }}</p>
            </div>
        </div>
        <div class="my-6">
            <h1 class="text-3xl text-emerald-700">Products</h1>
            <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 my-6">
                <ProductCard
                    v-for="product in order.products"
                    :product="productStore.products[product.uuid]"
                    :price="product.price"
                    :quantity="product.quantity"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/order'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import OrderStatusBadge from '@/components/orders/OrderStatusBadge.vue'
import ProductCard from '@/components/products/ProductCard.vue'
import { useProductStore } from '@/stores/product'

const route = useRoute()

const orderStore = useOrderStore()
const productStore = useProductStore()

const order = computed(() => {
    return orderStore.orders.filter(o => o.uuid == route.params.id)[0]
})
</script>

