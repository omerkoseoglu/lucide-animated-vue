# `lucide-animated-vue` is beautifully crafted animated icons, for Vue.

A Vue 3 / Nuxt port of [`pqoqubbw/icons`](https://github.com/pqoqubbw/icons) — same animations, same [Lucide](https://lucide.dev/) icons, built on [Motion for Vue](https://motion.dev/docs/vue) (`motion-v`) instead of React.

**Demo** → [omerkoseoglu.github.io/lucide-animated-vue](https://omerkoseoglu.github.io/lucide-animated-vue/)

## Install a single icon

```bash
npx shadcn-vue@latest add https://omerkoseoglu.github.io/lucide-animated-vue/r/heart.json
```

Swap `heart` for any icon's name (shown on its page in the demo). Installs the `.vue` file straight into `components/icons/` and adds `motion-v` — nothing else needed.

## Usage

```vue
<script setup>
import HeartIcon from '@/components/icons/HeartIcon.vue'
</script>

<template>
  <HeartIcon :size="28" />
</template>
```

(In a Nuxt project the import is optional — components under `components/` auto-register.) Every icon also exposes `startAnimation()` / `stopAnimation()` via `defineExpose`, so you can trigger it imperatively with a template ref instead of relying on hover.

## Status

439 / 439 icons ported. Everything is fully static and self-contained — no icon depends on anything besides `vue` and `motion-v`.

#### Original (React): [pqoqubbw/icons](https://github.com/pqoqubbw/icons) by [@pqoqubbw](https://github.com/pqoqubbw)
#### Svelte icons: [movingicons.dev](https://www.movingicons.dev/) by [@jis3r](https://github.com/jis3r)
#### Vue icons: [imfenghuang.github.io/icons](https://imfenghuang.github.io/icons/) by [@imfenghuang](https://github.com/imfenghuang)
#### Angular icons: [ajitzero/animated-icons](https://github.com/ajitzero/animated-icons) by [@ajitzero](https://github.com/ajitzero)
#### Flutter icons: [flutter_lucide_animated](https://pub.dev/packages/flutter_lucide_animated) by [@ravikovind](https://github.com/ravikovind)

## Contributing

See [`CLAUDE.md`](./CLAUDE.md) for how icons are ported (the codemod, its conventions, known gaps) and how the demo site + registry are built and deployed.

## Terms of Use

Feel free to use these components in personal and commercial projects. The icon designs are [Lucide](https://lucide.dev/) (ISC), the animations are ported from `pqoqubbw/icons` (MIT). This repository is an independent, unaffiliated port — not endorsed by the original author.
