import Link from 'next/link'
import Image from 'next/image'
import ProductArt from './ProductArt'
import { getCategory, formatPrice, artLabelFor } from '@/lib/utils'

export default function ProductCard({ product, priority = false }) {
  const category = getCategory(product.category)
  const photo = product.images?.[0]

  return (
    <Link href={`/product/${product.slug}/`} className="product-card">
      <div className="plate">
        {product.badge && <span className="specimen-tag">{product.badge}</span>}
        {photo ? (
          <Image
            src={`/images/products/${photo}`}
            alt={product.name}
            width={1600}
            height={1200}
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
          />
        ) : (
          <ProductArt colorKey={category?.color} label={artLabelFor(product)} />
        )}
      </div>
      <div className="product-body">
        <p className="meta">{category?.name}</p>
        <h3>{product.name}</h3>
        <p className="meta">{product.faceValueLabel}</p>
        <div className="row">
          <span className="product-price">{formatPrice(product.price)}</span>
          <span className="go">View →</span>
        </div>
      </div>
    </Link>
  )
}
