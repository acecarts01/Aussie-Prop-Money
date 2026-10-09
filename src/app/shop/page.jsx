'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import ProductCard from '@/components/ProductCard'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import ComplianceBadge from '@/components/ComplianceBadge'
import Metadata from '@/components/Metadata'
import { CATEGORIES, PRODUCTS, BRANDS } from '@/config/site'
import { absoluteUrl, itemListSchema, formatPrice } from '@/lib/utils'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 5000])

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      const catMatch = selectedCategory === 'all' || p.category === selectedCategory
      const brandMatch = selectedBrand === 'all' || p.brand === selectedBrand
      const priceMatch = p.price >= priceRange[0] && p.price <= priceRange[1]
      return catMatch && brandMatch && priceMatch
    })
  }, [selectedCategory, selectedBrand, priceRange])

  const schema = useMemo(() => itemListSchema(PRODUCTS, 'Australian Reserve Props — full range'), [])

  return (
    <div>
      <Metadata 
        title="Shop Prop Money Australia — Full Range"
        description="Browse our complete range of studio-grade, RBA-compliant prop notes. $20, $50, $100 denominations, bulk packs and more."
        canonical="/shop/"
        schemas={[schema]}
      />
      <PageHeader
        eyebrow="The full range"
        title="Buy prop money Australia — full range"
        subtitle="Australian prop money for sale online: realistic fake money for film, parties and classrooms, shipped free and tracked across Australia. Use the filters to pick the best prop money for your scene."
        breadcrumbs={<Breadcrumbs trail={[{ label: 'Shop', href: '/shop/' }]} />}
      />

      <div className="container section-tight">
        <div className="shop-layout" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '2.5rem', alignItems: 'start' }}>
          {/* Sidebar Filter */}
          <aside className="shop-sidebar card card-pad" style={{ position: 'sticky', top: '100px' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <p className="h-label" style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--accent)' }}>Categories</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button 
                  onClick={() => setSelectedCategory('all')} 
                  className={`btn btn-ghost ${selectedCategory === 'all' ? 'btn-accent' : ''}`}
                  style={{ justifyContent: 'flex-start', fontSize: '0.85rem', minHeight: 'auto', padding: '0.5rem' }}
                >
                  All Categories
                </button>
                {CATEGORIES.map((c) => (
                  <button 
                    key={c.slug} 
                    onClick={() => setSelectedCategory(c.slug)} 
                    className={`btn btn-ghost ${selectedCategory === c.slug ? 'btn-accent' : ''}`}
                    style={{ justifyContent: 'flex-start', fontSize: '0.85rem', minHeight: 'auto', padding: '0.5rem', textAlign: 'left' }}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <p className="h-label" style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--accent)' }}>Brands</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <button 
                  onClick={() => setSelectedBrand('all')} 
                  className={`btn btn-ghost ${selectedBrand === 'all' ? 'btn-accent' : ''}`}
                  style={{ justifyContent: 'flex-start', fontSize: '0.85rem', minHeight: 'auto', padding: '0.5rem' }}
                >
                  All Brands
                </button>
                {BRANDS.map((b) => (
                  <button 
                    key={b.slug} 
                    onClick={() => setSelectedBrand(b.slug)} 
                    className={`btn btn-ghost ${selectedBrand === b.slug ? 'btn-accent' : ''}`}
                    style={{ justifyContent: 'flex-start', fontSize: '0.85rem', minHeight: 'auto', padding: '0.5rem', textAlign: 'left' }}
                  >
                    {b.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="h-label" style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--accent)' }}>Max Price</p>
              <input 
                type="range" 
                min="0" 
                max="5000" 
                step="100" 
                value={priceRange[1]} 
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                style={{ width: '100%', accentColor: 'var(--accent)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--ink-2)', marginTop: '0.5rem' }}>
                <span>$0</span>
                <span>{formatPrice(priceRange[1])}</span>
              </div>
            </div>

            <button 
              className="btn btn-outline" 
              style={{ width: '100%', marginTop: '1.5rem', fontSize: '0.8rem' }}
              onClick={() => {
                setSelectedCategory('all');
                setSelectedBrand('all');
                setPriceRange([0, 5000]);
              }}
            >
              Reset Filters
            </button>
          </aside>

          {/* Product Grid */}
          <div>
            <h2 className="visually-hidden">All prop money products</h2>
            <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--ink-3)', fontSize: '0.9rem' }}>
                Showing <strong>{filteredProducts.length}</strong> products
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="card card-pad" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
                <p style={{ color: 'var(--ink-2)' }}>No products match your current filters.</p>
                <button onClick={() => { setSelectedCategory('all'); setSelectedBrand('all'); setPriceRange([0, 5000]); }} className="btn btn-ghost">Clear all filters</button>
              </div>
            ) : (
              <div className="grid grid-3">
                {filteredProducts.map((p) => <ProductCard key={p.slug} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          .shop-layout {
            grid-template-columns: 1fr !important;
          }
          .shop-sidebar {
            position: static !important;
            margin-bottom: 2rem;
          }
        }
      `}</style>

      <section className="section surface-2">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <ComplianceBadge size="lg" />
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link href="/blog/prop-money-buying-guide-for-australian-filmmakers/" className="btn btn-outline">Buying guide</Link>
            <Link href="/faq/" className="btn btn-outline">Legal &amp; FAQ</Link>
            <Link href="/wholesale/" className="btn btn-accent">Production &amp; wholesale</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
