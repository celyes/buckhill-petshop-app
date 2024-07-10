<template>
    <div class="rounded shadow-lg bg-white p-4 border cursor-pointer hover:scale-105 duration-75">
        <div class="bg-white mb-4 border-b pb-4">
            <img
                class="mx-auto h-48"
                :src="`https://pet-shop.buckhill.com.hr/api/v1/file/${props.product.metadata.image}`"
                :alt="props.product.title"/>
        </div>
        <span class="capitalize rounded-full bg-blue-500 text-sm text-white px-2">{{ props.product.brand.title }}</span>
        <span class="text-sm text-gray-500 px-2" v-show="props.quantity">¥ {{ props.price }}</span>
        <h2 class="font-semibold leading-6 text-gray-800">{{ props.product.title }}</h2>
        <p class="line-clamp-2 text-gray-400">{{ props.product.description }}</p>
        <p class="mt-4 text-gray-400 text-sm" v-show="props.quantity">Quantity: {{ props.quantity }}</p>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    product: {
        type: Object,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
})

</script>
