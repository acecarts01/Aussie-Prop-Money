// Price and note-count maths — one place so cards, buy panel, cart and emails agree.
// "Face value" is the printed value of the prop notes. It is never a real-currency
// value: every note is reduced-scale and marked NOT LEGAL TENDER.
import { PRODUCTS } from '@/config/site'

export const fmtFace = (n) => '$' + Math.round(n).toLocaleString('en-AU')

export function valueReturn(product) {
  if (!product?.faceValue || !product.price) return null
  return {
    faceValue: product.faceValue,
    noteCount: product.noteCount,
    costPerNote: product.noteCount ? product.price / product.noteCount : null,
    badge: product.tier === 'director' ? "Director's Bundle" : product.tier === 'production' ? 'Production Stack' : null,
  }
}

// Sum of prop face value across a cart (items carry slug + qty).
export function cartFaceValue(items) {
  return items.reduce((sum, i) => {
    const p = PRODUCTS.find((x) => x.slug === i.slug)
    return sum + (p?.faceValue || 0) * (i.qty || 1)
  }, 0)
}

// The three note-stack sizes for a denomination category (half / stack / jumbo), in size order.
export function yieldLadder(category) {
  return PRODUCTS.filter((p) => p.category === category && p.faceValue && p.noteCount).sort((a, b) => a.noteCount - b.noteCount)
}
