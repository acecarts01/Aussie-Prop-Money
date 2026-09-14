# Australian Reserve Props — project instructions

Mobile-first Next.js (App Router) ecommerce store selling legal novelty/prop currency (Australian-note styled) to the domestic AU market only. Deploy target: **Vercel**; the only server code is the `/api/send` mail route. Framework Preset on Vercel must be Next.js.

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

## Order & contact mail — Vercel environment variables only
Forms post to `/api/send` (`src/app/api/send/route.js`), which sends mail over SMTP (nodemailer). Every setting is a **server-side** Vercel env var (Project → Settings → Environment Variables); nothing reaches the browser. No third-party form service. See `.env.example` for the full list.
- `SMTP_HOST=smtp.zoho.com` (global cluster — `.com.au` fails with 535), `SMTP_PORT=465`, `SMTP_USER`, `SMTP_PASS` (Zoho app password). **Configured and verified with a live test order 2026-09-12.** Without them the API returns 503 and the form shows a WhatsApp fallback.
- Optional inboxes: `ORDER_TO`, `CONTACT_TO`, `WHOLESALE_TO`, `MAIL_FROM`.
- Email design: `src/lib/mail-templates.js` — three models, `MAIL_TEMPLATE` selects (default **studio**, client choice 2026-09-12). Every order sends TWO designed emails at once: the internal notification (to ORDER_TO) and the customer confirmation (with `ARP-…` reference; it acknowledges the selected payment method but carries NO payment details — client flow 2026-09-12: the owner confirms the method first, then sends the tax invoice with details).
- Tax invoice / payment-received email: owner sends it from the private page `/admin/invoice/` (noindex, robots-disallowed) → `/api/invoice`, protected by `ADMIN_KEY` (Secret env var). GST shown as 1/11th of the total — prices are treated as GST-inclusive; confirm with the client's accountant.
- Optional payment instructions injected into the **awaiting-payment tax invoice** (not the confirmation): `PAYID_ID`, `PAYID_NAME`, `BANK_NAME`, `BANK_BSB`, `BANK_ACCOUNT`, `BANK_ACCOUNT_NAME`, `CRYPTO_BTC/USDT/ETH/BNB`.

## Payment methods (client decision 2026-09-12)
PayID, Bank Transfer, and crypto (BTC/USDT/ETH/BNB) with a **10% discount on the goods subtotal** (`ORDER.cryptoDiscount`). No card processor. The discount is a plain price incentive — it is never framed as privacy, anonymity or "discretion" (that part of the compliance rule still stands).

## Still pending
- Payment-detail env vars (`PAYID_ID`, `BANK_*`, `CRYPTO_*`) — not yet set; confirmation emails say "details to follow" until they are
- Real social profiles (`SITE.sameAs` is empty — never invent)

## Brand facts (only these are true — never invent more)
- Site name: Australian Reserve Props. Domain: australianreserveprops.com.
- Legal entity: Money 365 Pty Ltd (Australian Private Company), ABN 84 676 764 971, active and GST-registered from 22 Apr 2024. Main business location: The Ponds, NSW 2769. (Supplied 2026-09-12 from the ABR record.)
- Official email: info@australianreserveprops.com (Zoho Mail). WhatsApp: +61 480 804 189 — also used as the contact number; no separate landline supplied.
- Founded 2024. Predecessor site went offline; select reviews recovered from that period (client-confirmed genuine, published with dates as given).
- Market: Australia only (no cross-border shipping/marketing).
- Product: Australian-styled novelty/prop currency notes ($20/$50/$100 minimum, plus vintage series), packs, briefcases, confetti/leis, display collectibles, personalised novelty, kids play money, gift sets, accessories.
- Payment methods: PayID, Bank Transfer, crypto (BTC/USDT/ETH/BNB) at 10% off. No card payment.
- Pricing 2026-09-14: all base prices +5% with charm rounding (.95 under $100, whole dollar at $100+; avg +5.35%). Every currency product carries `noteCount`, `faceValue`, `tier`, `mix`; the face-value return (pay → receive → multiplier) is rendered by `src/lib/value.js` + `ValueReturn` / `YieldCallout`. Audit: `docs/pricing-2026-09-14.md` / `.json`.
- Minimum order: $350 AUD goods subtotal (`SITE.orderRules.minOrder`, enforced in checkout UI and in `/api/send`). Shipping is free on every order. Client decision 2026-09-14.
- No invented statistics, awards, press mentions, named clients, or partnerships. Ever.
