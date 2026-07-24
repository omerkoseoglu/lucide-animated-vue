<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useIconRegistry } from "~/composables/useIconRegistry";

const { icons, categories } = useIconRegistry();
const query = ref("");

const customCount = computed(() => icons.filter((icon) => icon.isCustom).length);
const portedCount = computed(() => icons.length - customCount.value);

function matches(icon: (typeof icons)[number], q: string) {
  return icon.name.includes(q) || icon.keywords.some((k) => k.includes(q));
}

const totalMatched = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return icons.length;
  return icons.filter((icon) => matches(icon, q)).length;
});

const groups = computed(() => {
  const q = query.value.trim().toLowerCase();
  return categories
    .map((category) => ({
      ...category,
      icons: icons.filter(
        (icon) => icon.categories.includes(category.slug) && (!q || matches(icon, q)),
      ),
    }))
    .filter((group) => group.icons.length > 0);
});

function onKeydown(e: KeyboardEvent) {
  const target = e.target as HTMLElement;
  const isTyping = target.tagName === "INPUT" || target.tagName === "TEXTAREA";
  if (e.key === "/" && !isTyping) {
    e.preventDefault();
    document.getElementById("icon-search")?.focus();
  }
}

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <div class="min-h-screen">
    <SiteHeader />

    <header class="mx-auto max-w-2xl px-6 py-16 text-center">
      <span
        class="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground"
      >
        {{ icons.length }} animated icons &middot; Vue &amp; Nuxt
      </span>

      <h1 class="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">Icons that move.</h1>
      <p class="mt-4 text-base text-muted-foreground sm:text-lg">
        A 1:1 Vue / Nuxt port of
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
      <p class="mt-1 text-xs text-muted-foreground">
        {{ portedCount }} ported from upstream &middot; {{ customCount }} original
        <span
          class="mx-1 inline-flex items-center rounded-full border border-transparent bg-secondary px-1.5 py-0.5 align-middle text-[0.65rem] font-medium text-secondary-foreground"
          >new</span
        >
        icon{{ customCount === 1 ? "" : "s" }} not in the original library
      </p>

      <CliInstallBlock />

      <div class="mt-6 flex items-center justify-center gap-3">
        <Button as-child>
          <a href="#browse">Browse icons</a>
        </Button>
        <Button as-child variant="outline">
          <a
            href="https://github.com/omerkoseoglu/lucide-animated-vue"
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon :size="16" />
            View on GitHub
          </a>
        </Button>
      </div>
    </header>

    <div
      id="browse"
      class="sticky top-[57px] z-10 space-y-3 border-b border-border bg-background/80 px-6 py-3 backdrop-blur scroll-mt-[57px]"
    >
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
          {{ totalMatched }} / {{ icons.length }} icons in {{ groups.length }}
          {{ groups.length === 1 ? "category" : "categories" }}
        </p>
      </div>
    </div>

    <main class="mx-auto max-w-5xl px-6 py-10">
      <div v-if="groups.length" class="space-y-6">
        <section
          v-for="group in groups"
          :key="group.slug"
          :id="group.slug"
          class="scroll-mt-36 overflow-hidden rounded-xl border border-border bg-card"
        >
          <div class="flex items-baseline gap-2 border-b border-border px-4 py-3">
            <h2 class="text-sm font-semibold tracking-tight">{{ group.title }}</h2>
            <span class="text-xs text-muted-foreground">{{ group.icons.length }}</span>
          </div>
          <div class="grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] gap-2 p-4">
            <IconCard v-for="icon in group.icons" :key="icon.componentName" :icon="icon" />
          </div>
        </section>
      </div>

      <div v-else class="flex flex-col items-center gap-2 py-20 text-center">
        <p class="text-sm text-muted-foreground">No icons match &ldquo;{{ query }}&rdquo;.</p>
        <Button variant="outline" size="sm" @click="query = ''">Clear search</Button>
      </div>
    </main>

    <footer
      class="mx-auto max-w-5xl border-t border-border px-6 py-6 text-center text-xs text-muted-foreground"
    >
      <p>
        Icons:
        <a
          href="https://lucide.dev"
          target="_blank"
          rel="noreferrer"
          class="underline underline-offset-2 hover:text-foreground"
          >Lucide</a
        >
        &middot; Animations ported from
        <a
          href="https://github.com/pqoqubbw/icons"
          target="_blank"
          rel="noreferrer"
          class="underline underline-offset-2 hover:text-foreground"
          >pqoqubbw/icons</a
        >
        &middot; Built with
        <a
          href="https://www.shadcn-vue.com"
          target="_blank"
          rel="noreferrer"
          class="underline underline-offset-2 hover:text-foreground"
          >shadcn-vue</a
        >
      </p>
    </footer>
  </div>
</template>
