import { POSTS } from '@/config/site'
// Maps a post's free-text tags to real shop category slugs, so every post
// links out to 2-3 relevant categories instead of only the generic /shop/
// CTA — the internal-linking standard WebForge audits for.
export const TAG_TO_CATEGORY = {
  'twenty-dollar-prop-note': 'twenty-dollar-notes',
  'fifty-dollar-prop-note': 'fifty-dollar-notes',
  'hundred-dollar-prop-note': 'hundred-dollar-notes',
  'vintage-prop-note': 'vintage-series-notes',
  'mixed-denomination-pack': 'packs-bundles',
  'bulk-production-pack': 'packs-bundles',
  'production-pack': 'packs-bundles',
  'wedding-event-pack': 'packs-bundles',
  'briefcase-prop-set': 'briefcases-bags',
  'duffel-bag-prop': 'briefcases-bags',
  'money-confetti': 'confetti-party-favors',
  'shredded-cash': 'confetti-party-favors',
  'money-lei': 'confetti-party-favors',
  'party-prank-money': 'confetti-party-favors',
  'display-collectible': 'display-collectibles',
  'limited-edition-prop': 'display-collectibles',
  'display-case-accessory': 'display-collectibles',
  'personalised-prop-note': 'personalised-novelty',
  'novelty-cheque': 'personalised-novelty',
  'kids-play-money': 'kids-play-money',
  'classroom-play-money': 'kids-play-money',
  'educational-play-money': 'kids-play-money',
  'gift-money-set': 'gift-sets',
  'birthday-money-gift-box': 'gift-sets',
  'money-gun-device': 'accessories',
  'money-gun-refill': 'accessories',
  'currency-band-accessory': 'accessories',
  'content-creator-props': 'packs-bundles',
  'magic-trick-money': 'twenty-dollar-notes',
}

// Guides that belong to a shop category, strongest tag match first then newest. Used to link
// category and product pages down to the informational spokes that feed them.
export function guidesForCategory(slug, count = 4) {
  return POSTS
    .map((p) => ({ p, score: (p.tags || []).filter((t) => TAG_TO_CATEGORY[t] === slug).length }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.p.date) - new Date(a.p.date))
    .slice(0, count)
    .map((x) => x.p)
}
