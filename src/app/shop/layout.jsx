import { PRODUCTS } from '@/config/site'
import { absoluteUrl, seoDescription, ogMeta, formatPriceShort } from '@/lib/utils'

const from = Math.min(...PRODUCTS.map((p) => p.price))
const title = 'Buy Prop Money Australia | Shop All Prop Notes'

export const metadata = {
  title,
  description: seoDescription(`Buy prop money online in Australia: $20, $50 and $100 note stacks, packs, briefcase sets and money confetti from ${formatPriceShort(from)}. Free tracked shipping.`),
  ...ogMeta(title, '/shop/'),
  alternates: { canonical: absoluteUrl('/shop/') },
}

export default function ShopLayout({ children }) {
  return children
}
