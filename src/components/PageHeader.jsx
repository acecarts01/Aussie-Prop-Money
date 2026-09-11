// Inner-page header: charcoal band with faint gridlines, eyebrow → H1 → sub.
// `accent` is accepted for backwards-compatibility but intentionally unused —
// the design uses one accent colour site-wide.
export default function PageHeader({ eyebrow, title, subtitle, breadcrumbs }) {
  return (
    <div className="page-header gridlines">
      <div className="container">
        {breadcrumbs}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </div>
  )
}
