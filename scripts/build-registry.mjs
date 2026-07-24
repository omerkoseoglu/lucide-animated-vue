// Builds a shadcn-vue registry from every ported icon component, so each
// one can be installed into a consumer project with:
//   npx shadcn-vue@latest add <site-url>/r/<name>.json
//
// Writes one registry-item.json per icon to public/r/<name>.json (served
// as-is by Nuxt's static public/ dir), plus a lightweight catalog at
// public/r/registry.json and registry.json (root) listing all items
// without their file content, per the shadcn registry.json spec.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = process.cwd()
const ICONS_DIR = join(ROOT, 'app/components/icons')
const OUT_DIR = join(ROOT, 'public/r')

mkdirSync(OUT_DIR, { recursive: true })

function toKebab(name) {
  return name
    .replace(/Icon$/, '')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([0-9])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

const files = readdirSync(ICONS_DIR).filter((f) => f.endsWith('.vue'))
const items = []

for (const file of files) {
  const componentName = file.replace('.vue', '')
  const name = toKebab(componentName)
  const content = readFileSync(join(ICONS_DIR, file), 'utf8')

  const item = {
    $schema: 'https://shadcn-vue.com/schema/registry-item.json',
    name,
    type: 'registry:component',
    title: componentName,
    description: `Animated "${name}" icon, ported from pqoqubbw/icons.`,
    dependencies: ['motion-v'],
    files: [
      {
        path: `components/icons/${file}`,
        content,
        type: 'registry:component',
        target: `components/icons/${file}`
      }
    ]
  }

  writeFileSync(join(OUT_DIR, `${name}.json`), JSON.stringify(item, null, 2) + '\n', 'utf8')

  const { files: itemFiles, $schema: _drop, ...itemWithoutContent } = item
  items.push({
    ...itemWithoutContent,
    files: itemFiles.map(({ content: _c, ...rest }) => rest)
  })
}

const registry = {
  $schema: 'https://shadcn-vue.com/schema/registry.json',
  name: 'lucide-animated-vue',
  homepage: 'https://github.com/pqoqubbw/icons',
  items
}

const registryJson = JSON.stringify(registry, null, 2) + '\n'
writeFileSync(join(OUT_DIR, 'registry.json'), registryJson, 'utf8')
writeFileSync(join(ROOT, 'registry.json'), registryJson, 'utf8')

console.log(`Built ${items.length} registry items in public/r/`)
