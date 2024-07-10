<template>
    <div class="grid grid-cols-1 md:grid-cols-3">
        <div class="mx-auto flex items-center">
           <span class="inline-block my-6 md:my-0">
                <img
                    class="w-24 h-24 md:w-36 md:h-36 rounded-full"
                    :src="`https://pet-shop.buckhill.com.hr/api/v1/file/${userStore.profile.avatar}`"
                    :alt="`${userStore.profile.first_name} ${userStore.profile.last_name}`"
                />
                <br>
           </span>
        </div>

        <div class="col-span-2 grid grid-cols-1 sm:grid-cols-3 text-left py-4">
            <div class="mb-4">
                <span class="text-sm text-gray-400">Name</span>
                <p>{{ userStore.userFullName }}</p>
            </div>
            <div class="mb-4">
                <span class="text-sm text-gray-400">Phone number</span>
                <p>{{ userStore.profile.phone_number }}</p>
            </div>
            <div class="mb-4">
                <span class="text-sm text-gray-400">Address</span>
                <p>{{ userStore.profile.address }}</p>
            </div>
            <div class="mb-4">
                <span class="text-sm text-gray-400">Date joined</span>
                <p>{{ userStore.userDateJoined }}</p>
            </div>
            <div class="mb-4">
                <span class="text-sm text-gray-400">Email</span>
                <p>{{ userStore.profile.email }}</p>
            </div>
            <div class="mb-4">
                <span class="text-sm text-gray-400">Marketing preferences</span>
                <p>{{ userStore.profile.is_marketing ? 'Yes' : 'No' }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

</script>
