<script setup lang="ts">
import { ref } from 'vue'
import LoginForm from '@/components/account/LoginForm.vue'
import LogoutForm from '@/components/account/LogoutForm.vue'
import { useUserStore } from '@/stores/user'
import UserSettings from '@/components/account/UserSettings.vue'

const userStore = useUserStore()
const isLoginOpened = ref(false)
</script>

<template>
  <div>
    <template v-if="!userStore.isLoggedIn">
      <button
        @click="isLoginOpened = !isLoginOpened"
        class="border border-white text-white rounded-md px-3 py-2 text-md font-medium hover:bg-emerald-700 hover:border-transparent duration-100"
        aria-current="page"
      >
        Login
      </button>
      <LoginForm :is-shown="isLoginOpened" @close="isLoginOpened = false" />
    </template>
    <template v-else>
      <div class="flex">
        <LogoutForm />
        <UserSettings />
      </div>
    </template>
  </div>
</template>

<style scoped></style>
