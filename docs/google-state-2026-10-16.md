# State of Google brief and technical audit — 2026-10-16

Internal. Re-run Phase 0 after every confirmed core/spam update and monthly (next: 2026-11-16). Every claim below was read from a primary source on the run date unless marked [secondary].

## Phase 0 — change log

| Date | Change | Source | Impact on THIS site | Action |
|---|---|---|---|---|
| 24 Sep – ~7 Oct 2026 | September 2026 spam update (13 d 16 h), targets unspecified | https://status.search.google.com/summary | Site launched 11 Sep, so it ran through this update. At that time it carried a homepage keyword-chip block, a 47-term `knowsAbout` list and 22 thin posts (all removed 2026-10-09). | Watch GSC Performance + Pages weekly to 4 Nov. Nothing further. |
| 18 Aug, 24 Jun, 24 Mar 2026 | Spam updates (2 d 16 h, 2 d 1 h, 19 h) | status dashboard | Before launch. No baseline. | None. |
| 21 May – ~1 Jun 2026; 27 Mar – ~8 Apr 2026; 11 Dec 2025 – ~29 Dec 2025 | Core updates | status dashboard | Before launch. Cannot attribute any movement. | After the next core update compare GSC with the week before, once it has finished (Google's own advice: wait a week, avoid quick fixes). |
| 5 Feb – ~26 Feb 2026 | Discover update | status dashboard | Not applicable (no Discover surface yet). | None. |
| 28 Aug 2026 (page update) | Spam policies page updated; site-reputation-abuse handling changed for the EEA; thin-affiliation, doorway, hidden-text and keyword-stuffing definitions restated. Accordions, tabs and screen-reader-only text are NOT hidden text. | https://developers.google.com/search/docs/essentials/spam-policies | Confirms the keyword dump and schema keyword list had to go (done). Visually-hidden h2s and FAQ accordions are allowed. | Keep the no-stuffing rule in CLAUDE.md. |
| 7 May 2026 [secondary] | FAQ rich results retired; GSC FAQ report and Rich Results Test support removed June; API Aug. Google's current structured-data gallery no longer lists FAQ. | gallery: https://developers.google.com/search/docs/appearance/structured-data/search-gallery (updated 2026-10-16) | FAQPage markup on 142 pages gives no SERP feature. Still valid and readable by Bing/AI. | Keep for users and extraction. Never test or promise it in Rich Results Test. |
| Current | AI Overviews / AI Mode: eligible if indexed and snippet-eligible; no special markup, files or schema; query fan-out surfaces more pages; traffic is inside the Search Console "Web" type | https://developers.google.com/search/docs/appearance/ai-features | Our 40–60-word answer blocks and headings fit fan-out. `llms.txt` has no Google effect. | Keep content work; treat llms.txt as low priority. |
| Current | Crawlers: Googlebot, -Image, -Video, Storebot-Google, Google-InspectionTool, GoogleOther*, Google-CloudVertexBot. **Google-Extended** is a token only (Gemini training and grounding), not a ranking signal and not Search inclusion. No Google AI-browsing agent is listed. | https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers | robots.txt currently allows every AI training token, including Google-Extended, with no Content-Signal. | Owner decision, see matrix P1-1. |
| Current | Structured data supported: Organization, Product, Breadcrumb, Local business, Review snippet, Article, Image metadata, Profile page, Video. SearchAction (sitelinks search box) is not listed. | gallery above | Keep Product, Breadcrumb, Organization/LocalBusiness. Self-serving ratings on the business entity do not earn stars. | Do not promise SearchAction or FAQ results. |
| 2024 → current | Core Web Vitals at p75: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. INP replaced FID. | https://web.dev/articles/vitals | Lab: CLS 0, long tasks cut from 3 to 1 on home. No CrUX field data yet (new, low traffic). | Re-measure once CrUX populates. |
| Jan 2026 → current [secondary] | Universal Commerce Protocol launched; native checkout in AI Mode/Gemini, opt-in through Merchant Center, US-first; official requirements not confirmed from Google pages. | secondary reporting | Site has no native checkout and ships AU-only. The `.well-known/ucp` and `acp.json` files declare human-assisted ordering and every URL they list returns 200. | Do not claim Google checkout. Keep files truthful. |
| Feb 2026 | Bing AI Performance report (public preview): counts Copilot and Bing AI citations, not clicks. IndexNow covers Bing, Yandex, Naver and others, not Google. [secondary] | secondary reporting | Bing is signed in; IndexNow is wired. | Check the AI Performance report in Bing Webmaster Tools monthly. |

## Phase 1 — audit results (live site, 2026-10-16)

Stack: Next.js 15.5 App Router, Vercel (syd1 edge), fully static pages, trailing slash.

| Check | Result |
|---|---|
| Googlebot vs browser raw HTML (6 templates) | Identical title, h1, JSON-LD, canonical, robots, word count |
| Canonicals | Self-referencing on every sampled template; one robots tag per page |
| Redirects | http, www and no-slash all single-hop 308 to the canonical; retired posts single-hop to a live page; unknown URL returns a real 404 |
| hreflang | None, correct for an Australia-only site; `lang="en-AU"` |
| Headers | HSTS, nosniff, SAMEORIGIN, referrer and permissions policy, CSP, Brotli, edge cache HIT |
| robots.txt | One `*` group plus 13 individual allows; all AI training tokens allowed; no Content-Signal |
| Sitemap | 130 URLs, all 200, canonical; real lastmod; **images were missing, now added (50 image entries)**; not split by type |
| llms.txt | Valid llmstxt.org format (H1, blockquote, 21 markdown links) |
| Agent files | Every URL they reference returns 200; `/api/mcp/` answers initialize and tools/list; card endpoint corrected to the trailing-slash URL |
| Structured data | Shared @graph plus page nodes linked by @id; 0 validation problems on 159 built pages |
| Schema vs visible content | Ratings 4.6 / 16 match the page; product price, return policy and shipping match the page |

## Matrix

| Pri | Area | Evidence | Root cause | Exact fix | Effort | Impact | Update risk | Verify |
|---|---|---|---|---|---|---|---|---|
| P1-1 | `src/app/robots.js` | Training tokens (GPTBot, ClaudeBot, CCBot, Google-Extended, Bytespider, Meta-ExternalAgent, Applebot) all `Allow: /`; no Content-Signal | Default template allowed everything | Needs owner decision: split into (a) search, (b) AI retrieval/user agents, (c) training tokens; if training is declined, `Disallow: /` for (c) and `Content-Signal: search=yes, ai-input=yes, ai-train=no`. Draft below. **Not applied: robots rule change needs approval.** | 15 min | Control over training use; no ranking effect (Google-Extended is not a ranking signal) | None | `curl /robots.txt`, GSC robots report |
| P1-2 | Content depth | Median post 240 words; 31 pages "Discovered, currently not indexed" in GSC (10-09) | Thin templated posts, new domain | Expand top 10 posts with first-party material (briefs below). Do not add filler. | days | Index coverage, citations | Scaled-content policy | GSC Pages, URL Inspection |
| P1-3 | Indexing drip | GSC allows about 10 requests a day | Platform quota | 10 URLs/day plus Bing 100/day, then rely on sitemap | ongoing | Faster first crawl | None | Pages report |
| P2-1 | JSON-LD | 5–7 separate blocks per page (site graph, page graph, breadcrumb, FAQ, item list) | FaqBlock and Breadcrumbs emit their own scripts | Lift them into the page graph (`graphOf`) so each page has one block | 2 h | Tidiness only; no Google feature depends on it | None | Schema Markup Validator |
| P2-2 | `knowsAbout`, SearchAction | SearchAction has no Google effect | Legacy | Keep (search exists), do not rely on it | none | none | None | n/a |
| P2-3 | Person / editor | No named person | No real details supplied | Fill `SITE.editor` when the client supplies a real person | 10 min | E-E-A-T clarity | None | Validator |
| P2-4 | Merchant feed | `/feeds/google-merchant.xml/` exists, unsubmitted | Policy uncertainty | Ask Merchant Center support before registering | — | Free listings | Misrepresentation / dishonest-behavior review | MC diagnostics |
| P2-5 | Sitemap split | One sitemap | Small site | Split only past ~500 URLs | — | none | None | n/a |
| Done | Sitemap images + lastmod | 0 image tags before | Not generated | `images` on products and categories; posts use `updated || date` | done | Image search | None | live sitemap |
| Done | MCP card endpoint | card pointed at a redirecting URL | missing slash | trailing slash in generator | done | Agent compatibility | None | `/.well-known/mcp/server-card.json` |

### robots.txt draft (apply only after approval)

```
# (a) Search crawlers
User-agent: Googlebot
User-agent: Bingbot
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /wk/

# (b) AI search, retrieval and user-triggered agents
User-agent: OAI-SearchBot
User-agent: ChatGPT-User
User-agent: PerplexityBot
User-agent: Claude-SearchBot
User-agent: Claude-User
Allow: /

# (c) AI training tokens (change to Allow: / if training is welcome)
User-agent: GPTBot
User-agent: ClaudeBot
User-agent: CCBot
User-agent: Google-Extended
User-agent: Applebot-Extended
User-agent: Bytespider
User-agent: Meta-ExternalAgent
Disallow: /

User-agent: *
Allow: /
Allow: /api/products/
Disallow: /admin/
Disallow: /api/
Disallow: /wk/

Content-Signal: search=yes, ai-input=yes, ai-train=no
Sitemap: https://australianreserveprops.com/sitemap.xml
```
Bot names must be re-verified against each vendor's docs before applying (Google's list was confirmed above; the others were not re-fetched this run).

