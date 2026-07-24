<script setup lang="ts">
import { onMounted, ref } from "vue";

const isDark = ref(false);

function apply() {
  document.documentElement.classList.toggle("dark", isDark.value);
}

function toggleTheme() {
  isDark.value = !isDark.value;
  localStorage.setItem("color-mode", isDark.value ? "dark" : "light");
  apply();
}

const stars = ref<number | null>(null);

onMounted(async () => {
  const stored = localStorage.getItem("color-mode");
  isDark.value = stored
    ? stored === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
  apply();

  try {
    const res = await fetch("https://api.github.com/repos/omerkoseoglu/lucide-animated-vue");
    if (res.ok) stars.value = (await res.json()).stargazers_count ?? null;
  } catch {
    // offline or rate-limited — badge just omits the count
  }
});
</script>

<template>
  <header class="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
    <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
      <NuxtLink
        to="/"
        class="flex items-center gap-2 text-sm font-semibold tracking-tight no-underline"
      >
        <BlocksIcon :size="20" />
        lucide-animated-vue
      </NuxtLink>

      <nav class="flex items-center gap-1.5">
        <NuxtLink
          to="/categories"
          class="hidden rounded-md px-2.5 py-1.5 text-sm text-muted-foreground no-underline transition-colors hover:text-foreground sm:inline-block"
        >
          Categories
        </NuxtLink>

        <a
          href="https://github.com/omerkoseoglu/lucide-animated-vue"
          target="_blank"
          rel="noreferrer"
          class="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground no-underline transition-colors hover:text-foreground"
        >
          <GithubIcon :size="16" />
          <span v-if="stars !== null">{{ stars }}</span>
        </a>

        <ClientOnly>
          <Button
            variant="ghost"
            size="icon"
            :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme"
          >
            <SunIcon v-if="isDark" :size="18" />
            <MoonIcon v-else :size="18" />
          </Button>
        </ClientOnly>
      </nav>
    </div>
  </header>
</template>
