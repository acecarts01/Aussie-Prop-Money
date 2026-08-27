import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
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

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    datePublished: post.date,
    author: { '@type': 'Organization', name: SITE.name },
    publisher: { '@type': 'Organization', name: SITE.name },
  }

  return (
    <div className="container section" style={{ maxWidth: '68ch' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs trail={[{ label: 'Blog', href: '/blog/' }, { label: post.title, href: `/blog/${post.slug}/` }]} />
      <h1>{post.title}</h1>
      <p style={{ color: 'var(--ink-faint)', fontSize: '0.85rem' }}>
        {new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
      {post.body.map((para, i) => <p key={i}>{para}</p>)}
      <div className="callout" style={{ marginTop: '2rem' }}>
        Ready to order? <Link href="/shop/">Browse the full range</Link>.
      </div>
    </div>
  )
}
