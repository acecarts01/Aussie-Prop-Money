// The one section-header pattern used everywhere: eyebrow → H2 → one-line sub.
export default function SectionHead({ eyebrow, title, sub, center = false, as: Tag = 'h2' }) {
  return (
    <div className={`section-head${center ? ' center' : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag>{title}</Tag>
      {sub && <p>{sub}</p>}
    </div>
  )
}
