import { defineConfig } from 'vitepress'

// Deployed under a sub-path (for example GitHub Pages at /hermes-express-gdd/)? Set GDD_BASE.
const BASE = process.env.GDD_BASE || '/'

const features: [string, string][] = [
  ['Run and quota', 'run-and-quota'],
  ['Trials', 'trials'],
  ['Day cycle, overtime and storm', 'day-cycle-and-storm'],
  ['Packages', 'packages'],
  ['Damage and repair', 'damage-and-repair'],
  ['Driving', 'driving'],
  ['Upgrades', 'upgrades'],
  ['Boss day: Charon', 'boss-charon'],
  ['Shift HUD', 'hud'],
  ['Combo (cut)', 'combo'],
]

// Status words as written in the Markdown (lower case, read by scripts/check_docs.py).
const STATUSES = ['changed — code pending', 'in progress', 'implemented', 'designed', 'idea', 'cut']
const STATUS_RE = STATUSES.map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')

function badge(status: string): string {
  const cls = status.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '')
  return `<span class="status-badge status-${cls}">${status.toUpperCase()}</span>`
}

// Presentation only: the Markdown stays plain so the checker and readers of the raw files are unaffected.
function decorate(html: string): string {
  // Status in index tables and in each feature's "**Status:** ..." header.
  html = html.replace(new RegExp(`<td>(${STATUS_RE})</td>`, 'g'), (_m, s) => `<td>${badge(s)}</td>`)
  html = html.replace(
    new RegExp(`(<strong>Status:</strong>\\s*)(${STATUS_RE})`, 'g'),
    (_m, lead, s) => lead + badge(s),
  )

  // Table rows: decision rows get an anchor; superseded / obsolete decisions and cut features are greyed.
  html = html.replace(/<tr>([\s\S]*?)<\/tr>/g, (row, inner: string) => {
    const classes: string[] = []
    let id = ''
    const dec = inner.match(/^\s*<td>D-(\d{3})<\/td>/)
    if (dec) {
      id = ` id="d-${dec[1]}"`
      inner = inner.replace(`<td>D-${dec[1]}</td>`, `<td><span class="decision-id">D‑${dec[1]}</span></td>`)
      if (/superseded by|obsolete/.test(inner)) classes.push('row-superseded')
    }
    if (inner.includes('status-cut')) classes.push('row-cut')
    const cls = classes.length ? ` class="${classes.join(' ')}"` : ''
    return `<tr${id}${cls}>${inner}</tr>`
  })

  // Tuning values.
  html = html.replace(/\[TUNE(:[^\]]*)?\]/g, (_m, rest) => `<mark class="tune">TUNE${rest ?? ''}</mark>`)

  // Decision references become links to their row in the GDD.
  html = html.replace(/(?<![\w#/=\-"])D-(\d{3})\b/g, (_m, n) => `<a class="decision-ref" href="${BASE}GDD#d-${n}">D‑${n}</a>`)
  return html
}

export default defineConfig({
  base: BASE,
  title: 'Hermes Express GDD',
  description: 'Spec-driven game design document for Hermes Express.',
  lang: 'en',
  cleanUrls: true,
  lastUpdated: true,
  srcExclude: ['archive/**'],
  markdown: {
    config(md) {
      const render = md.renderer.render.bind(md.renderer)
      md.renderer.render = (tokens, options, env) => decorate(render(tokens, options, env))
    },
  },
  themeConfig: {
    nav: [
      { text: 'GDD', link: '/GDD' },
      { text: 'Decisions', link: '/GDD#decisions' },
    ],
    sidebar: [
      {
        text: 'Game design document',
        items: [
          { text: 'Overview', link: '/GDD' },
          { text: 'Feature index', link: '/GDD#feature-index' },
          { text: 'Screens and flow', link: '/GDD#screens-and-flow' },
          { text: 'Decisions', link: '/GDD#decisions' },
          { text: 'Open questions', link: '/GDD#open-questions' },
        ],
      },
      {
        text: 'Features',
        items: features.map(([text, slug]) => ({ text, link: `/features/${slug}/design` })),
      },
    ],
    outline: { level: [2, 3], label: 'On this page' },
    search: { provider: 'local' },
    footer: { message: 'Source of truth: the Markdown in docs/. Status words and [TUNE] are styled by the site only.' },
  },
})
