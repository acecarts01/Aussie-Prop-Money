import Link from 'next/link'
import WebForm from '@/components/WebForm'
import Breadcrumbs from '@/components/Breadcrumbs'
import PageHeader from '@/components/PageHeader'
import FaqBlock from '@/components/FaqBlock'
import ComplianceBadge from '@/components/ComplianceBadge'
import Icon from '@/components/Icon'
import { PAGE_FAQS, PRODUCTS } from '@/config/site'
import { absoluteUrl, formatPrice, seoTitle, seoDescription, ogMeta } from '@/lib/utils'

export const metadata = {
  title: seoTitle('Production & Wholesale Prop Money — Film, TV & Theatre Volume Orders'),
  description: seoDescription('Bulk and wholesale prop money for film, TV and theatre productions across Australia. Consistent stacks across scenes, custom denomination mixes, pre-banded reveal sets.'),
  ...ogMeta(seoTitle('Production & Wholesale Prop Money — Film, TV & Theatre Volume Orders'), '/wholesale/'),
  alternates: { canonical: absoluteUrl('/wholesale/') },
}

const anchors = ['bulk-production-pack', 'briefcase-prop-set-250k', 'duffel-bag-prop-set-500k']
  .map((s) => PRODUCTS.find((p) => p.slug === s))
  .filter(Boolean)

const HOW = [
  ['Send the scene list', 'Denominations, approximate face value per scene, shoot dates. Rough is fine.'],
  ['Get one quote', 'One batch, one print run — so stacks match across scenes shot weeks apart.'],
  ['Pre-banded, pre-packed', 'Sets arrive ready for the reveal. Circulation level and band style to spec.'],
]

export default function WholesalePage() {
  return (
    <div>
      <PageHeader
        eyebrow="For productions & agencies"
        title="Production volume, one print run"
        subtitle="Film, TV and theatre productions that need cash across multiple scenes. Ordered together, printed together — so scene four and scene twelve match."
        breadcrumbs={<Breadcrumbs trail={[{ label: 'Production & wholesale', href: '/wholesale/' }]} />}
      />

      <section className="section-tight surface-1">
        <div className="container grid grid-3">
          {HOW.map(([t, d], i) => (
            <div key={t} className="card card-pad">
              <span className="eyebrow">Step 0{i + 1}</span>
              <h3 style={{ marginBottom: '0.4rem' }}>{t}</h3>
              <p style={{ color: 'var(--ink-2)', margin: 0, fontSize: '0.95rem' }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section surface-2">
        <div className="container">
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>Starting points</h2>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Set</th><th>Face value</th><th>Price</th><th></th></tr></thead>
              <tbody>
                {anchors.map((p) => (
                  <tr key={p.slug}>
                    <td><strong>{p.name}</strong></td>
                    <td>{p.faceValueLabel}</td>
                    <td className="num">{formatPrice(p.price)}</td>
                    <td><Link href={`/product/${p.slug}/`} className="btn btn-ghost">View →</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: 'var(--ink-2)', marginTop: '1rem', maxWidth: '70ch' }}>
            Beyond these, quotes are custom: mixed denominations, multiple sets, reshoot buffers. As with every product, serials are system-assigned — no custom or buyer-specified serial numbers at any order size.
          </p>
        </div>
      </section>

      <section className="section surface-1">
        <div className="container grid grid-2" style={{ alignItems: 'start' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem' }}>Request a production quote</h2>
            <p style={{ color: 'var(--ink-2)' }}>Include shoot dates if you have them — turnaround depends on volume, and we&rsquo;ll confirm before you commit.</p>
            <ComplianceBadge />
          </div>
          <div className="card card-pad">
            <WebForm
              kind="wholesale"
              thankYouHref="/thank-you-wholesale/"
              submitLabel="Send quote request"
              fields={
                <>
                  <div className="field"><label htmlFor="w-name">Name / production</label><input id="w-name" name="name" type="text" required /></div>
                  <div className="field"><label htmlFor="w-email">Email</label><input id="w-email" name="email" type="email" required /></div>
                  <div className="field"><label htmlFor="w-details">What do you need?</label><textarea id="w-details" name="details" rows={5} placeholder="Denominations, approximate face value per scene, shoot dates" /></div>
                </>
              }
            />
          </div>
        </div>
      </section>

      <div className="container" style={{ paddingBottom: '4rem' }}>
        <FaqBlock faqs={PAGE_FAQS.wholesale} />
      </div>
    </div>
  )
}
