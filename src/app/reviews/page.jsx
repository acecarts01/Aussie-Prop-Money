import PageHeader from '@/components/PageHeader'
import Breadcrumbs from '@/components/Breadcrumbs'
import { REVIEWS, SITE } from '@/config/site'
import Icon from '@/components/Icon'

export const metadata = {
  title: `Customer Reviews | ${SITE.name}`,
  description: `Read what our clients say about our studio-grade prop money. Over ${SITE.reviewCount} verified reports from film, theatre, and production crews.`,
}

export default function ReviewsPage() {
  // Only show reviews from the ABN registration date (2024-04-22)
  const abnDate = new Date('2024-04-22')
  const validReviews = REVIEWS.filter(r => new Date(r.date) >= abnDate)

  return (
    <div>
      <PageHeader
        eyebrow="Set reports"
        title={`Customer Reviews & Set Reports`}
        subtitle={`Verified feedback from production crews, photographers, and filmmakers across Australia. ${SITE.trustpilotRating}★ across ${SITE.reviewCount} reports.`}
        breadcrumbs={<Breadcrumbs trail={[{ label: 'Reviews', href: '/reviews/' }]} />}
      />

      <section className="section surface-1">
        <div className="container">
          <div className="trustpilot-summary" style={{ marginBottom: '3rem' }}>
            <div className="tp-logo">
              <Icon name="trustpilot" size={32} style={{ color: '#00b67a' }} />
              <span style={{ fontSize: '1.8rem' }}>Trustpilot</span>
            </div>
            <div className="tp-rating">
              <div className="stars">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className={`tp-star-box filled`} style={{ width: '30px', height: '30px' }}>
                    <Icon name="trustpilot" size={20} />
                  </div>
                ))}
              </div>
              <span className="rating-text" style={{ fontSize: '1.1rem' }}>TrustScore <b>{SITE.trustpilotRating}</b> | <b>{SITE.reviewCount}</b> reviews</span>
            </div>
          </div>

          <div className="grid grid-3">
            {validReviews.map((r, i) => (
              <div key={i} className="card card-pad review-card">
                <div className="review-stars">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Icon key={s} name="trustpilot" size={16} style={{ color: s <= r.rating ? '#00b67a' : 'var(--line-strong)' }} />
                  ))}
                </div>
                <blockquote style={{ fontStyle: 'italic', color: 'var(--ink)' }}>
                  &ldquo;{r.text}&rdquo;
                </blockquote>
                <div className="rev-meta" style={{ marginTop: 'auto', paddingTop: '1rem' }}>
                  <span className="name" style={{ fontWeight: 700, color: 'var(--accent)' }}>{r.name}</span>
                  {r.location && <span className="loc" style={{ color: 'var(--ink-3)', fontSize: '0.8rem' }}> · {r.location}</span>}
                  <div className="date" style={{ fontSize: '0.75rem', color: 'var(--ink-3)', marginTop: '0.2rem' }}>
                    {new Date(r.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-2">
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '1.8rem' }}>Submit your own set report</h2>
          <p style={{ color: 'var(--ink-2)', marginBottom: '1.5rem' }}>Are you a production house or creator who used our props on set? We&rsquo;d love to hear from you.</p>
          <a href="mailto:info@australianreserveprops.com" className="btn btn-accent">Email us your feedback</a>
        </div>
      </section>
    </div>
  )
}
