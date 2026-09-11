import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import ComplianceBadge from '@/components/ComplianceBadge'
import { POSTS, SITE } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }) {
  const post = POSTS.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: absoluteUrl(`/blog/${post.slug}/`) },
  }
}

export default function BlogPost({ params }) {
  const post = POSTS.find((p) => p.slug === params.slug)
  if (!post) notFound()
  const faqs = post.faqs || []

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

        <div className="card card-pad" style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <ComplianceBadge />
          <Link href="/shop/" className="btn btn-accent">Shop film-ready packs →</Link>
        </div>
      </article>
    </div>
  )
}
