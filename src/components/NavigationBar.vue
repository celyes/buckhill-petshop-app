<template>
    <Disclosure as="div" class="bg-emerald-600 m-0 p-0" v-slot="{ open }">
        <div class="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <DisclosureButton
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span class="absolute -inset-0.5" />
                        <span class="sr-only">Open main menu</span>
                        <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                        <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
                    </DisclosureButton>
                </div>
                <div class="flex flex-1 items-center justify-center md:items-stretch justify-center">
                    <div class="md:basis-1/4 xl:basis-1/3 flex flex-shrink-0">
                        <h1 class="text-white font-bolder text-2xl justify-center">Petson.</h1>
                    </div>
                    <div class="md:basis-2/4 xl:basis-1/3 hidden md:mx-6 md:block items-center">
                        <div class="flex space-x-4 justify-center">
                            <template
                                v-for="item in navigation"
                                :key="item.name"
                            >
                                <template v-if="item.isRouterLink">
                                    <router-link
                                        :to="item.href"
                                        :class="[item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-emerald-700 hover:text-white', 'rounded-md px-3 py-2 font-medium']"
                                        :aria-current="item.current ? 'page' : undefined"
                                        class="font-medium text-lg duration-100"
                                    >
                                        {{ item.name }}
                                    </router-link>
                                </template>
                                <template v-else>
                                    <a
                                        :href="item.href"
                                        :class="[item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-emerald-700 hover:text-white', 'rounded-md px-3 py-2 font-medium']"
                                        :aria-current="item.current ? 'page' : undefined"
                                        class="font-medium text-lg duration-100"
                                    >{{ item.name }}</a>
                                </template>
                            </template>

                        </div>
                    </div>
                    <div class="md:basis-1/4 xl:basis-1/3 hidden md:mx-6 md:block">
                        <div class="flex space-x-4 justify-center">
                            <a href="#"
                               class="border border-white text-white rounded-md px-3 py-2 text-md font-medium hover:bg-emerald-700 hover:border-transparent duration-100"
                               aria-current="page">Cart (0)</a>
                            <AccountControl />
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Mobile menu -->
        <DisclosurePanel class="sm:hidden">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <DisclosureButton v-for="item in navigationMobile" :key="item.name" as="a" :href="item.href"
                                  :class="[item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
                                  :aria-current="item.current ? 'page' : undefined">
                    <template v-if="item.isRouterLink">
                        <router-link :to="item.href">{{ item.name }}</router-link>
                    </template>
                    <template v-else>{{ item.name }}</template>
                </DisclosureButton>
            </div>
        </DisclosurePanel>
    </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

import AccountControl from '@/components/account/AccountControl.vue'

const navigation = [
    { name: 'Products', href: '#', current: false },
    { name: 'Promotions', href: '#', current: false },
    { name: 'Blog', href: '#', current: false },
]

const navigationMobile = [
    { name: 'Products', href: '#', current: false, isRouterLink: false },
    { name: 'Promotions', href: '#', current: false, isRouterLink: false },
    { name: 'Blog', href: '#', current: false, isRouterLink: false },
    { name: 'Cart', href: '#', current: false, isRouterLink: false },
]
</script>
