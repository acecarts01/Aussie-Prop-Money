import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
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
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name },
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
        breadcrumbs={<Breadcrumbs trail={[{ label: 'Blog', href: '/blog/' }, { label: post.title, href: `/blog/${post.slug}/` }]} />}
      />

      <div className="container section" style={{ maxWidth: '68ch' }}>
        {post.body.map((para, i) => <p key={i}>{para}</p>)}

        {faqs.length > 0 && (
          <div style={{ marginTop: '2.5rem' }}>
            <h2 style={{ fontSize: '1.2rem' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
              {faqs.map((f) => (
                <details key={f.q} className="callout">
                  <summary style={{ fontWeight: 600, cursor: 'pointer' }}>{f.q}</summary>
                  <p style={{ marginTop: '0.6rem', marginBottom: 0 }}>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        )}

        <div className="callout" style={{ marginTop: '2rem' }}>
          Ready to order? <Link href="/shop/">Browse the full range</Link>.
        </div>
      </div>
    </div>
  )
}
