<template>
    <span
        class="capitalize px-2 py-1 rounded-full"
        :class="getColor(props.status)"
    >
        {{props.status}}
    </span>
</template>
<script setup lang="ts">
const props = defineProps({
    status: {
        type: String,
        required: true
    }
})
const getColor = (status) => ({
    'bg-amber-500 text-white': status == 'pending payment',
    'bg-gray-300 text-gray-600': status == 'canceled',
    'bg-green-500 text-white': status == 'paid',
    'bg-emerald-800 text-white': status == 'shipped',
    'bg-blue-400 text-white': status == 'open',
})
</script>
