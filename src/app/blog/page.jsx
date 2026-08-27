import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import { POSTS } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Blog — Prop Money Guides for Australia',
  description: 'Buying guides, legal explainers, and use-case tips for Australian prop money.',
  alternates: { canonical: absoluteUrl('/blog/') },
}

export default function BlogIndex() {
  return (
    <div className="container section" style={{ maxWidth: '760px' }}>
      <Breadcrumbs trail={[{ label: 'Blog', href: '/blog/' }]} />
      <h1>Blog</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1.5rem' }}>
        {POSTS.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}/`} className="card" style={{ padding: '1.25rem', textDecoration: 'none', color: 'inherit' }}>
            <h2 style={{ fontSize: '1.1rem', margin: 0 }}>{p.title}</h2>
            <p style={{ color: 'var(--ink-faint)', fontSize: '0.85rem' }}>
              {new Date(p.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p style={{ margin: 0 }}>{p.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
