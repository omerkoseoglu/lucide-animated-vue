import { onMounted, ref } from 'vue'

// Resolves the real, currently-served origin + base path for building
// absolute registry URLs (`<origin><base>r/<name>.json`). Deliberately
// client-side: this app can be prerendered as a fully static site (GitHub
// Pages, etc.), where every visitor gets the SAME prerendered HTML
// regardless of domain — a build-time/SSR-request origin would be wrong
// or stale. `window.location.origin` is always correct for wherever the
// static output actually ends up being served from.
export function useSiteOrigin() {
  const origin = ref('')
  const config = useRuntimeConfig()
  const base = config.app.baseURL.endsWith('/') ? config.app.baseURL : `${config.app.baseURL}/`

  onMounted(() => {
    origin.value = window.location.origin
  })

  return { origin, base }
}
