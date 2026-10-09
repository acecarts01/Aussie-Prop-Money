import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import ComplianceBadge from '@/components/ComplianceBadge'
import FaqBlock from '@/components/FaqBlock'
import Metadata from '@/components/Metadata'
import ProductCard from '@/components/ProductCard'
import { splitAnswer, ANSWER_OVERRIDES } from '@/lib/answers'
import { POSTS, SITE, CATEGORIES, PRODUCTS, CATEGORY_KEYWORDS } from '@/config/site'
import { absoluteUrl, seoTitle, seoDescription, ogMeta, formatPriceShort } from '@/lib/utils'

// Blog bodies are informational. Keep only the first link to each internal URL in a post,
// and drop links to other sites, so the article reads naturally and passes its link value to the shop.
function tidyBody(paras) {
  const seen = new Set()
  return paras.map((para) =>
    para.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (m, text, url) => {
      if (!/^https?:\/\/(www\.)?australianreserveprops\.com/i.test(url)) return text
      const key = url.replace(/\/$/, '')
      if (seen.has(key)) return text
      seen.add(key)
      return m
    })
  )
}

const FLAGSHIP = ['hundred-dollar-prop-note-stack', 'fifty-dollar-prop-note-stack', 'twenty-dollar-prop-note-stack', 'mixed-denomination-starter-pack']

function productsForPost(categories) {
  const picked = []
  for (const c of categories) {
    for (const p of PRODUCTS.filter((x) => x.category === c.slug).slice(0, 2)) if (!picked.includes(p)) picked.push(p)
  }
  for (const s of FLAGSHIP) {
    const p = PRODUCTS.find((x) => x.slug === s)
    if (p && !picked.includes(p)) picked.push(p)
  }
  return picked.slice(0, 4)
}

// Maps a post's free-text tags to real shop category slugs, so every post
// links out to 2-3 relevant categories instead of only the generic /shop/
// CTA — the internal-linking standard WebForge audits for.
const TAG_TO_CATEGORY = {
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

function relatedCategoriesFor(tags = []) {
  const slugs = [...new Set(tags.map((t) => TAG_TO_CATEGORY[t]).filter(Boolean))]
  return slugs.map((slug) => CATEGORIES.find((c) => c.slug === slug)).filter(Boolean).slice(0, 3)
}

// Post-to-post linking (the spoke-to-spoke layer of the hub-and-spoke graph) —
// ranks other posts by shared tags, falling back to most recent if no overlap.
function relatedPostsFor(post) {
  const scored = POSTS
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, score: p.tags?.filter((t) => post.tags?.includes(t)).length || 0 }))
    .sort((a, b) => b.score - a.score || new Date(b.p.date) - new Date(a.p.date))
  return scored.slice(0, 3).map((s) => s.p)
}

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const post = POSTS.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: seoTitle(post.seoTitle || post.title),
    description: seoDescription(post.excerpt),
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}/`) },
    ...ogMeta(seoTitle(post.seoTitle || post.title), `/blog/${post.slug}/`, undefined, { type: 'article', publishedTime: post.date }),
  }
}

export default function BlogPost({ params }) {
  const post = POSTS.find((p) => p.slug === params.slug)
  if (!post) notFound()
  const faqs = post.faqs || []
  const related = relatedCategoriesFor(post.tags)
  const relatedPosts = relatedPostsFor(post)
  const body = tidyBody(post.body)
  const override = ANSWER_OVERRIDES[post.slug]
  const { answer, rest } = override ? { answer: override, rest: body } : splitAnswer(body)
  const shopProducts = productsForPost(related)
  const lead = related[0]
  const leadFrom = lead ? formatPriceShort(Math.min(...PRODUCTS.filter((p) => p.category === lead.slug).map((p) => p.price))) : null
  const leadLabel = lead ? (CATEGORY_KEYWORDS[lead.slug]?.title.split(' | ')[0] || lead.name) : 'Shop prop money Australia'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}/`),
  }

  return (
    <div>
      <Metadata 
        title={post.seoTitle || post.title}
        description={post.excerpt}
        canonical={`/blog/${post.slug}/`}
        schemas={[schema]}
      />
      <PageHeader
        eyebrow={new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
        title={post.title}
        subtitle={post.excerpt}
        breadcrumbs={<Breadcrumbs trail={[{ label: 'Guides', href: '/blog/' }, { label: post.title, href: `/blog/${post.slug}/` }]} />}
      />

      <article className="container section" style={{ maxWidth: '72ch' }}>
        <div style={{ fontSize: '1.05rem', color: 'var(--ink-2)' }} className="markdown-body">
          <section className="answer-capsule" aria-labelledby="short-answer">
            <h2 id="short-answer">The short answer</h2>
            <ReactMarkdown>{answer}</ReactMarkdown>
          </section>
          <div className="card card-pad" style={{ margin: '0 0 1.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.25rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>
              {lead ? `${leadLabel}${leadFrom ? ` from ${leadFrom}` : ''} · free tracked shipping Australia-wide` : 'Free tracked shipping Australia-wide on every order'}
            </span>
            <Link href={lead ? `/shop/${lead.slug}/` : '/shop/'} className="btn btn-accent">{lead ? 'Shop now →' : 'Shop prop money →'}</Link>
          </div>
          {rest.map((para, i) => (
            <div key={i} style={{ marginBottom: '1.5rem' }}>
              <ReactMarkdown>{para}</ReactMarkdown>
            </div>
          ))}
        </div>

        {shopProducts.length > 0 && (
          <div style={{ marginTop: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.9rem' }}>Buy prop money online</h2>
            <div className="grid grid-2">
              {shopProducts.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        )}

        <FaqBlock faqs={faqs} title="Frequently asked" />

        {related.length > 0 && (
          <div style={{ marginTop: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.9rem' }}>Related categories</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {related.map((c) => (
                <Link key={c.slug} href={`/shop/${c.slug}/`} className="btn btn-outline">{c.name} →</Link>
              ))}
            </div>
          </div>
        )}

        {relatedPosts.length > 0 && (
          <div style={{ marginTop: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.9rem' }}>Related guides</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {relatedPosts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}/`} className="btn btn-outline">{p.title} →</Link>
              ))}
            </div>
          </div>
        )}

        <div className="card card-pad" style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <ComplianceBadge />
          <Link href="/shop/" className="btn btn-accent">Shop film-ready packs →</Link>
        </div>
      </article>
    </div>
  )
}
