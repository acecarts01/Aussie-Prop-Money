import Icon from './Icon'
import { TRUST_BADGES } from '@/config/site'

export default function TrustBadges() {
  return (
    <ul className="trust-badges" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
      {TRUST_BADGES.map((b) => (
        <li key={b.title} className="trust-badge">
          <span className="ico"><Icon name={b.icon} /></span>
          <div>
            <b>{b.title}</b>
            <span>{b.text}</span>
          </div>
        </li>
      ))}
    </ul>
  )
}
