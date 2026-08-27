export default function PageHeader({ eyebrow, title, subtitle, accent, breadcrumbs }) {
  return (
    <div
      className="page-header luxury-band"
      style={accent ? { backgroundImage: `radial-gradient(ellipse at top right, ${accent}33, transparent 60%)` } : undefined}
    >
      <div className="container">
        {breadcrumbs}
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h1>{title}</h1>
        <hr className="gold-rule" />
        {subtitle && <p style={{ maxWidth: '60ch', color: 'rgba(243,239,231,0.78)' }}>{subtitle}</p>}
      </div>
    </div>
  )
}
