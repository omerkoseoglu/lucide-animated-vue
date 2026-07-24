<script setup lang="ts">
import type { IconEntry } from '~/composables/useIconRegistry'

defineProps<{ icon: IconEntry }>()
</script>

<template>
  <NuxtLink
    :to="`/icons/${icon.name}`"
    class="group relative flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-4 text-card-foreground no-underline transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
  >
    <span
      v-if="icon.isCustom"
      class="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-primary"
      title="Original icon, not in pqoqubbw/icons"
    />
    <component :is="icon.component" :size="28" />
    <span class="line-clamp-2 text-center text-[0.65rem] leading-tight text-muted-foreground">
      {{ icon.name }}
    </span>
  </NuxtLink>
</template>
