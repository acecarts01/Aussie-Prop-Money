import Link from 'next/link'
import Image from 'next/image'
import ProductArt from './ProductArt'
import ValueReturn from './ValueReturn'
import CardAdd from './CardAdd'
import { getCategory, artLabelFor } from '@/lib/utils'
import { valueReturn } from '@/lib/value'

// The card is a <div> with the plate + title linked, so the quantity control
// underneath can be interactive without nesting buttons inside an anchor.
export default function ProductCard({ product, priority = false }) {
  const category = getCategory(product.category)
  const photo = product.images?.[0]
  const href = `/product/${product.slug}/`

  return (
    <div className="product-card">
      <Link href={href} className="plate" aria-label={product.name}>
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
      </Link>
      <div className="product-body">
        <p className="meta">{category?.name}</p>
        <h3><Link href={href}>{product.name}</Link></h3>
        {valueReturn(product) ? <ValueReturn product={product} size="card" /> : <p className="meta">{product.faceValueLabel}</p>}
        <CardAdd product={product} />
        <Link href={href} className="go">Details, options &amp; sizes →</Link>
      </div>
    </div>
  )
}
