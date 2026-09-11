// The compliance line as a design element — slate-striped edge, condensed caps.
// Reused in the hero, on every product page, and in the footer, so the site's
// legal position reads as part of the brand rather than a disclaimer bolted on.
export default function ComplianceBadge({ size = 'md', text }) {
  return (
    <div className={`badge-compliance${size === 'lg' ? ' lg' : ''}`} role="note" aria-label="Compliance notice">
      <span className="stripe" aria-hidden="true" />
      <span className="txt">
        {text || (
          <>
            <em>Not legal tender</em> · Reduced-scale prop currency · For film, theatre &amp; performance use
          </>
        )}
      </span>
    </div>
  )
}
