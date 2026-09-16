import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import ComplianceBadge from '@/components/ComplianceBadge'
import { POSTS, SITE, CATEGORIES } from '@/config/site'
import { absoluteUrl, seoTitle, seoDescription, ogMeta } from '@/lib/utils'

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

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  } : null

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <PageHeader
        eyebrow={new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
        title={post.title}
        subtitle={post.excerpt}
        breadcrumbs={<Breadcrumbs trail={[{ label: 'Guides', href: '/blog/' }, { label: post.title, href: `/blog/${post.slug}/` }]} />}
      />

      <article className="container section" style={{ maxWidth: '72ch' }}>
        <div style={{ fontSize: '1.05rem', color: 'var(--ink-2)' }}>
          {post.body.map((para, i) => <p key={i}>{para}</p>)}
        </div>

        {faqs.length > 0 && (
          <div style={{ marginTop: '2.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '0.9rem' }}>Frequently asked</h2>
            <div className="faq-list">
              {faqs.map((f) => (
                <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
              ))}
            </div>
          </div>
        )}

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

        <div className="card card-pad" style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <ComplianceBadge />
          <Link href="/shop/" className="btn btn-accent">Shop film-ready packs →</Link>
        </div>
      </article>
    </div>
  )
}
