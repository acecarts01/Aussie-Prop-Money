import Breadcrumbs from '@/components/Breadcrumbs'
import { SITE } from '@/config/site'
import { absoluteUrl } from '@/lib/utils'

export const metadata = {
  title: 'About Australian Reserve Props',
  description: 'Australian Reserve Props is a compliance-first Australian prop money brand founded in 2024.',
  alternates: { canonical: absoluteUrl('/about/') },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: { '@type': 'Organization', name: SITE.name, foundingDate: String(SITE.foundingYear) },
}

export default function AboutPage() {
  return (
    <div className="container section" style={{ maxWidth: '72ch' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs trail={[{ label: 'About', href: '/about/' }]} />
      <h1>About {SITE.name}</h1>
      <p>{SITE.brandStatement}</p>

      <h2 style={{ fontSize: '1.2rem' }}>Why We Exist</h2>
      <p>
        Most prop money available to Australian buyers is either printed overseas to US-dollar specifications, or
        sold without much thought to the Crimes (Currency) Act 1981 and the Reserve Bank of Australia&rsquo;s
        reproduction guidelines. We built {SITE.name} specifically for the Australian market: every note is
        reproduced to differ from genuine currency by at least 25% in size, carries no replicated security
        features, and is clearly marked NOT LEGAL TENDER.
      </p>

      <h2 style={{ fontSize: '1.2rem' }}>What We Won&rsquo;t Do</h2>
      <p>
        We don&rsquo;t offer custom or buyer-specified serial numbers, and every payment method on this site is
        described plainly for what it is, with no privacy or discretion angle attached. Every product page carries
        the same compliance disclaimer, and every price is the same regardless of how you pay.
      </p>

      <h2 style={{ fontSize: '1.2rem' }}>Our History</h2>
      <p>
        {SITE.name} was founded in {SITE.foundingYear}. A predecessor site operated briefly before going offline;
        a number of genuine customer reviews from that period were recovered and are published on this site with
        their original dates.
      </p>
    </div>
  )
}
