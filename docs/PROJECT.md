# Australian Reserve Props — Project Record

Status: **Intake drafted, pending confirmation before Mode 3 build.** Items marked 🟡 PENDING need your input before the site goes live; the build can start without them (webforge's placeholder pattern).

## A — Identity
- Domain: `thereservenote.com` 🟡 *ownership/registration not verified by Claude — confirm before production deploy*
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
- WhatsApp checkout: optional, default off. Email/order-form checkout: yes (Web3Forms).

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
Provider: `web3forms` (works without a domain being fully live). 🟡 Access key pending — until set, forms redirect straight to the thank-you page and no order emails are sent (chat/WhatsApp is the only live order channel in the meantime).

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
1. Confirm domain ownership/registration for thereservenote.com (or thereservenote.com.au).
2. Business location/state, contact email, phone/WhatsApp number.
3. ABN/GST status.
4. Confirm or edit proposed pricing (Section I table) and order rules (Section C).
5. Product photos, or proceed with generated placeholders for launch.
6. Web3Forms access key (or proceed pending, chat-only ordering until set).
7. Stripe/PayPal account status — live at launch, or added once approved?
