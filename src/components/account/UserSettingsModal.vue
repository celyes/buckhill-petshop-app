<template>
    <TransitionRoot as="template" :show="props.isShown">
        <Dialog class="relative z-10">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
                             leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </TransitionChild>
            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <TransitionChild as="template" enter="ease-out duration-300"
                                     enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                     enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
                                     leave-from="opacity-100 translate-y-0 sm:scale-100"
                                     leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="py-6 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full md:w-3/4 xl:w-1/2">
                            <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div class="flex items-top">
                                    <div class="mt-3 text-center sm:mt-0 w-full">
                                        <DialogTitle as="h3" class="text-base font-semibold text-xl text-gray-900">User Settings</DialogTitle>
                                        <UserSettingsModalInfoSection />
                                        <OrdersList />
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">

import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import UserSettingsModalInfoSection from '@/components/account/UserSettingsModalInfoSection.vue'
import OrdersList from '@/components/orders/OrdersList.vue'

const props = defineProps({
    'is-shown': {
        type: Boolean,
        default: false
    }
})

</script>