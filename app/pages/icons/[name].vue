<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useIconRegistry } from '~/composables/useIconRegistry'
import { useSiteOrigin } from '~/composables/useSiteOrigin'

const route = useRoute()
const { getIcon } = useIconRegistry()
const { origin, base } = useSiteOrigin()

const icon = computed(() => getIcon(String(route.params.name)))

const iconRef = ref<{ startAnimation: () => void; stopAnimation: () => void } | null>(null)
const copiedUsage = ref(false)
const copiedSource = ref(false)
const copiedInstall = ref(false)

function replay() {
  iconRef.value?.stopAnimation()
  iconRef.value?.startAnimation()
}

const usageSnippet = computed(() => {
  if (!icon.value) return ''
  return `<${icon.value.componentName} :size="28" />`
})

const installCommand = computed(() => {
  if (!icon.value) return ''
  return `npx shadcn-vue@latest add ${origin.value}${base}r/${icon.value.name}.json`
})

async function copy(text: string, flag: 'usage' | 'source' | 'install') {
  await navigator.clipboard.writeText(text)
  const target = { usage: copiedUsage, source: copiedSource, install: copiedInstall }[flag]
  target.value = true
  setTimeout(() => (target.value = false), 1500)
}
</script>

<template>
  <div class="mx-auto max-w-2xl px-6 py-10">
    <NuxtLink to="/" class="mb-8 inline-block text-sm text-muted-foreground hover:text-foreground">
      &larr; all icons
    </NuxtLink>

    <template v-if="icon">
      <Card class="mb-6 flex h-52 cursor-pointer items-center justify-center" @click="replay">
        <component :is="icon.component" ref="iconRef" :size="96" />
      </Card>

      <h1 class="text-xl font-bold tracking-tight">{{ icon.name }}</h1>
      <p class="mb-4 mt-1 text-sm text-muted-foreground">
        Click the preview (or hover it) to replay the animation.
      </p>

      <div v-if="icon.keywords.length" class="mb-6 flex flex-wrap gap-1.5">
        <Badge v-for="k in icon.keywords" :key="k" variant="secondary">{{ k }}</Badge>
      </div>

      <section class="mb-5">
        <div class="mb-1.5 flex items-center justify-between">
          <h2 class="text-sm font-medium text-muted-foreground">Install</h2>
          <Button size="sm" variant="outline" @click="copy(installCommand, 'install')">
            {{ copiedInstall ? 'Copied!' : 'Copy' }}
          </Button>
        </div>
        <pre class="overflow-x-auto rounded-lg bg-muted p-4 text-sm leading-relaxed"><code>{{ installCommand }}</code></pre>
      </section>

      <section class="mb-5">
        <div class="mb-1.5 flex items-center justify-between">
          <h2 class="text-sm font-medium text-muted-foreground">Usage</h2>
          <Button size="sm" variant="outline" @click="copy(usageSnippet, 'usage')">
            {{ copiedUsage ? 'Copied!' : 'Copy' }}
          </Button>
        </div>
        <pre class="overflow-x-auto rounded-lg bg-muted p-4 text-sm leading-relaxed"><code>{{ usageSnippet }}</code></pre>
      </section>

      <section class="mb-5">
        <div class="mb-1.5 flex items-center justify-between">
          <h2 class="text-sm font-medium text-muted-foreground">Source</h2>
          <Button size="sm" variant="outline" @click="copy(icon.source, 'source')">
            {{ copiedSource ? 'Copied!' : 'Copy' }}
          </Button>
        </div>
        <pre class="max-h-[420px] overflow-y-auto overflow-x-auto rounded-lg bg-muted p-4 text-sm leading-relaxed"><code>{{ icon.source }}</code></pre>
      </section>
    </template>

    <template v-else>
      <h1 class="text-xl font-bold">Icon not found</h1>
      <p class="mt-2"><NuxtLink to="/" class="underline">Back to all icons</NuxtLink></p>
    </template>
  </div>
</template>
