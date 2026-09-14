import Link from 'next/link'
import { PRODUCTS } from '@/config/site'
import { formatPrice } from '@/lib/utils'
import { valueReturn, fmtFace } from '@/lib/value'

// Sibling products in the same category, side by side: note count / face value /
// price. Gives the "which size do I need" answer without leaving the page.
export default function BundleCompare({ product }) {
  const siblings = PRODUCTS.filter((p) => p.category === product.category)
  if (siblings.length < 2) return null

  return (
    <div>
      <h2 style={{ fontSize: '1.3rem', marginBottom: '0.9rem' }}>Compare sizes</h2>
      <div className="bundle-compare">
        {siblings.map((p) => {
          const label = p.name.replace(/^\$\d+ AUD Prop Note /, '').replace(/^Vintage /, '')
          return (
            <Link key={p.slug} href={`/product/${p.slug}/`} className={`bundle${p.slug === product.slug ? ' current' : ''}`} aria-current={p.slug === product.slug ? 'page' : undefined}>
              <span className="k">{p.slug === product.slug ? 'Viewing' : 'Option'}</span>
              <span className="n">{label}</span>
              {valueReturn(p) ? (
                <>
                  <span className="v">{fmtFace(p.faceValue)} face value · {p.noteCount.toLocaleString('en-AU')} notes</span>
                  <span className="p">{formatPrice(p.price)} <em className="x">{valueReturn(p).multiplier}×</em></span>
                </>
              ) : (
                <>
                  <span className="v">{p.faceValueLabel}</span>
                  <span className="p">{formatPrice(p.price)}</span>
                </>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
