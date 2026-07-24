// Fetches official Lucide category metadata (icons/<name>.json on GitHub)
// for every ported icon and writes app/utils/icon-categories.json:
// { [kebabName]: string[] }.
//
// A few icons in this repo were named differently upstream than Lucide's
// current name (Lucide renames icons over time, e.g. "airplane" -> "plane").
// RENAME_MAP below covers the ones found by running this script - it logs
// any remaining 404s so new mismatches are easy to spot and add.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const ICONS_DIR = join(ROOT, 'app/components/icons')
const OUT = join(ROOT, 'app/utils/icon-categories.json')

// our-name -> current Lucide name, for icons Lucide has since renamed or
// split into a more specific family. Each of these was verified against
// Lucide's own deprecated-alias metadata or by comparing raw SVG path data
// (not guessed) - see the port session notes in CLAUDE.md.
const RENAME_MAP = {
  airplane: 'plane',
  'align-left': 'text-align-start',
  'align-right': 'text-align-end',
  'align-center': 'text-align-center',
  'arrow-down-az': 'arrow-down-a-z',
  'arrow-down-za': 'arrow-down-z-a',
  'attach-file': 'paperclip',
  cart: 'shopping-cart',
  'circle-help': 'circle-question-mark',
  clap: 'clapperboard',
  'cursor-click': 'mouse-pointer-click',
  downvote: 'thumbs-down',
  'file-check-2': 'file-check-corner',
  fingerprint: 'fingerprint-pattern',
  history: 'rotate-ccw-clock',
  home: 'house',
  'key-circle': 'key-round',
  logout: 'log-out',
  upvote: 'thumbs-up',
  waves: 'waves-horizontal'
}

// Icons with no current Lucide equivalent at all - brand logos Lucide
// dropped entirely (trademark/licensing), a redesigned-beyond-mapping icon
// (connect), and one that was never actually a Lucide icon to begin with
// (flask, a Font Awesome-style path pasted into the upstream repo). Category
// assigned by hand since Lucide has no data for these.
const MANUAL_CATEGORIES = {
  chrome: ['connectivity'],
  discord: ['social'],
  dribbble: ['social', 'design'],
  facebook: ['social'],
  figma: ['design', 'social'],
  github: ['development', 'social'],
  gitlab: ['development', 'social'],
  instagram: ['social'],
  linkedin: ['social'],
  twitch: ['social'],
  twitter: ['social'],
  youtube: ['social'],
  connect: ['connectivity'],
  flask: ['science'],
  'align-horizontal': ['layout'],
  'align-vertical': ['layout']
}

function toKebab(name) {
  return name
    .replace(/Icon$/, '')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([0-9])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

async function fetchCategories(name) {
  const lookupName = RENAME_MAP[name] ?? name
  const url = `https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/${lookupName}.json`
  const res = await fetch(url)
  if (!res.ok) return null
  const data = await res.json()
  return data.categories ?? []
}

async function withConcurrency(items, limit, fn) {
  const results = new Array(items.length)
  let i = 0
  async function worker() {
    while (i < items.length) {
      const idx = i++
      results[idx] = await fn(items[idx], idx)
    }
  }
  await Promise.all(Array.from({ length: limit }, worker))
  return results
}

const files = readdirSync(ICONS_DIR).filter((f) => f.endsWith('.vue'))
const names = files.map((f) => toKebab(f.replace('.vue', '')))

const misses = []
const result = {}

await withConcurrency(names, 12, async (name) => {
  if (MANUAL_CATEGORIES[name]) {
    result[name] = MANUAL_CATEGORIES[name]
    return
  }
  const categories = await fetchCategories(name)
  if (categories === null) {
    misses.push(name)
    return
  }
  if (categories.length) result[name] = categories
})

writeFileSync(OUT, JSON.stringify(result, null, 2) + '\n', 'utf8')
console.log(`Wrote categories for ${Object.keys(result).length}/${names.length} icons to ${OUT}`)
if (misses.length) {
  console.log(`\n${misses.length} icon(s) had no match on Lucide (add to RENAME_MAP or MANUAL_CATEGORIES):`)
  console.log(misses.join(', '))
}
