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
              class="py-6 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="flex items-center">
                  <div class="mt-3 text-center sm:mt-0 w-full">
                    <div
                      class="mx-auto my-4 flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full bg-emerald-600 sm:h-18 sm:w-18">
                      <img src="/logo.svg" alt="Petson">
                    </div>
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">Log In</DialogTitle>
                    <div class="mt-2">
                      <input
                        v-model="form.email"
                        type="text"
                        name="email"
                        placeholder="Email"
                        class="my-4 w-full border border-gray-300 rounded-md px-4 py-2"
                      >
                      <input
                        v-model="form.password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        class="my-4 w-full border border-gray-300 rounded-md px-4 py-2"
                      >

                      <div class="text-left flex mt-2">
                        <input
                          type="checkbox"
                          name="remember-me"
                          id="remember-me"
                          class="h-5 w-5"
                        >
                        <label for="remember-me" class="text-sm text-gray-500 px-2">Remember me</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button type="submit"
                        :disabled="isFormDisabled"
                        class="disabled:opacity:75 inline w-full justify-center rounded-md bg-green-600 px-3 py-4 text-sm font-semibold text-white shadow-sm hover:bg-green-500 duration-150 "
                        @click="performLogin">Log in
                </button>
              </div>
              <div class="grid grid-cols-2 sm:px-6 text-sm">
                <div>
                  <a href="#" class="text-blue-600 hover:underline">Forgot password?</a>
                </div>
                <div class="text-right">
                  <a href="#" class="text-blue-600 hover:underline">Don't have an account? Sign up</a>
                </div>
              </div>
              <div class="text-center text-sm text-red-500 mt-4">
                {{ error }}
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { StoreDefinition } from 'pinia'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import Form from '@/utils/form'
import { getProfile, login } from '@/utils/auth'
import { useUserStore } from '@/stores/user'

const userStore: StoreDefinition = useUserStore()

const form = ref(new Form({
  email: '',
  password: ''
}))

const error = ref('')
const isFormDisabled = ref(false)

const props = defineProps({
  'is-shown': {
    type: Boolean,
    default: false
  }
})

const performLogin = async () => {
  error.value = ''
  try {
    await login(form.value)
    getProfile().then(r => {
      userStore.$patch({
        profile: r.data.data,
        isLoggedIn: true
      })
    })

  } catch (e) {
    error.value = e.error
  }
}

</script>
