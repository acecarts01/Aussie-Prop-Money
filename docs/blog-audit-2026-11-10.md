# Blog audit against the blog-post rule: 2026-11-10

Scope: all 69 posts in `POSTS` (`src/config/site.js`), checked against `~/.claude/skills/blog-post/SKILL.md`
(including the 10 Nov 2026 rule that EVERY keyword needs KD 1 to 28 and real volume).
Keyword data: the AU Semrush exports in `keywords export cluster/` (76,585 AU keywords). Live Semrush could not be queried
(session expired in the automation browser), so keywords missing from the exports are "unverified", not "failed".

## Result: 0 of 69 posts pass

| Rule | Posts passing |
|---|---|
| Body at least 1,500 words | 1 of 69 (median 261 words, min 168, max 2,114) |
| Table of contents rendered | 0 of 69 (the blog template has no contents block) |
| 5 secondary keywords | 14 of 69 |
| Exactly 10 tags (keywords) | 0 of 69 (posts carry 2 to 4 category-slug tags) |
| 2 or more outbound links | 0 of 69 |
| Verified YouTube video | 0 of 69 |
| 3 or more internal links in the body | 9 of 69 |
| Hero image with focus keyword in alt text | 0 of 69 (posts have no images) |
| Main keyword found in Semrush AU data | 9 of 69 |
| Main keyword KD 1 to 28 with volume | 5 of 69 |
| Main keyword Transactional or Commercial | 0 of the 9 found |
| Competitor note on file | 0 of 69 |

All 339 keyword slots across the posts: 138 found in the exports, 95 pass KD 1 to 28 with volume, 43 found but out of range,
201 not in any export (unverified, mostly invented long-tail phrases). No duplicate main keywords (no cannibalisation).

## Can the rule be met site-wide?
Keyword supply is the limit. On-topic AU keywords with volume above 0 and KD 1 to 28: 241 in total
(104 Transactional or Commercial, 12 Navigational, 165 Informational). Each full post needs 6 T/C, 1 Navigational, 1 Informational
and 10 unique tags, none reused. That supports about 12 posts at full specification, not 69.
Navigational supply is the tightest (12 keywords, all very low volume).

## Recommended plan (needs owner decision)
1. Keep and fully rebuild the best 12 posts (highest commercial value, by Search Console impressions then keyword quality).
2. Merge the rest into those 12 or into category pages (301 redirects need approval), or keep a few as short supporting guides
   that are explicitly outside the 1,500-word rule.
3. Add the missing template pieces once: table of contents, hero image with alt text, related-products block, YouTube embed slot.
4. Re-verify every keyword in live Semrush (Keyword Overview > Bulk analysis, AU database) using `docs/blog-keywords-to-verify.txt`.
