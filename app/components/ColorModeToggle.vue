<script setup lang="ts">
import { onMounted, ref } from 'vue'

const isDark = ref(false)

function apply() {
  document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
  const stored = localStorage.getItem('color-mode')
  isDark.value = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  apply()
})

function toggle() {
  isDark.value = !isDark.value
  localStorage.setItem('color-mode', isDark.value ? 'dark' : 'light')
  apply()
}
</script>

<template>
  <ClientOnly>
    <Button
      variant="ghost"
      size="icon"
      class="fixed right-4 top-4 z-20"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggle"
    >
      <SunIcon v-if="isDark" :size="18" />
      <MoonIcon v-else :size="18" />
    </Button>
  </ClientOnly>
</template>
