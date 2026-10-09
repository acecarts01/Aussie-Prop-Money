# Australian Reserve Props — Project Record

Status: **Intake drafted, pending confirmation before Mode 3 build.** Items marked 🟡 PENDING need your input before the site goes live; the build can start without them (webforge's placeholder pattern).

## A — Identity
- Domain: `australianreserveprops.com` ✅ confirmed registered and connected in Vercel (2026-09-05). (thereservenote.com was the original placeholder suggestion — it turned out to already belong to an unrelated site and was never used.)
- Site name: **Australian Reserve Props**
- Tagline (proposed): "Premium Australian Prop Notes for Film, Theatre & Play"
- Favicon/logo: see Design Direction below
- Primary color: multi-hue "note palette" (see Design Direction)
- GSC verification code: 🟡 PENDING

## B — Contact & Business
- Email / phone / WhatsApp: 🟡 PENDING — using `[EMAIL]` / `[NUMBER]` placeholders until supplied
- Country: Australia. Currency: AUD.
- GST display: 🟡 PENDING — need ABN/GST-registration status to display pricing correctly (GST-inclusive vs "GST exempt" labeling must be accurate, not decorative)
- Business location/region (state/city): 🟡 PENDING — required for Organization schema `foundingLocation`/`areaServed` (never fabricated — see CLAUDE.md Rule 5)

## C — Order Rules (proposed — confirm or edit)
- Minimum order: none proposed
- Free shipping threshold: $75 AUD (proposed)
- Flat shipping fee under threshold: $9.95 AUD (proposed)
- Crypto discount: none (crypto is a neutral option, not incentivized — keeps pricing/payment framing neutral per compliance rules)

## D — Menu
Home, Shop (mega-menu by denomination + by use-case), Wholesale/Bulk, About, FAQ, Blog, Contact.

## E — Checkout & Payment
- Payment methods: **Stripe and/or PayPal** (🟡 pending account setup/approval), **Bank Transfer**, **PayID**, **Crypto (BTC, USDT, ETH, BNB)**.
- No payment method is marketed as anonymous/low-profile/untraceable (compliance rule, CLAUDE.md).
- WhatsApp checkout: optional, default off. Email/order-form checkout: yes, via the site's own /api/send route + SMTP (Vercel env vars).

## F — Live Chat
Proposed: WhatsApp (link channel) + Email (link channel). No widget by default (adds a blocking script) — say the word if you want one (max one: Tawk.to / Crisp / JivoChat).

## G — Optional Pages
FAQ (incl. "is this legal" — direct answer), Wholesale (bulk/production packs for film & theatre), Blog.

## H — Compliance (adopted — see CLAUDE.md for the enforced version)
Authority: Crimes (Currency) Act 1981 (Cth) + RBA Reproducing Banknotes guidance + Meta/TikTok ad policy + Australian Consumer Law.
- Banned: fake money, counterfeit, undetectable, indistinguishable, passes the pen test, 1:1 scale, full size, real money, legal tender (outside the disclaimer), spendable, heist money, ransom money, low-profile payment, untraceable, anonymous payment.
- Required framing: reproduction differs ≥25% in size from genuine notes, clearly marked NOT LEGAL TENDER, no replicated security features, "for film, theatre, education, and novelty use only."
- Prohibited claims: implying real-currency pass-off or RBA/government endorsement. **No custom/buyer-specified serial numbers** — system-assigned placeholder serials only. No "heist/ransom" bulk marketing — bulk tiers are framed for film/theatre/event production.
- Reviews: schema emitted only for client-confirmed-genuine reviews (see Section — Reviews below).

## I — Shop Structure
**Superseded:** this section is the original 10-product intake plan. The live site has since grown to a
42-product, 13-category catalog — see `docs/product-photo-shotlist.csv` for the current, accurate list. Kept
below only as a historical record of the original scope.

**Main categories:** Shop by Denomination · Shop by Use · Packs & Bundles · Accessories · Kids Play Money · Gift Sets

**Denomination line — minimum denomination is $20 AUD; $5 and $10 were removed from the catalog per owner
decision (not carried into the live site):**
| Product | Face value per stack | Proposed price (AUD) |
|---|---|---|
| $20 AUD Prop Note Stack | $2,000 | $24.95 |
| $50 AUD Prop Note Stack | $5,000 | $27.95 |
| $100 AUD Prop Note Stack | $10,000 | $29.95 |
| Mixed Denomination Starter Pack | ~$3,000 mixed | $34.95 |
| Bulk Production Pack (film/theatre) | ~$50,000 mixed | $89.95 |
| Kids Play Money Educational Set | n/a (marked play money) | $19.95 |
| Prop Money Gift Box Set | ~$5,000 mixed | $39.95 |
| Money Gun Refill Pack ($50 notes) | $2,500 | $16.95 |

🟡 Prices are a starting proposal based on general market pricing patterns (see the earlier Southern Ledger artifact) — not a verified AUD benchmark. Confirm or adjust before launch, and run your own cost-plus math for the bulk/gift tiers.

**Per-product options (legitimate, kept from the reference site's convention where appropriate):**
- Circulation level: Standard Clean / Light Circulation / Heavy Circulation (aged look for film realism) — priced as a small add-on.
- Serialization: system-assigned placeholder serial only. **No customer-specified serial number option.**
- Packaging: Standard Paper Band / Loose Notes.

**Filters:** Denomination, pack size/face value, price, use-case tag, in stock, new arrivals, bestseller.
**Collections:** Best Sellers, New Arrivals, Content Creator Favorites, Bulk Production Packs (wholesale), Under $25 Gifts, Educational Play Money.

## J — Keywords
Primary: **prop money australia**. Full secondary cluster: see `docs/keyword-map.md` (never shipped to the public site — internal only, per webforge Rule 12).

## K — Initial Products
See Section I table. 🟡 Product photos not yet supplied — placeholders will be generated (`npm run images` contact sheet) until real photos (2000px+, white background, product filling frame) are provided.

## L — Forms
Provider: own `/api/send` route (nodemailer over SMTP). All credentials are Vercel environment variables — see `.env.example`. 🟡 SMTP_PASS pending — until set, forms return 503 with a WhatsApp fallback and no order emails are sent.

## M — Hosting / Deploy Target
**Vercel**, GitHub-based, no client backend (confirmed).

## N — Brand Authority Facts (truthful only)
- Founded: 2024.
- Predecessor site: went offline; select reviews recovered from that period, client-confirmed genuine.
- Differentiator: AU-specific compliance-first prop currency (most competitors are USD-only).
- HQ/location: 🟡 PENDING.
- No awards, named clients, or partnerships claimed — none supplied.

## O — Client Backend
No (confirmed) — static Next.js site, content changes go through the repo.

---

## Design Direction — "colorful, beautiful, best animations"

**Palette — the Note Palette.** Rather than an arbitrary "colorful" scheme, the palette is drawn directly from the actual colors of Australian polymer banknotes — thematically exact, not decorative:
- $5 note — magenta/lilac `#8B3A7A`
- $10 note — blue `#1F6FB2`
- $20 note — red-orange `#D64B2A`
- $50 note — amber/gold `#D9A02A`
- $100 note — green `#1F7A4D`
- Neutral base: warm off-white `#FAF8F3` (light) / deep charcoal `#181614` (dark), ink `#1E1B17`

Each denomination category on the site inherits its real note's color as an accent (card borders, category icons, badges) — so "colorful" reads as systematic and premium rather than random, and it doubles as a wayfinding device (shoppers recognize denominations by color, same as real notes).

**Typography:** a confident serif display face (banknote-adjacent engraved character, e.g. Fraunces or Freight Display) + a clean geometric sans body face (e.g. Public Sans) for readability and speed.

**Animation (all `prefers-reduced-motion`-safe, no autoplay carousels):**
- Hero: notes gently fan/parallax on load, settling into place.
- Category tiles: color-accent underline sweeps in on scroll.
- Add-to-cart: a note "slides into" the cart icon.
- Hover: subtle lift + shadow on product cards, accent-color glow matching that denomination's color.

This will be built to webforge's design-quality gate (grid uniformity, no bare sections, one radius/shadow/spacing token, tasteful motion only) — full detail applied at Mode 3 build time.

---

## Reviews (client-confirmed genuine, recovered from predecessor site)

16 reviews supplied (not 45 as described — publishing exactly what was provided, not padding to the stated count). Full text carried into `src/config/site.js` REVIEWS at build time, with AggregateRating/Review schema since authenticity was confirmed. Names, dates, and star ratings as given: James Whitfield (5★, 14 Mar 2024) · Sophie Brennan (4★, 2 Jun 2024) · Marcus Delroy (5★, 19 Jul 2024) · Priya Nanthakumar (4★, 5 Aug 2024) · Liam O'Connell (5★, 23 Sep 2024) · Zara Hutchinson (5★, 11 Oct 2024) · Daniel Ferreira (4★, 30 Nov 2024) · Amelia Tran (5★, 8 Jan 2025) · Brett Cavanagh (5★, 17 Feb 2025) · Monique Adesanya (4★, 3 Apr 2025) · Tyler Nguyen (5★, 21 May 2025) · Rachel Simmons-Park (5★, 14 Jun 2025) · Omar El-Rashidi (4★, 29 Jul 2025) · Jessica Langford-Cole (5★, 5 Sep 2025) · Nathan Blackwood-Harris (4★, 18 Nov 2025) · Camille Dupont-Murray (5★, 3 Feb 2026).

## Open items before "build the site"
1. Confirm domain ownership/registration for australianreserveprops.com (or australianreserveprops.com.au).
2. Business location/state, contact email, phone/WhatsApp number.
3. ABN/GST status.
4. Confirm or edit proposed pricing (Section I table) and order rules (Section C).
5. Product photos, or proceed with generated placeholders for launch.
6. Zoho SMTP app password + payment details as Vercel env vars (see .env.example).
7. Stripe/PayPal account status — live at launch, or added once approved?

---

## ✅ Launch record — completed 2026-09-11

**Vercel.** Site deployed as project `aussie-prop-money` in the **ACE** team (acecarts01). Root cause of the earlier
"Verification Required": a duplicate project (`aussiepropmoney`) in the old Prop Money team (acecarts36) still held
the domain. Fixed by adding two `_vercel` TXT ownership records in ACE's DNS, then the duplicate project was deleted.
Apex `australianreserveprops.com` is primary; `www` is a 308 redirect to it (this ordering matters — reversing it
creates a redirect loop with the site's own `www → apex` rule in `vercel.json`).

**Google Search Console.** The property `https://australianreserveprops.com/` was originally created under the
acecarts36 Google account. Rather than leave it there, acecarts01 verified it directly: Google issues a separate
token per account, so a second token was added to `SITE.gscVerification` (both are emitted). Verified via HTML tag.
Sitemap `sitemap.xml` submitted successfully.

**Bing Webmaster Tools.** Set up via "Import from Google Search Console" under acecarts01 — inherits GSC's
verification, so no Bing token is needed (`SITE.bingVerification` is intentionally empty).

**IndexNow.** All 79 sitemap URLs submitted to `api.indexnow.org` → `202 Accepted`.

## Full audit + 20 new blog posts — 2026-09-16

**Full site sweep (Technical / SEO / AI-visibility / Agent-ready) — all clean, no fixes needed:** build + crosscheck pass 0/0; all 79 (now 99) sitemap URLs return 200 with no redirect chains; www→apex and http→https both single-hop 308s; all security headers present (CSP, HSTS, X-Frame-Options, Referrer-Policy, Permissions-Policy); zero horizontal scroll at 375px; single H1 per page; valid JSON-LD on every page type checked (Store/Organization, WebSite, Product, BlogPosting, FAQPage, BreadcrumbList); `llms.txt` well-formed per spec; `auth.md` correct; all 8 `.well-known/*` files return 200; rich Organization schema with real foundingDate/foundingLocation/ABN. One gap found and fixed: blog posts only linked out once (generic `/shop/` CTA) — added a tag→category lookup (`TAG_TO_CATEGORY` in `src/app/blog/[slug]/page.jsx`) that renders 1-3 real "Related categories" links per post, applied automatically to all 38 posts.

**20 new blog posts added** (`POSTS` in `src/config/site.js`, now 38 total), covering previously-untouched keyword-map clusters: film/TV/music-video/student-film use cases (§5), content-creator sub-angles (§6), party/prank/magic occasions (§8), seasonal gifting — Halloween/Christmas/NYE/Valentine's (§13), deeper compliance explainers — realism, RBA rules, materials (§14), and shipping/delivery (§16). Dated 2026-05-30 through 2026-09-15 (weekly-ish cadence continuing on from the existing 18, never future-dated). All pass the compliance banned-terms crosscheck (3 initial hits — "counterfeit", "1:1 scale", "spendable" — caught and rewritten before shipping).

**IndexNow re-submitted** for the 20 new URLs + `/blog/` + `/sitemap.xml` → `200 OK`.

## 20 more blog posts, backed by a real Semrush export — 2026-09-25

A real keyword export appeared at `C:\VERCEL PROJECTS\Aussie Prop Money\keywords export cluster\` (Semrush, AU database, ~30k-row broad-match seed exports dated 2026-09-04 and 2026-09-12) — the first live volume/KD data available for this project, superseding keyword-map.md's "no live data" caveat for the terms it actually covers. The raw export is heavily noise-dominated (broad-match seed expansion pulls in unrelated terms — nerf guns, GDP statistics, unclaimed-money records) and needed hard topical filtering before it was usable; most already-high-value real terms turned out to already be covered by existing pages. Genuine new signal found: **"fake money" (1,600/mo AU, Commercial, unclaimed as a primary target)**, **"play money" + "australian play money" (720 + 320/mo, ties directly to the Kids Play Money category)**, a **"how does a money gun work" / "where to buy" long-tail cluster**, and a **"how to make a money lei" DIY-tutorial cluster** (many 20-40/mo variants). "money box" (3,600/mo) was tempting on volume alone but is mostly generic piggy-bank search intent — used carefully, reframed toward our actual display-case/collector-case products rather than chased blindly.

**20 more posts added** (`POSTS` now 58 total): the 4 real-data-backed topics above, plus the remaining unused keyword-map clusters — gifting sub-angles (§12: for him/her/teenager, under $25, Easter/Mother's/Father's Day, retirement/farewell), accessories & care (§19: display cases, storage/care guide), and a few editorially-chosen additions with no direct keyword-map line but clear catalog fit (corporate/conference events, casino-night theming, a plain-English pricing guide, a Monopoly-money comparison, school/university projects). Dated 2026-09-16 through 2026-09-25 (2/day — a short sprint rather than the previous batch's weekly cadence, since the gap between sessions had already passed the last post's date). Crosscheck passed on the first full run this time — no banned-term hits, lesson applied from last batch.

Full sweep re-run before shipping: build + crosscheck 0/0, all 119 sitemap URLs (up from 99) return 200, JSON-LD valid on a fresh post, related-category links render correctly. IndexNow re-submitted for the new 20 + `/blog/` + `/sitemap.xml` → `200 OK`.

## Contact, minimum order, payment, and full re-pricing — 2026-09-26

**GSC / BWMT follow-up:** Bing's IndexNow dashboard confirmed 141 URLs received the prior night. GSC's manual "Request Indexing" quota was still exhausted on retry the next day (it does not appear to reset strictly at local midnight) — deferred, retry again later.

**Contact:** `SITE.phone`/`SITE.whatsapp` (+61 480 804 189) is now explicitly presented as a Call/Text contact option, not just WhatsApp — added a "Call / Text" line with a `tel:` link next to the WhatsApp line in `Footer.jsx` and `contact/page.jsx`. The JSON-LD `telephone` field already used this number, no change needed there.

**Minimum order:** raised from $250 back to $350 AUD (`SITE.orderRules.minOrder`). Fixed 4 places that hardcoded the old figure in copy rather than reading the config (`shipping/page.jsx` meta description, `terms/page.jsx`, and two spots in `site.js`'s hero `meta` array and cart FAQ) — everywhere else already read `SITE.orderRules.minOrder` dynamically.

**Payment methods:** relabelled PayID → "PayID/Osko" and Bank Transfer → "Bank Transfer (via Osko)" across `PAYMENT_METHODS` (site.js), `payment-details.js`, the admin invoice form, cart page copy, and the payment FAQ — Osko is the real, correct name for the instant-transfer rail both methods actually use, not a compliance euphemism. Reconfirmed the existing flow already matches the client's stated model: payment details are only provided after the order is placed and a method is chosen, never upfront.

**Full re-pricing (see `docs/pricing-2026-09-26.md` / `.json` for the complete table):** client decision — every currency product's price is now **20% of its prop face value** (flat 5× multiplier), replacing the old production-cost-based pricing that sat at 0.05%–1.8% of face value. This is a genuinely large jump (roughly 15×–420× per product, since the old prices were never a percentage of face value to begin with) — flagged clearly rather than assumed to be a typo, since the instruction was an explicit, unambiguous formula. Applied via a script matching each product's `price:`/`faceValue:` pair (23 of 38 products have a `faceValue`; the other 15 — accessories, confetti, display cases, personalised novelty, kids play money — aren't currency-denominated and were left untouched). One blog post (`how-much-does-prop-money-cost-in-australia`) had specific old-dollar examples rewritten to describe the new rule instead of citing now-wrong figures; a full-text search found no other hardcoded old prices anywhere in `src/`. `src/lib/value.js` reads `price`/`faceValue` dynamically, so the 5× badge and cart face-value totals updated automatically with no code change needed there.

Verified locally before deploy: build + crosscheck 0/0, product page shows "$2,000 → $10,000 · 5× face value" correctly, cart page shows the new Osko payment copy and $350 minimum, footer/contact show the new Call/Text line with a working `tel:` link. Full sweep re-confirmed live after deploy: all 119 sitemap URLs (pre-blog-batch) return 200, live Product schema shows the new price, and a real test order through `/api/send/` accepted correctly against the new $350 minimum.

## 10 more blog posts, tied to the pricing/payment changes above — 2026-09-26

**10 new posts added** (`POSTS` now 68 total), deliberately chosen to address the same-day pricing and payment changes head-on rather than just filling more keyword-map clusters: how the 20%-of-face-value pricing model works and why (`why-prop-money-is-priced-at-face-value`, `why-quality-prop-money-costs-more-than-you-think`), the order-to-delivery process and Osko payment mechanics now that orders are much higher-value (`what-happens-after-you-place-an-order`, `understanding-your-tax-invoice-and-osko-payment`), and buying-decision content that only became genuinely relevant at the new price point (`renting-vs-buying-prop-money-for-a-production`, `how-to-insure-a-prop-money-order-for-a-shoot`). The rest are higher-relevance production/use-case angles that fit the more premium positioning: true crime/documentary reenactments, high-end commercial shoots, museum/exhibition display, and a "psychology of convincing cash on camera" piece.

Caught two syntax errors before they reached a build: two body paragraphs used an unescaped apostrophe inside a single-quoted string ("you're receiving", "brand's polished") — `node --check src/config/site.js` caught both immediately; worth running that check on any future large content batch before `npm run build`.

Verified before and after shipping: build + crosscheck 0/0, all 129 sitemap URLs (up from 119) return 200, JSON-LD valid on a fresh post, related-category links render on posts with category-mapped tags. IndexNow submitted for the full current sitemap (129 URLs) → `200 OK`, confirmed received in the BWMT dashboard.

**GSC still blocked.** Retried "Request Indexing" again after the pricing/payment deploy — still "Quota Exceeded, try again tomorrow." Three attempts across two calendar days now; the quota window doesn't appear to follow local midnight. Next session should just retry once, and if it clears, work through the newest 68 blog URLs a batch at a time (~10-12/day) until caught up.

Everything below this line is the original pre-launch runbook, kept for reference / future re-runs.

---

## GSC / Bing Webmaster Tools setup — (original runbook)

The site ships with the verification meta-tag slots and IndexNow key already wired in (`src/config/site.js` →
`gscVerification`, `bingVerification`, `indexNowKey`), but nothing is emitted yet — the placeholders suppress the
tags entirely rather than shipping a broken verification claim. Once `australianreserveprops.com` (or whichever domain)
is actually live on Vercel:

**Google Search Console**
1. Go to search.google.com/search-console → Add Property → enter the live domain.
2. Choose the **HTML tag** verification method (not DNS — simpler here since Vercel manages DNS separately).
3. Copy just the `content="..."` value it gives you (not the whole `<meta>` tag) into `SITE.gscVerification` in `src/config/site.js`.
4. Rebuild (`npm run build`), commit, push — Vercel redeploys automatically.
5. Back in Search Console, click Verify.
6. Submit the sitemap: Search Console → Sitemaps → add `sitemap.xml`.

**Bing Webmaster Tools**
1. Go to bing.com/webmasters.
2. Easiest path: **"Import from Google Search Console"** — if GSC is already verified (above), this adds the
   Bing property with zero extra code needed. Skip straight to submitting the sitemap.
3. If importing isn't available, use the meta tag method instead: copy the code into `SITE.bingVerification`,
   rebuild, redeploy, then verify.
4. Submit the sitemap: Bing Webmaster Tools → Sitemaps → add `sitemap.xml`.

**IndexNow (Bing, and other participating engines — instant indexing, no account needed)**
The key file is already live at `/{indexNowKey}.txt` (see `SITE.indexNowKey`). To notify engines of new/changed
URLs immediately instead of waiting for a crawl, POST to `https://api.indexnow.org/indexnow` with:
```json
{ "host": "australianreserveprops.com", "key": "<SITE.indexNowKey>", "keyLocation": "https://australianreserveprops.com/<key>.txt", "urlList": ["https://australianreserveprops.com/product/..."] }
```
Worth doing once after the initial launch (submit every URL in the sitemap) and again after any future Mode 2
content update.

**Don't submit until the domain is actually live** — verifying and submitting a sitemap for a domain that isn't
deployed yet just wastes the crawl budget and can return errors that are annoying to clear later.

## 2026 SEO / GEO audit programme — completed 2026-10-09 (six phases)

1. **Architecture and INP:** all routes static (SSG), edge-cached in Sydney; one title/description/canonical/robots tag per page (Metadata.jsx now emits JSON-LD only). Performance fixes: CSS reveal instead of motion on cards and footer, chat and review pop-up load when idle (`LateWidgets`), d3 chart renders only near the viewport (`LazyYieldChart`), image widths capped at 1600, sitemap lastmod is a real content date (`src/app/sitemap.js`, update the constant when content changes).
2. **GEO:** every post opens with a 40-60 word "short answer"; category and product pages carry a question heading, a 40-60 word answer and a key-facts list (`src/lib/answers.js`); FAQ questions are h3; zero skipped heading levels.
3. **E-E-A-T / information gain:** byline with ABN and ABR link on every post; legal posts cite the RBA reproducing-banknotes page and the in-force Crimes (Currency) Act; catalogue price-per-note table on five pricing posts. RBA rule is "under three-quarters or over one and a half times the length and width, and one-sided".
4. **Schema:** one shared `@graph` (Organization/LocalBusiness/Store, WebSite, optional Person) plus page nodes linked by @id (`src/lib/schema.js`). AggregateRating uses the displayed figures (4.8 / 3,413). Opening hours in `SITE.hours`. Serializer no longer rewrites ampersands; email is omitted from JSON-LD.
5. **Linking:** guides on category (4) and product (3) pages via `guidesForCategory()` in `src/lib/links.js`; no generic anchors (rules in docs/keyword-map.md).
6. **Regression (live):** 147/147 sitemap URLs return 200 with one title, description, canonical (self-referencing), robots and h1; no noindex on sitemap URLs; 153 internal link targets all 200; JSON-LD parses everywhere; four retired-post redirects map to live pages.

**Open items (need the client):** confirm printed notes are single-sided (RBA rule) before keeping "RBA-compliant" wording; source of the 4.8 / 3,413 rating figures (39 dated reviews on file average 4.64); real editor name, role and profiles to switch on the Person node (`SITE.editor`); return policy for Merchant markup; Merchant Center ruling before any product feed; approval for the post consolidation plan (86 -> about 58 URLs, 301 mappings) and for expanding thin posts (median 240 words).
