import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import ComplianceBadge from '@/components/ComplianceBadge'
import FaqBlock from '@/components/FaqBlock'
import Metadata from '@/components/Metadata'
import ProductCard from '@/components/ProductCard'
import { TAG_TO_CATEGORY } from '@/lib/links'
import { splitAnswer, ANSWER_OVERRIDES } from '@/lib/answers'
import PriceLadder from '@/components/PriceLadder'
import { graphOf, webPageNode, idRef, ids, personNode } from '@/lib/schema'

const PRICE_TABLE_POSTS = new Set([
  'how-much-does-prop-money-cost-in-australia',
  'why-prop-money-is-priced-at-face-value',
  'why-quality-prop-money-costs-more-than-you-think',
  'prop-money-on-a-student-film-budget',
  'how-much-prop-money-does-a-short-film-need',
])

// Posts that explain the law cite the primary sources, each URL checked against the live page.
const SOURCES_POSTS = new Set([
  'is-prop-money-legal-in-australia',
  'rba-banknote-reproduction-rules-explained',
  'prop-money-laws-penalties-australia',
  'ultimate-guide-to-fake-money-print-templates',
  'fake-money-print-guide-australia-printable-novelty',
])
const SOURCES = [
  { href: 'https://www.banknotes.rba.gov.au/legal/reproducing-banknotes/', label: 'Reserve Bank of Australia: Reproducing Banknotes' },
  { href: 'https://www.legislation.gov.au/C2004A02499/latest/text', label: 'Crimes (Currency) Act 1981 (Cth), Federal Register of Legislation' },
]
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

  const pageUrl = absoluteUrl(`/blog/${post.slug}/`)
  const articleId = `${pageUrl}#article`
  const editor = personNode()
  const words = post.body.join(' ').replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').split(/\s+/).filter(Boolean).length
  const schema = graphOf(
    webPageNode({ path: `/blog/${post.slug}/`, name: post.title, description: post.excerpt, type: 'WebPage', about: articleId }),
    {
      '@type': 'BlogPosting',
      '@id': articleId,
      headline: post.title.length > 110 ? post.title.slice(0, 107).replace(/\s+\S*$/, '…') : post.title,
      description: post.excerpt,
      url: pageUrl,
      image: [absoluteUrl('/og-default.jpg')],
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: 'en-AU',
      articleSection: 'Prop money guides',
      wordCount: words,
      author: idRef(editor ? absoluteUrl('/#editor') : ids.org),
      publisher: idRef(ids.org),
      isPartOf: idRef(ids.website),
      mainEntityOfPage: idRef(`${pageUrl}#webpage`),
      ...(SOURCES_POSTS.has(post.slug) ? { citation: SOURCES.map((s) => ({ '@type': 'CreativeWork', name: s.label, url: s.href })) } : {}),
    }
  )

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
        <p className="byline">
          Published by {SITE.name}, operated by {SITE.legalName} (ABN {SITE.abn}) · {new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })} ·{' '}
          <a href={`https://abr.business.gov.au/ABN/View?abn=${SITE.abn.replace(/\s/g, '')}`} target="_blank" rel="noopener">Check the ABN</a>
        </p>
        <div style={{ fontSize: '1.05rem', color: 'var(--ink-2)' }} className="markdown-body">
          <section className="answer-capsule" aria-labelledby="short-answer">
            <h2 id="short-answer">The short answer</h2>
            <ReactMarkdown>{answer}</ReactMarkdown>
          </section>
          <div className="card card-pad" style={{ margin: '0 0 1.75rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem 1.25rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>
              {lead ? `${leadLabel}${leadFrom ? ` from ${leadFrom}` : ''} · free tracked shipping Australia-wide` : 'Free tracked shipping Australia-wide on every order'}
            </span>
            <Link href={lead ? `/shop/${lead.slug}/` : '/shop/'} className="btn btn-accent">{lead ? `${leadLabel} →` : 'Buy prop money in Australia →'}</Link>
          </div>
          {PRICE_TABLE_POSTS.has(post.slug) && <PriceLadder />}
          {rest.map((para, i) => (
            <div key={i} style={{ marginBottom: '1.5rem' }}>
              <ReactMarkdown>{para}</ReactMarkdown>
            </div>
          ))}
          {SOURCES_POSTS.has(post.slug) && (
            <section aria-labelledby="sources" style={{ marginTop: '2rem' }}>
              <h2 id="sources" style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>Sources and further reading</h2>
              <ul>
                {SOURCES.map((s) => (
                  <li key={s.href}><a href={s.href} target="_blank" rel="noopener">{s.label}</a></li>
                ))}
              </ul>
              <p style={{ fontSize: '0.9rem' }}>General information only, not legal advice. Check the current RBA guidance before reproducing any banknote image.</p>
            </section>
          )}
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
          <Link href="/shop/" className="btn btn-accent">Buy prop money in Australia →</Link>
        </div>
      </article>
    </div>
  )
}
