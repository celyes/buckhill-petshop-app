<script setup lang="ts">

import { ref } from 'vue'
import LoginForm from '@/components/account/LoginForm.vue'
import LogoutForm from '@/components/account/LogoutForm.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const loginOpened = ref(false)

</script>

<template>
  <div>
    <template v-if="!userStore.isLoggedIn">
        <button
          @click="loginOpened = !loginOpened"
          class="border border-white text-white rounded-md px-3 py-2 text-md font-medium hover:bg-emerald-700 hover:border-transparent duration-100"
          aria-current="page">
          Login
        </button>
        <LoginForm :is-shown="loginOpened" @close="loginOpened = false" />
    </template>
    <LogoutForm v-else />
  </div>
</template>

<style scoped>

</style>