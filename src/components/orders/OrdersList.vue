<template>
    <div class="my-4 relative overflow-x-auto">
        <div class="text-left mb-5">
            <h2 class="text-lg font-semibold">Latest orders</h2>
        </div>
        <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
            <thead class="border-b">
            <tr>
                <th class="py-2">Order UUID</th>
                <th class="py-2">Status</th>
                <th class="py-2">Download Invoice</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="order in orderStore.orders.slice(sliceStart, sliceEnd)" :key="order.uuid"
                class="border-b odd:bg-white even:bg-blue-100">
                <td class="py-2">{{ order.uuid }}</td>
                <td class="py-2">
                    <OrderStatusBadge :status="order.order_status[0].title" />
                </td>
                <td class="py-2">
                    <ArrowDownTrayIcon class="w-8 h-8  mx-auto" />
                </td>
            </tr>
            </tbody>
        </table>
        <div class="w-full flex justify-between mt-4 ">
            <div>
                <span class="text-sm text-gray-400 mx-4">Rows per page: </span>
                <select v-model="rowsPerPage">
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                </select>
            </div>
            <div class="flex">
                <span class="text-gray-500 mx-4 text-sm">
                    {{ (currentPage * rowsPerPage + 1) - rowsPerPage }}
                    - {{ (currentPage * rowsPerPage) }}
                    of {{ orderStore.orders.length }}
                </span>
                <div class="flex justify-between">
                    <button @click="previous">
                        <ChevronLeftIcon class="w-5 h-5 mx-2" />
                    </button>
                    <button @click="next">
                        <ChevronRightIcon class="w-5 h-5 mx-2" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowDownTrayIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/solid'
import { useOrderStore } from '@/stores/order'
import OrderStatusBadge from '@/components/orders/OrderStatusBadge.vue'
import _ from 'lodash'
import OrdersService from '@/services/Http/OrdersService'
import { onMounted, ref, watch } from 'vue'

const sliceStart = ref(0)
const sliceEnd = ref(5)
const rowsPerPage = ref(5)
const currentPage = ref(1)

const orderStore = useOrderStore()
watch(rowsPerPage, async (newValue, oldValue) => {
    currentPage.value = Math.max(
        1,
        Math.min(currentPage.value > orderStore.orders.length / newValue
            ?  orderStore.orders.length / newValue : currentPage.value, orderStore.orders.length / newValue)
    )
    sliceEnd.value = currentPage.value * rowsPerPage.value
    sliceStart.value = sliceEnd.value - rowsPerPage.value
    console.log('Old Value: ', oldValue)
    console.log('New Value: ', newValue)
    console.log('Current Page: ',  currentPage.value)
    console.log('Slice Start: ',  sliceStart.value)
    console.log('Slice End: ',  sliceEnd.value)

})
const getUserOrders = () => {
    if (_.isEmpty(orderStore.orders)) {
        OrdersService.getOrders().then((r) => {
            orderStore.$patch({
                orders: r.data.data
            })
        })
    }
}

const previous = () => {
    currentPage.value = currentPage.value - 1 > 0 ? currentPage.value - 1 : 1
    sliceEnd.value = rowsPerPage.value * currentPage.value
    sliceStart.value = sliceEnd.value - rowsPerPage.value
}
const next = () => {
    currentPage.value = (currentPage.value + 1) * rowsPerPage.value > orderStore.orders.length
        ? currentPage.value
        : currentPage.value + 1
    sliceEnd.value = rowsPerPage.value * currentPage.value
    sliceStart.value = sliceEnd.value - rowsPerPage.value
}

onMounted(() => {
    getUserOrders()
})

</script>