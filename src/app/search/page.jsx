'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS, POSTS } from '@/config/site'

function SearchInner() {
  const params = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')

  const results = useMemo(() => {
    const term = q.trim().toLowerCase()
    if (!term) return { products: [], posts: [] }
    return {
      products: PRODUCTS.filter((p) => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)),
      posts: POSTS.filter((p) => p.title.toLowerCase().includes(term) || p.excerpt.toLowerCase().includes(term)),
    }
  }, [q])

  return (
    <div>
      <PageHeader eyebrow="Find it fast" title="Search" subtitle="Products and guides, matched as you type." />
      <section className="section surface-1">
        <div className="container">
          <div className="field" style={{ maxWidth: '560px' }}>
            <label htmlFor="search-input">Search products and guides</label>
            <input id="search-input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. $50 note, briefcase, legal" />
          </div>

          {q && (
            <>
              <h2 style={{ fontSize: '1.3rem', marginTop: '2rem' }}>Products ({results.products.length})</h2>
              {results.products.length > 0 ? (
                <div className="grid grid-4">{results.products.map((p) => <ProductCard key={p.slug} product={p} />)}</div>
              ) : <p style={{ color: 'var(--ink-3)' }}>No products match.</p>}

              <h2 style={{ fontSize: '1.3rem', marginTop: '2.5rem' }}>Guides ({results.posts.length})</h2>
              {results.posts.length > 0 ? (
                <div className="grid grid-3">
                  {results.posts.map((p) => (
                    <Link key={p.slug} href={`/blog/${p.slug}/`} className="card card-pad blog-card">
                      <h3>{p.title}</h3><p>{p.excerpt}</p><span className="go">Read →</span>
                    </Link>
                  ))}
                </div>
              ) : <p style={{ color: 'var(--ink-3)' }}>No guides match.</p>}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchInner />
    </Suspense>
  )
}
