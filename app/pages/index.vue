<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useIconRegistry } from '~/composables/useIconRegistry'

const { icons } = useIconRegistry()
const query = ref('')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return icons
  return icons.filter(
    (icon) => icon.name.includes(q) || icon.keywords.some((k) => k.includes(q))
  )
})

function onKeydown(e: KeyboardEvent) {
  const target = e.target as HTMLElement
  const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
  if (e.key === '/' && !isTyping) {
    e.preventDefault()
    document.getElementById('icon-search')?.focus()
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <div class="min-h-screen px-6 py-10">
    <ColorModeToggle />

    <header class="mx-auto mb-8 max-w-2xl text-center">
      <h1 class="text-2xl font-bold tracking-tight">lucide-animated-vue</h1>
      <p class="mt-2 text-sm text-muted-foreground">
        Vue / Nuxt port of
        <a
          href="https://github.com/pqoqubbw/icons"
          target="_blank"
          rel="noreferrer"
          class="underline underline-offset-2 hover:text-foreground"
        >
          pqoqubbw/icons
        </a>
        &mdash; hover an icon to play its animation, click for code &amp; install command.
      </p>

      <CliInstallBlock />
    </header>

    <div class="sticky top-0 z-10 -mx-6 mb-6 bg-background/80 px-6 py-3 backdrop-blur">
      <div class="mx-auto max-w-2xl">
        <div class="relative">
          <Input
            id="icon-search"
            v-model="query"
            type="text"
            placeholder="Search by name or keyword&hellip;"
            autofocus
            class="pr-12"
          />
          <kbd
            class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[0.65rem] text-muted-foreground"
          >
            /
          </kbd>
        </div>
        <p class="mt-2 text-center text-xs text-muted-foreground">
          {{ filtered.length }} / {{ icons.length }} icons
        </p>
      </div>
    </div>

    <main class="mx-auto max-w-5xl">
      <div
        v-if="filtered.length"
        class="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2"
      >
        <NuxtLink
          v-for="icon in filtered"
          :key="icon.componentName"
          :to="`/icons/${icon.name}`"
          class="group flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card p-4 text-card-foreground no-underline transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <component :is="icon.component" :size="28" />
          <span class="line-clamp-2 text-center text-[0.65rem] leading-tight text-muted-foreground">
            {{ icon.name }}
          </span>
        </NuxtLink>
      </div>

      <div v-else class="flex flex-col items-center gap-2 py-20 text-center">
        <p class="text-sm text-muted-foreground">No icons match &ldquo;{{ query }}&rdquo;.</p>
        <Button variant="outline" size="sm" @click="query = ''">Clear search</Button>
      </div>
    </main>

    <footer class="mx-auto mt-16 max-w-5xl border-t border-border pt-6 text-center text-xs text-muted-foreground">
      <p>
        Icons: <a href="https://lucide.dev" target="_blank" rel="noreferrer" class="underline underline-offset-2 hover:text-foreground">Lucide</a>
        &middot; Animations ported from
        <a href="https://github.com/pqoqubbw/icons" target="_blank" rel="noreferrer" class="underline underline-offset-2 hover:text-foreground">pqoqubbw/icons</a>
        &middot; Built with
        <a href="https://www.shadcn-vue.com" target="_blank" rel="noreferrer" class="underline underline-offset-2 hover:text-foreground">shadcn-vue</a>
      </p>
    </footer>
  </div>
</template>
