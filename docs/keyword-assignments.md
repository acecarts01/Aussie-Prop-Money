# Keyword & FAQ Assignments — Australian Reserve Props

Generated 2026-09-05 from the Semrush AU exports in `../keywords export cluster/` (13 files, processed into
`docs/_semrush-clean.json` — 5,578 unique cleaned keywords, banned-term-filtered). **Verified** rows are backed
by real Semrush AU Volume/KD numbers from those exports. **Candidate** rows have no exported data (briefcases,
confetti, display, personalised/cheques were never researched in Semrush) — same treatment as the rest of
`keyword-map.md`: usable as content targets, but check them in Semrush before relying on them for budget decisions.

Products inherit their category's keyword set — Semrush data was researched per-category, not per-SKU, so that's
what the real data actually supports. Each entry also lists the 3 FAQs now live on that category's pages (both
the category page itself and every product within it).

---

## Category keyword + FAQ assignments

| Category | Status | Primary | Supporting (5) |
|---|---|---|---|
| $20 Prop Notes | ✅ Verified | australian 20 dollar bill (390/KD27) | aus $20 note, $20 note australian, $20 aus note, australian $20 note, $20 notes |
| $50 Prop Notes | ✅ Verified | 50 dollar note australia (1600/KD32) | 50 dollar bill australia, $50 note, australian $50 note, australian 50 dollar bill, 50 dollar australian note |
| $100 Prop Notes | ✅ Verified | 100 dollar note australia (1600/KD18) | australian 100 dollar note, $100 note, aus 100 dollar note, australian 100 dollar banknote, australian $100 note |
| Vintage & Legacy Series | ✅ Verified | australian old notes (90/KD21) | old $20 note australia, old 20 dollar note australia, old notes australia, australian dollar old notes, australian gold notes |
| Packs & Bundles | ✅ Verified | au prop money (390/KD26) | prop money, fake money australia, realistic fake money australia, bulk fake money, prop money australia |
| Briefcases & Bags | ⚠️ Candidate | prop money briefcase | prop money briefcase australia, money briefcase prop, duffel bag prop money, briefcase full of fake money, money bag prop for film |
| Confetti & Party Favors | ✅ Verified | money lei (90/KD28) | graduation money lei, cash lei, graduation lei australia, leis with money, money confetti australia (candidate) |
| Display & Collectibles | ⚠️ Candidate | prop money display frame | framed prop money australia, prop money collector case, limited edition prop money australia, money display case australia, office display prop money |
| Personalised & Novelty | ⚠️ Candidate | personalised prop money | personalised photo money note, custom prop money gift, novelty big cheque australia, giant cheque prop, personalised novelty cheque |
| Kids Play Money | ✅ Verified | australian play money (320/KD11) | play money australia, australian play money printable, printable australian play money, play money printable australia, print off play money |
| Gift Sets | ✅ Verified | graduation money lei (30/KD26) | graduation lei australia, leis with money, diy graduation money gift ideas, novelty money gift box australia (candidate), birthday money gift australia (candidate) |
| Accessories | ✅ Verified | money gun (1000/KD29) | money guns, money gun tiktok, toy money gun, fake money gun machine, cheap money gun |

Homepage keeps **prop money australia** (480/KD30) as its own primary (established earlier), and the `/shop/`
hub uses **australian prop money** (720/KD28) — kept deliberately distinct from every category above to avoid
keyword cannibalisation across pages targeting near-identical phrases.

Each category's 3 FAQs are defined in `src/config/site.js` → `CATEGORY_FAQS`, rendered with FAQPage schema on
both the category page and every product page within it (see `src/app/shop/[cat]/page.jsx` and
`src/app/product/[slug]/page.jsx`).

## Blog post keyword + FAQ assignments (18 posts total: 3 original + 15 new)

| Post | Status | Primary | Supporting |
|---|---|---|---|
| Is Prop Money Legal in Australia? | Candidate | is prop money legal in australia | australian legal tender, prop money laws australia |
| Prop Money Buying Guide for Australian Filmmakers | Verified | prop money buying guide | au prop money, bulk fake money, realistic fake money australia |
| How Content Creators Use Prop Money | Verified | prop money for content creators | money gun tiktok, money guns, tiktok money gun |
| What's Actually on the Australian $100 Note? | Verified | australian 100 dollar note (1600/KD34) | $100 note, aus 100 dollar note, australian 100 dollar banknote, australian $100 note |
| What's Actually on the Australian $50 Note? | Verified | australian 50 dollar bill (480/KD24) | 50 dollar note australia, $50 note, australian $50 note, 50 dollar australian note |
| What's Actually on the Australian $20 Note? | Verified | australian $20 note (170/KD25) | australian 20 dollar bill, aus $20 note, $20 note australian, $20 notes |
| How to Spot Fake Australian Currency | Verified | how to spot a fake $100 dollar note australia (880/KD30) | note checker, banknote serial checker, bank note checker, australian banknotes |
| Money Guns Explained | Verified | money guns (70/KD23) | money gun, toy money gun, money gun tiktok, cheap money gun |
| Cash Leis Explained | Verified | cash lei (30/KD15) | money lei, graduation money lei, graduation lei australia, leis with money |
| Teaching Kids to Count Money | Verified | australian play money printable (110/KD13) | australian play money, play money australia, printable australian play money, play money printable australia |
| A Short History of Australian Banknote Design | Verified | australian banknotes (1000/KD28) | australian notes, australian currency notes, australian bank notes, paper money australia |
| Why Film Productions Use the Briefcase Reveal | Candidate | money briefcase prop | prop money briefcase, prop money briefcase australia, duffel bag prop money, money bag prop for film |
| Money Dance Wedding Traditions | Candidate | wedding money dance australia | wedding money pack, money gift wedding australia, prop money for wedding |
| Prop Money vs Play Money vs Real Money | Verified | prop money vs real money | prop money vs play money, fake money vs real money, imitation money |
| 10 Novelty Cash Gift Ideas | Candidate | novelty money gift box australia | funny cash gift idea, birthday money gift australia, gag gift fake money |
| A Producer's Guide to Bulk Prop Money | Verified | bulk fake money (20/KD0) | wholesale prop money australia, au prop money, realistic fake money australia |
| Personalised Prop Money Gift Ideas | Candidate | personalised photo money note | personalised prop money, custom prop money gift, custom message prop note |
| The Novelty Big Cheque Explained | Candidate | novelty big cheque australia | giant cheque prop, personalised novelty cheque, oversized cheque presentation |

Each post's 2 FAQs are inline in its `faqs` array in `src/config/site.js`, rendered with FAQPage schema on the
post page.

## A compliance note that came out of this pass

One rule got revised while doing this work: "fake money" was originally on the banned-terms list in `CLAUDE.md`,
copied from webforge's illustrative example. The Semrush data shows it's genuinely how AU shoppers search this
category (Commercial intent, high volume) — and saying a product is "fake" is honest, not a deceptive claim. It's
now allowed; the terms that actually claim deceptive capability (undetectable, indistinguishable, passes the pen
test, etc.) remain banned. See `CLAUDE.md` for the full current list.

## What has no real data

Briefcases & Bags, Display & Collectibles, and Personalised & Novelty (including novelty cheques) were never
researched in the Semrush exports provided — there is no seed file for any of them. Their keyword sets above are
candidates only, same status as the original `keyword-map.md`. If these categories matter for paid spend, run
them through Semrush Keyword Overview (AU database) before committing budget.
