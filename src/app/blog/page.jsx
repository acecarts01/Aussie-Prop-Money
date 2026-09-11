import Link from 'next/link'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import { POSTS } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const metadata = {
  title: 'Guides — Prop Money for Film, Theatre & Content in Australia',
  description: 'Buying guides, legal explainers and use-case notes for studio-grade prop money — written for crews, teachers and creators.',
  alternates: { canonical: absoluteUrl('/blog/') },
}

export default function BlogIndex() {
  const posts = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1))
  return (
    <div>
      <PageHeader
        eyebrow="Guides & explainers"
        title="Read before you shoot"
        subtitle="What the law actually says, what reads on camera, and how much to order — from the people who print it."
        breadcrumbs={<Breadcrumbs trail={[{ label: 'Guides', href: '/blog/' }]} />}
      />
      <div className="container section">
        <div className="grid grid-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className="card card-pad blog-card">
              <span className="date">{new Date(p.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <span className="go">Read →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
