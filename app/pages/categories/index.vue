<script setup lang="ts">
import { useIconRegistry } from '~/composables/useIconRegistry'

const { categories } = useIconRegistry()
</script>

<template>
  <div class="mx-auto max-w-3xl px-6 py-10">
    <NuxtLink to="/" class="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground">
      &larr; all icons
    </NuxtLink>

    <h1 class="text-2xl font-bold tracking-tight">Categories</h1>
    <p class="mt-2 text-sm text-muted-foreground">
      Icons grouped the same way as
      <a
        href="https://lucide.dev/icons/categories"
        target="_blank"
        rel="noreferrer"
        class="underline underline-offset-2 hover:text-foreground"
      >
        lucide.dev
      </a>.
    </p>

    <div class="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
      <NuxtLink
        v-for="category in categories"
        :key="category.slug"
        :to="`/categories/${category.slug}`"
        class="flex items-center justify-between gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm text-card-foreground no-underline transition-colors hover:bg-muted"
      >
        <span>{{ category.title }}</span>
        <span class="text-xs text-muted-foreground">{{ category.count }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
