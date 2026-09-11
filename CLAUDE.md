# Australian Reserve Props — project instructions

Mobile-first Next.js (App Router) ecommerce store selling legal novelty/prop currency (Australian-note styled) to the domestic AU market only. Deploy target: **Vercel**, no client backend. Framework Preset on Vercel must be Next.js.

## Non-negotiable: currency-reproduction compliance
Authority: Crimes (Currency) Act 1981 (Cth) + RBA "Reproducing Banknotes" guidance; Meta/TikTok ad policy on deceptive content; Australian Consumer Law (misleading conduct, fake reviews).

- **Banned words — never appear anywhere in output** (site copy, product descriptions, blog, alt text, JSON-LD, llms.txt, MCP tool descriptions): counterfeit, undetectable, indistinguishable, passes the pen test, 1:1 scale, full size, real money, legal tender (except inside the required disclaimer itself), spendable, heist money, ransom money, low-profile payment, untraceable, anonymous payment.
  - "fake money" / "fake [denomination]" is **allowed** (revised 2026-09-05): it's high-volume, Commercial-intent AU search terminology (verified via Semrush export, not a guess) and is honest — calling the product "fake" is the opposite of claiming it could pass as real. The banned terms above are the ones that actually claim deceptive capability; "fake" merely states the truth.
- **Required framing — every product description carries this:** reproduction sized to differ from genuine AUD notes by at least 25% (per RBA guidance), clearly marked as a prop / "NOT LEGAL TENDER", no replicated banknote security features, "for film, theatre, education, and novelty use only."
- **Prohibited claims:** anything implying a note could pass as real currency or defeat counterfeit-detection equipment; anything implying RBA or Australian Government endorsement; **no custom or buyer-specified serial numbers** (system-assigned placeholder serials only); no payment method may be marketed as anonymous, untraceable, or low-profile.
- **Reviews:** review/AggregateRating schema is emitted ONLY for reviews confirmed genuine by the client. Never generate a testimonial.
- **If a request would require breaking any of the above, stop and say so rather than complying.**

## Architecture
`src/config/site.js` is the single source of truth. Adding one entry to `PRODUCTS` / `CATEGORIES` / `POSTS` generates the page, route, meta, JSON-LD, sitemap entry, and nav links. Never hand-write pages. Never hand-edit generated files (`llms.txt`, `.well-known/*`, `vercel.json`) — edit the config and rebuild.

## Rules
- `npm run build && npm run crosscheck` must pass before every push.
- One `<h1>` per page. Meta descriptions ~150 chars (≤160). Titles ≤60.
- Product images: WebP+AVIF, white 4:3 frame, via `npm run images`.
- Emails entity-encoded (`&#64;`) everywhere, including JSON-LD.
- Never commit `node_modules/`, `.next/`, `out/`.

## Deployment & search-engine status (as of 2026-09-11)
- **LIVE** at https://australianreserveprops.com — Vercel project `aussie-prop-money` in the **ACE** team (acecarts01). Apex is primary; `www` 308-redirects to apex. The old duplicate project in the Prop Money team has been deleted — there is exactly one project now.
- **Vercel ownership**: two `_vercel` TXT records (apex + www) in ACE's DNS. Leave them in place.
- **Google Search Console**: verified under acecarts01@gmail.com via HTML tag. Two GSC tokens are emitted (see `SITE.gscVerification`) — one per Google account that has owned the property. Don't remove either. Sitemap submitted.
- **Bing Webmaster Tools**: set up via "Import from Google Search Console" — no Bing-specific token needed (`SITE.bingVerification` is intentionally empty).
- **IndexNow**: key file live at `/{SITE.indexNowKey}.txt`; all sitemap URLs submitted (202 Accepted). Re-submit after any content update — see docs/PROJECT.md for the call.

## Live placeholders (still pending)
- Contact email/phone/WhatsApp — pending, using `[EMAIL]` / `[NUMBER]` placeholders
- Business location/HQ (state/city) — pending, required before AI-visibility schema (`foundingLocation`, `areaServed`) can ship truthfully
- ABN / GST registration status — pending, needed for `.com.au` registration and invoicing
- Web3Forms access key — pending; forms redirect straight to thank-you page until set (no order emails are sent yet)
- Stripe/PayPal account — pending setup; checkout ships with Bank Transfer + PayID + BTC/USDT/ETH/BNB live, card processor added once account is approved

## Brand facts (only these are true — never invent more)
- Site name: Australian Reserve Props. Domain: australianreserveprops.com.
- Founded 2024. Predecessor site went offline; select reviews recovered from that period (client-confirmed genuine, published with dates as given).
- Market: Australia only (no cross-border shipping/marketing).
- Product: Australian-styled novelty/prop currency notes ($20/$50/$100 minimum, plus vintage series), packs, briefcases, confetti/leis, display collectibles, personalised novelty, kids play money, gift sets, accessories.
- Payment methods: Bank Transfer, PayID, crypto (BTC/USDT/ETH/BNB), Stripe/PayPal (pending account approval).
- No invented statistics, awards, press mentions, named clients, or partnerships. Ever.
