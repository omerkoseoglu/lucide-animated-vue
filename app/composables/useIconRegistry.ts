import keywordMap from '~/utils/icon-keywords.json'

export interface IconEntry {
  componentName: string
  name: string
  component: unknown
  source: string
  keywords: string[]
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

const icons: IconEntry[] = Object.entries(modules)
  .map(([path, mod]) => {
    const componentName = path.split('/').pop()!.replace('.vue', '')
    const name = toKebab(componentName)
    return {
      componentName,
      name,
      component: mod.default,
      source: rawModules[path] ?? '',
      keywords: (keywordMap as Record<string, string[]>)[name] ?? []
    }
  })
  .sort((a, b) => a.name.localeCompare(b.name))

const byName = new Map(icons.map((icon) => [icon.name, icon]))

export function useIconRegistry() {
  return {
    icons,
    getIcon: (name: string) => byName.get(name)
  }
}