### Content briefs — top 10 pages (first-party information only)

1. `/shop/hundred-dollar-notes/`: add a photographed size comparison against the RBA rule (under 3/4 length and width), your real pack sizes and prices, and one real set report.
2. `/product/briefcase-prop-set-250k/`: real briefcase photos, note count, weight and shipped carton size (measure them), delivery times from real orders.
3. `/shop/briefcases-bags/`: a measured comparison table of the three sets.
4. `/blog/is-prop-money-legal-in-australia/`: expand with the RBA conditions in plain English, sources already cited; add a worked "is my prop compliant" checklist.
5. `/blog/how-much-does-prop-money-cost-in-australia/`: price table exists; add cost per scene examples from real client orders (with permission).
6. `/blog/ultimate-guide-to-australian-prop-money-for-film-and-tv/`: add real production set reports from the 16 reviews.
7. `/blog/how-realistic-does-prop-money-need-to-be/`: add camera tests (your own photos at distance).
8. `/shop/kids-play-money/`: classroom use photos and a counting activity sheet you author.
9. `/wholesale/`: real turnaround and minimums.
10. `/blog/whats-on-australian-banknotes/`: original diagrams of the three notes' features (you hold copyright on the diagrams).

## 30 / 60 / 90 days

- **30:** decide robots groups (P1-1); keep the daily 10 GSC + 100 Bing submissions; weekly GSC Pages and Performance check through the end of the September spam-update window; confirm single-sided printing; fill the editor profile; ask Merchant Center support.
- **60:** expand the 10 briefed pages; re-run Phase 0 after any core update; compare 16 real queries in Google AI Mode, ChatGPT, Perplexity, Gemini and Copilot and log cited versus not.
- **90:** review CrUX field data once it appears; consolidate JSON-LD into one block per page (P2-1); prune or merge any post still not indexed.

## Monitoring

GSC Pages, Performance, Crawl stats, Core Web Vitals; Bing Webmaster Tools including the AI Performance report; GA4 for conversions; monthly 20–30-question AI citation test; post-deploy regression suite (147 → 130 sitemap URLs, all 200, one title/canonical per page).

## Do NOT do (for this site)

- No keyword lists in visible copy, schema or hidden text.
- No FAQ or SearchAction work for SERP features; no Rich Results Test on FAQ.
- No star-rating expectations for the business's own rating.
- No reviews without a client-confirmed source; no Trustpilot branding.
- No Google checkout / UCP claims; no Merchant Center registration before a ruling.
- No instruction-style content ("how to make fake money", templates, aging tips).
- No mass-generated posts; no deleting content as a quick fix after an update.
- No robots, canonical or URL changes without approval.
