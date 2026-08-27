# Australian Reserve Props

Mobile-first Next.js (App Router) ecommerce site for Australian-styled novelty prop currency. Australia-only market. Deploy target: Vercel.

## Stack
Next.js 15 (App Router), React 18, plain CSS (no framework) with the "Note Palette" design system in `src/styles/globals.css`.

## Commands
```bash
npm install
npm run dev          # local dev server
npm run build         # production build (runs prebuild -> gen-agent-files first)
npm run crosscheck    # compliance + structural scan
```

## Where things live
- `src/config/site.js` — single source of truth: brand info, categories, products, reviews, FAQs, blog posts, payment methods. Edit this, not generated files.
- `scripts/gen-agent-files.mjs` — generates `public/llms.txt`, `public/auth.md`, `public/.well-known/*`, `public/js/webmcp.js`, and `vercel.json` from `SITE.domain`. Runs automatically before every build.
- `scripts/crosscheck.mjs` — scans for banned compliance terms (see `CLAUDE.md`) and required agent-ready files.
- `docs/PROJECT.md` — full intake record and open items. `docs/keyword-map.md` — internal keyword research, never shipped publicly.

## Known placeholders (see CLAUDE.md → Live placeholders)
Contact details, business location, ABN/GST status, Web3Forms key, and card payment (Stripe/PayPal) are all pending — the site works without them (chat/email ordering, Bank Transfer/PayID/crypto checkout) and each is a one-line config change once supplied.

## Product photos
No real photos supplied yet — `src/components/ProductArt.jsx` renders an inline SVG placeholder per product, colour-matched to its denomination. Replace with real photography (2000px+, white background) and wire up `scripts/images.mjs` (not yet built — add when photos arrive) when ready.

## Deploying (Vercel)
1. `git init && git add . && git commit -m "Initial build"` (already done if you received this via Claude Code).
2. Create an empty GitHub repo, then:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
3. In Vercel: Add New → Project → import the repo → **Framework Preset: Next.js** → Deploy.
4. Once a domain is connected, confirm `SITE.domain` in `src/config/site.js` matches it, then rebuild/redeploy.
