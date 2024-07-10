<template>
    <!-- To be implemented -->
    <button
        @click="logout"
        type="button"
        class="border border-white text-white rounded-md px-3 py-2 text-md font-medium hover:bg-emerald-700 hover:border-transparent duration-100"
        aria-current="page">
        Logout
    </button>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const logout = () => {
    userStore.logout()
}
</script>