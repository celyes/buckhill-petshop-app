<template>
    <div class="my-4">
        <div v-if="!fetching">
            <CategoryProducts
                v-for="(category, index) in categoryStore.categories"
                :title="category.title"
                :uuid="category.uuid"
                :key="index"
            />
        </div>
        <div v-else>
            Loading products...
        </div>
    </div>
</template>
<script setup lang="ts">
import _ from 'lodash'
import { ref, onMounted } from 'vue'
import CategoriesService from '@/services/Http/CategoriesService'
import { useCategoryStore } from '@/stores/category'
import CategoryProducts from '@/components/categories/CategoryProducts.vue'
import { useProductStore } from '@/stores/product'

const categoryStore = useCategoryStore()
const productStore = useProductStore()

const fetching = ref(true)

onMounted(() => {
    getCategories()
})

const getCategories = () => {
    if (_.isEmpty(categoryStore.categories)) {
        CategoriesService.getCategories().then((r) => {
            categoryStore.$patch({
                categories: r.data.data
            })
        })
    }
    productStore.saveProducts()
    fetching.value = false
}

</script>
