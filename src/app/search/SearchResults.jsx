'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import SectionHead from '@/components/SectionHead'

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) {
      setResults({ products: [], posts: [], categories: [] })
      return
    }

    setLoading(true)
    fetch(`/api/search?q=${encodeURIComponent(query)}`)
      .then(r => r.json())
      .then(data => {
        setResults(data)
        setLoading(false)
      })
      .catch(() => {
        setResults({ products: [], posts: [], categories: [] })
        setLoading(false)
      })
  }, [query])

  if (!query) {
    return (
      <div className="card card-pad" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>What are you looking for?</h2>
        <p style={{ color: 'var(--ink-2)', marginBottom: '2rem' }}>Enter a keyword like "$100", "compliance", or "briefcase".</p>
        <form action="/search/" className="search-form-page">
          <input 
            type="search" 
            name="q" 
            placeholder="Search products, guides..." 
            className="search-input-large"
            autoFocus
          />
          <button type="submit" className="btn btn-accent">Search</button>
        </form>
      </div>
    )
  }

  if (loading) return <div style={{ textAlign: 'center', padding: '5rem 0' }}>Searching for "{query}"...</div>

  const hasResults = results && (results.products.length > 0 || results.posts.length > 0 || results.categories.length > 0)

  if (!hasResults) {
    return (
      <div className="card card-pad" style={{ textAlign: 'center', padding: '5rem 1rem' }}>
        <h2 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>No results for "{query}"</h2>
        <p style={{ color: 'var(--ink-2)', marginBottom: '2rem' }}>Try checking your spelling or using more general terms.</p>
        <Link href="/shop/" className="btn btn-outline">Browse all products</Link>
      </div>
    )
  }

  return (
    <div className="search-results-grid">
      {results.products.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <SectionHead title="Products" sub={`Found ${results.products.length} matching products.`} />
          <div className="grid grid-4">
            {results.products.map(p => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}

      {results.categories.length > 0 && (
        <section style={{ marginBottom: '4rem' }}>
          <SectionHead title="Categories" sub="Matching denomination and set categories." />
          <div className="chip-row">
            {results.categories.map(c => (
              <Link key={c.slug} href={`/shop/${c.slug}/`} className="chip">{c.name} →</Link>
            ))}
          </div>
        </section>
      )}

      {results.posts.length > 0 && (
        <section>
          <SectionHead title="Guides & Info" sub="Legal explainers and production guides." />
          <div className="grid grid-3">
            {results.posts.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}/`} className="card card-pad blog-card">
                <span className="date">{new Date(post.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'short' })}</span>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <span className="go">Read guide →</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
