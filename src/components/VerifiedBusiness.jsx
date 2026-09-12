import { SITE } from '@/config/site'
import Icon from './Icon'

const fmt = (iso) => new Date(iso).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })

/**
 * The ABN block. One registered company stands behind every order, and the
 * record is public — so we show it, link to it, and tell the buyer to check.
 * `compact` renders the short strip used inside checkout and the footer.
 */
export default function VerifiedBusiness({ compact = false }) {
  const abrLink = (
    <a href={SITE.abrUrl} target="_blank" rel="noopener noreferrer" className="abn-link">
      Verify on the Australian Business Register <span aria-hidden="true">↗</span>
    </a>
  )

  if (compact) {
    return (
      <div className="verified verified-compact">
        <span className="verified-icon" aria-hidden="true"><Icon name="check" size={16} /></span>
        <div>
          <strong>ABN {SITE.abn}</strong>
          <span className="verified-entity">{SITE.legalName} · {SITE.abnStatus} · GST registered</span>
          {abrLink}
        </div>
      </div>
    )
  }

  return (
    <section className="verified" aria-labelledby="verified-title">
      <div className="verified-head">
        <span className="eyebrow">Registered Australian business</span>
        <h2 id="verified-title">You&rsquo;ve found the source. Check the record, then stop searching.</h2>
        <p>
          One registered Australian company stands behind every order on this site — with a public record you can open right now on the Australian Government&rsquo;s business register. No middleman, no marketplace seller, no guesswork.
        </p>
      </div>
      <dl className="verified-grid">
        <div>
          <dt>ABN</dt>
          <dd className="verified-abn">{SITE.abn}</dd>
          <dd className="verified-entity">{SITE.legalName}</dd>
        </div>
        <div>
          <dt>Entity</dt>
          <dd>{SITE.entityType}</dd>
        </div>
        <div>
          <dt>ABN status</dt>
          <dd>{SITE.abnStatus} from {fmt(SITE.abnRegisteredFrom)}</dd>
        </div>
        <div>
          <dt>GST</dt>
          <dd>Registered from {fmt(SITE.gstRegisteredFrom)}</dd>
        </div>
        <div>
          <dt>Main business location</dt>
          <dd>{SITE.location}, Australia</dd>
        </div>
        <div>
          <dt>Official record</dt>
          <dd>{abrLink}</dd>
        </div>
      </dl>
    </section>
  )
}
