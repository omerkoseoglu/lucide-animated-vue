# lucide-animated-vue

A Vue 3 / Nuxt port of [`pqoqubbw/icons`](https://github.com/pqoqubbw/icons) ("lucide-animated") — a collection of animated icon components built on top of [Lucide](https://lucide.dev/) SVGs.

**Live demo:** https://omerkoseoglu.github.io/lucide-animated-vue/

The original project is built with React and [Motion for React](https://motion.dev/) (`motion/react`). This port reimplements the same icons and animations in Vue 3, using [Motion for Vue](https://motion.dev/docs/vue) (`motion-v`), the official Vue binding for the same animation engine.

## Status

🚧 436/439 icons ported (see `app/components/icons/`). Remaining: `keyboard`, `volume`, `wifi-low` — these use timed/toggled animation state in the original that needs a hand port rather than the automated one (see `CLAUDE.md`).

## Tech stack

- [Nuxt 4](https://nuxt.com/)
- Vue 3 (`<script setup>`, Composition API)
- [`motion-v`](https://motion.dev/docs/vue) — Motion for Vue, registered via the `motion-v/nuxt` module
- Tailwind CSS v4 + [shadcn-vue](https://www.shadcn-vue.com/) for the demo site's UI
- TypeScript

## Demo site

`pnpm dev` and open `/` for a searchable grid of every ported icon (hover to preview the animation). Click an icon to open its detail page (`/icons/<name>`) with a large replayable preview, an install command, a usage snippet, and the full component source — all copyable.

## Install a single icon via shadcn-vue

Every icon is also served as a [shadcn-vue registry](https://www.shadcn-vue.com/docs/registry) item, so it can be dropped straight into any shadcn-vue project without cloning this repo:

```bash
npx shadcn-vue@latest add https://omerkoseoglu.github.io/lucide-animated-vue/r/heart.json
```

Swap `heart` for any icon's kebab-case name (each icon's detail page shows its exact command). This installs the icon's `.vue` file to `components/icons/` and adds `motion-v` to your project's dependencies — nothing else is required.

Registry items live in `public/r/*.json` and are (re)built with:

```bash
node scripts/build-registry.mjs
```

Re-run it after porting new icons — see `CLAUDE.md` for what it does and how it's structured.

## Project structure

```
app/
  components/
    icons/          # ported icon components, one file per icon (PascalCase + "Icon" suffix)
    ui/             # shadcn-vue components (Button, Input, Badge, Card, ...)
  composables/
    useIconRegistry.ts   # discovers all icon components + their source/keywords for the demo site
  pages/
    index.vue            # searchable icon grid
    icons/[name].vue      # per-icon detail page (install command, usage, source)
  utils/
    icon-keywords.json    # generated: name -> search keywords, see scripts/extract-keywords.mjs
  lib/utils.ts      # shadcn-vue's cn() class-merge helper
  app.vue
components.json    # shadcn-vue config
public/r/          # generated shadcn-vue registry items, one per icon (see scripts/build-registry.mjs)
registry.json       # generated registry catalog (root copy of public/r/registry.json)
nuxt.config.ts
.reference-icons/    # (gitignored) read-only clone of pqoqubbw/icons, used as the porting source of truth
```

## Development

```bash
pnpm install
pnpm dev        # start dev server
pnpm build      # production build (Node server)
pnpm generate   # static build (used for the GitHub Pages deploy)
```

## Deployment

Pushes to `main` auto-deploy to GitHub Pages via `.github/workflows/deploy.yml`: it runs `pnpm generate` with `NITRO_PRESET=github-pages` and `NUXT_APP_BASE_URL=/lucide-animated-vue/`, then publishes `.output/public` with the official `actions/deploy-pages` action. Nothing to run manually — check the Actions tab if a deploy doesn't show up.

The whole site is fully static (every icon and page is known at build time), so nothing here needs a live server.

## Porting conventions

See [`CLAUDE.md`](./CLAUDE.md) for the icon component pattern, naming conventions, and how the reference clone is used when porting a new icon.

Most icons were ported with `scripts/port-icons.mjs`, a codemod that translates the upstream React/Motion source into the Vue/`motion-v` pattern:

```bash
node scripts/port-icons.mjs             # port any not-yet-generated icon
npx prettier --write "app/components/icons/*.vue" --print-width 100
node scripts/validate-icons.mjs         # compile-check every generated component
node scripts/extract-keywords.mjs       # refresh app/utils/icon-keywords.json after adding icons
```

## Attribution & license

All icon designs originate from [Lucide](https://lucide.dev/) (ISC license). The animation concepts and per-icon interaction design are ported from [`pqoqubbw/icons`](https://github.com/pqoqubbw/icons) by [@pqoqubbw](https://github.com/pqoqubbw), which is MIT licensed. This repository is an independent, unaffiliated Vue/Nuxt port.

Other community ports of the same project exist for [Svelte](https://www.movingicons.dev/), [Vue](https://imfenghuang.github.io/icons/) (by @imfenghuang), [Angular](https://github.com/ajitzero/animated-icons), and [Flutter](https://pub.dev/packages/flutter_lucide_animated) — this project is a separate, independent effort.
