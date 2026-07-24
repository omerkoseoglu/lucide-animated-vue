<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useIconRegistry } from '~/composables/useIconRegistry'

const route = useRoute()
const { icons, getCategory } = useIconRegistry()

const slug = computed(() => String(route.params.slug))
const category = computed(() => getCategory(slug.value))
const filtered = computed(() => icons.filter((icon) => icon.categories.includes(slug.value)))
</script>

<template>
  <div class="mx-auto max-w-5xl px-6 py-10">
    <NuxtLink to="/categories" class="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground">
      &larr; all categories
    </NuxtLink>

    <template v-if="category">
      <h1 class="text-2xl font-bold tracking-tight">{{ category.title }}</h1>
      <p class="mt-2 text-sm text-muted-foreground">{{ filtered.length }} icons</p>

      <main class="mt-6 grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2">
        <IconCard v-for="icon in filtered" :key="icon.componentName" :icon="icon" />
      </main>
    </template>

    <template v-else>
      <h1 class="text-xl font-bold">Category not found</h1>
      <p class="mt-2"><NuxtLink to="/categories" class="underline">Back to all categories</NuxtLink></p>
    </template>
  </div>
</template>
