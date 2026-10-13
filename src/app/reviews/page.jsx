import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import Breadcrumbs from '@/components/Breadcrumbs'
import { REVIEWS, REVIEW_STATS, SITE } from '@/config/site'
import Icon from '@/components/Icon'

export const metadata = {
  title: `Customer Reviews | ${SITE.name}`,
  description: `Read what our clients say about our studio-grade prop money. ${REVIEW_STATS.count} client reviews from film, theatre, and production crews.`,
}

const initials = (name) => {
  const parts = name.replace(/[^A-Za-z\s'-]/g, '').split(/[\s-]+/).filter(Boolean)
  return ((parts[0]?.[0] || '') + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase()
}

// Star squares: filled green up to the rating, grey after. A generic star shape, not any platform's logo.
function StarBoxes({ rating, size = 22 }) {
  return (
    <div className="rv-stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} className={`rv-star${s <= rating ? ' on' : ''}`} style={{ width: size, height: size }}>
          <Icon name="trustpilot" size={Math.round(size * 0.66)} />
        </span>
      ))}
    </div>
  )
}

export default function ReviewsPage() {
  const reviews = REVIEWS
  const counts = [5, 4, 3, 2, 1].map((n) => ({ n, c: reviews.filter((r) => Math.round(r.rating) === n).length }))

  return (
    <div>
      <PageHeader
        eyebrow="Set reports"
        title="Customer Reviews & Set Reports"
        subtitle={`Feedback from production crews, photographers, and filmmakers across Australia. ${REVIEW_STATS.rating}★ average from ${REVIEW_STATS.count} client reviews.`}
        breadcrumbs={<Breadcrumbs trail={[{ label: 'Reviews', href: '/reviews/' }]} />}
      />

      <section className="section surface-1">
        <div className="container">
          <div className="rv-summary">
            <div className="rv-score">
              <span className="rv-score-num">{REVIEW_STATS.rating}</span>
              <StarBoxes rating={Math.round(REVIEW_STATS.rating)} size={34} />
              <span className="rv-score-sub">Based on <b>{REVIEW_STATS.count}</b> client reviews</span>
            </div>
            <div className="rv-bars" aria-label="Rating breakdown">
              {counts.map(({ n, c }) => (
                <div key={n} className="rv-bar-row">
                  <span className="rv-bar-label">{n}-star</span>
                  <span className="rv-bar"><span className="rv-bar-fill" style={{ width: `${(c / reviews.length) * 100}%` }} /></span>
                  <span className="rv-bar-count">{c}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rv-masonry">
            {reviews.map((r) => (
              <article key={r.name + r.date} className="card rv-card">
                <header className="rv-head">
                  <span className="rv-avatar" aria-hidden="true">{initials(r.name)}</span>
                  <div>
                    <span className="rv-name">{r.name}</span>
                    {r.location && <span className="rv-loc">{r.location}</span>}
                  </div>
                </header>
                <div className="rv-line">
                  <StarBoxes rating={r.rating} size={20} />
                  <time dateTime={r.date} className="rv-date">
                    {new Date(r.date).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </div>
                <blockquote className="rv-text">&ldquo;{r.text}&rdquo;</blockquote>
                <p className="rv-source">Client review</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-2">
        <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h2 style={{ fontSize: '1.8rem' }}>Submit your own set report</h2>
          <p style={{ color: 'var(--ink-2)', marginBottom: '1.5rem' }}>Are you a production house or creator who used our props on set? We&rsquo;d love to hear from you.</p>
          <Link href="/contact/" className="btn btn-accent">Send your feedback</Link>
        </div>
      </section>
    </div>
  )
}
