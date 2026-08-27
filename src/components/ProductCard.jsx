import Link from 'next/link'
import ProductArt from './ProductArt'
import { getCategory, formatPrice } from '@/lib/utils'
import { NOTE_COLORS } from '@/config/site'

export default function ProductCard({ product }) {
  const category = getCategory(product.category)
  const colorKey = category?.color || 'neutral'
  const accent = NOTE_COLORS[colorKey]

  return (
    <Link href={`/product/${product.slug}/`} className="product-card" style={{ '--tile-accent': accent, textDecoration: 'none', color: 'inherit' }}>
      <div className="product-frame">
        <ProductArt colorKey={colorKey} />
      </div>
      <div className="product-body">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <h3 style={{ fontSize: '1.05rem', margin: 0 }}>{product.name}</h3>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ink-faint)' }}>{product.faceValueLabel}</p>
        <span className="product-price">{formatPrice(product.price)}</span>
      </div>
    </Link>
  )
}
