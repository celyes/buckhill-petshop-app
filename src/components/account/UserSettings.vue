<template>
    <div class="flex items-center">
        <button class="w-12 h-12 mx-3" @click="showModal">
            <img
                :src="`https://pet-shop.buckhill.com.hr/api/v1/file/${userStore.profile.avatar}`"
                :alt="`${userStore.profile.first_name} ${userStore.profile.last_name}`"
                class="w-full h-full rounded-full shadow-md"
            />
        </button>
        <UserSettingsModal :is-shown="isUserSettingsModalShown"  @close="isUserSettingsModalShown = false"  />
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import UserSettingsModal from '@/components/account/UserSettingsModal.vue'
import LoginForm from '@/components/account/LoginForm.vue'
import EventBus from '@/utils/bus'

const userStore = useUserStore()
const isUserSettingsModalShown = ref(false)
const showModal = () => {
    isUserSettingsModalShown.value = true
}

onMounted(() => {
    EventBus.on('closeModal', function () {
        isUserSettingsModalShown.value = false
    })
})
</script>