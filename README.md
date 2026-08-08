# UPI MDR Impact — Microsite

Consumer-advocacy microsite on the proposed UPI MDR (Aug 2026). Built with Vite + React 19 + Tailwind 4.

## Sections (tabs)

1. **Calculator** — household MDR impact: income + MCC categories → annual cost estimate
2. **Boss Fight** — interactive 10-level argument-defeat game ("Defeat every MDR justification")
3. **Timeline** — 2016 → Aug 2026 chronology (10 eras)
4. **Act Now** — CTA: letter to MP, RTI, WhatsApp share

## Stack

- Vite 8 + React 19 + TypeScript
- Tailwind CSS 4 (`@tailwindcss/vite` plugin, no config file)
- recharts (calculator charts), lucide-react (icons)

## Internationalization

The site is locale-ready before translations are added. All visible interface and
content strings pass through `src/i18n.tsx`, which provides:

- Locale selection for English, Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam, and Punjabi
- Browser-language detection with localStorage persistence (`upi-mdr-locale`)
- Safe English fallback for languages whose dictionary is not translated yet
- Dynamic document language and page title updates

To add a language, populate `translations[locale]` in `src/i18n.tsx` using the
existing English string passed to `t()` as the key. Keep numbers, rates, and
policy assumptions in `src/data/mdr-data.ts`; translate only the presentation
strings and content copy.

## Local dev

```bash
npm install
npm run dev        # dev server
npm run build      # production build → dist/
npm run preview    # serve dist/ locally
```

## Deploy to Netlify

### Option A — Netlify CLI (manual)

```bash
npx netlify-cli login
npx netlify-cli deploy --dir dist --prod
```

### Option B — Netlify CI (recommended)

Push this folder's git repo to GitHub, then in Netlify:

1. New site → Import from Git → pick the repo
2. Build command: `npm run build`
3. Publish directory: `dist`

`netlify.toml` is already configured:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

The redirect rule makes all routes (including any future deep links) serve the SPA.

## Notes

- All content data lives in `src/data/mdr-data.ts` (boss fights, timeline eras, MCC categories, rates).
- Rates/thresholds editable in `src/data/mdr-data.ts` — single source of truth for the calculator.
- Research backing this site: `../research/` + `../TIMELINE.md` (see `../AGENTS.md`).
