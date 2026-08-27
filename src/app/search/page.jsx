'use client'

import { Suspense, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
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
    <div className="container section" style={{ maxWidth: '68ch' }}>
      <h1>Search</h1>
      <div className="field">
        <label htmlFor="search-input">Search products and articles</label>
        <input id="search-input" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. $50 note, wholesale, legal" />
      </div>

      {q && (
        <>
          <h2 style={{ fontSize: '1.05rem' }}>Products ({results.products.length})</h2>
          <ul>
            {results.products.map((p) => (
              <li key={p.slug}><Link href={`/product/${p.slug}/`}>{p.name}</Link></li>
            ))}
          </ul>
          <h2 style={{ fontSize: '1.05rem' }}>Articles ({results.posts.length})</h2>
          <ul>
            {results.posts.map((p) => (
              <li key={p.slug}><Link href={`/blog/${p.slug}/`}>{p.title}</Link></li>
            ))}
          </ul>
        </>
      )}
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
