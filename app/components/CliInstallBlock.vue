<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useIconRegistry } from '~/composables/useIconRegistry'

const { icons } = useIconRegistry()
const requestUrl = useRequestURL()

const rotatingNames = icons.filter((icon) => icon.name.length <= 20).map((icon) => icon.name)

const index = ref(0)
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => {
    index.value = (index.value + 1) % rotatingNames.length
  }, 1500)
})
onUnmounted(() => clearInterval(timer))

const currentName = computed(() => rotatingNames[index.value] ?? 'heart')

const packageManagers = [
  { id: 'pnpm', prefix: 'pnpm dlx' },
  { id: 'npm', prefix: 'npx' },
  { id: 'yarn', prefix: 'npx' },
  { id: 'bun', prefix: 'bunx --bun' }
]
const active = ref('pnpm')

function commandFor(prefix: string) {
  return `${prefix} shadcn-vue add ${requestUrl.origin}/r/${currentName.value}.json`
}

const copied = ref(false)
async function copy() {
  const pm = packageManagers.find((p) => p.id === active.value)!
  await navigator.clipboard.writeText(commandFor(pm.prefix))
  copied.value = true
  setTimeout(() => (copied.value = false), 1500)
}
</script>

<template>
  <div class="mx-auto mt-6 w-full max-w-2xl">
    <Tabs v-model="active">
      <TabsList class="w-full">
        <TabsTrigger v-for="pm in packageManagers" :key="pm.id" :value="pm.id" class="flex-1">
          {{ pm.id }}
        </TabsTrigger>
      </TabsList>
      <TabsContent v-for="pm in packageManagers" :key="pm.id" :value="pm.id" class="mt-2">
        <div
          class="flex items-center justify-between gap-2 rounded-lg border border-border bg-muted py-2 pl-4 pr-2 font-mono text-xs"
        >
          <span class="overflow-x-auto whitespace-nowrap">
            <span class="text-muted-foreground">{{ pm.prefix }}</span>
            <span class="text-foreground"> shadcn-vue add {{ requestUrl.origin }}/r/</span><span
              class="text-primary"
              >{{ currentName }}</span
            ><span class="text-foreground">.json</span>
          </span>
          <Button size="icon-sm" variant="ghost" class="shrink-0" aria-label="Copy install command" @click="copy">
            {{ copied ? '✓' : '⧉' }}
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>
