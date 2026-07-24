import keywordMap from '~/utils/icon-keywords.json'
import categoryMap from '~/utils/icon-categories.json'
import categoryTitles from '~/utils/category-titles.json'
import customIconNames from '~/utils/custom-icons.json'

export interface IconEntry {
  componentName: string
  name: string
  component: unknown
  source: string
  keywords: string[]
  categories: string[]
  isCustom: boolean
}

export interface CategoryEntry {
  slug: string
  title: string
  count: number
}

function toKebab(name: string) {
  return name
    .replace(/Icon$/, '')
    .replace(/([a-zA-Z])([0-9])/g, '$1-$2')
    .replace(/([0-9])([0-9])/g, '$1-$2')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

const modules = import.meta.glob('../components/icons/*.vue', { eager: true }) as Record<
  string,
  { default: unknown }
>
const rawModules = import.meta.glob('../components/icons/*.vue', {
  eager: true,
  query: '?raw',
  import: 'default'
}) as Record<string, string>

const customNames = new Set(customIconNames as string[])

const icons: IconEntry[] = Object.entries(modules)
  .map(([path, mod]) => {
    const componentName = path.split('/').pop()!.replace('.vue', '')
    const name = toKebab(componentName)
    return {
      componentName,
      name,
      component: mod.default,
      source: rawModules[path] ?? '',
      keywords: (keywordMap as Record<string, string[]>)[name] ?? [],
      categories: (categoryMap as Record<string, string[]>)[name] ?? [],
      isCustom: customNames.has(name)
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

const byName = new Map(icons.map((icon) => [icon.name, icon]))

const categoryCounts = new Map<string, number>()
for (const icon of icons) {
  for (const slug of icon.categories) {
    categoryCounts.set(slug, (categoryCounts.get(slug) ?? 0) + 1)
  }
}
const categories: CategoryEntry[] = [...categoryCounts.entries()]
  .map(([slug, count]) => ({
    slug,
    title: (categoryTitles as Record<string, string>)[slug] ?? slug,
    count
  }))
  .sort((a, b) => a.title.localeCompare(b.title))

export function useIconRegistry() {
  return {
    icons,
    categories,
    getIcon: (name: string) => byName.get(name),
    getCategory: (slug: string) => categories.find((c) => c.slug === slug)
  }
}
