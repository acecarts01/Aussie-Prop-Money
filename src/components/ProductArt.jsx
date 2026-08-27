import { NOTE_COLORS } from '@/config/site'

const LABELS = {
  five: '$5',
  ten: '$10',
  twenty: '$20',
  fifty: '$50',
  hundred: '$100',
  neutral: 'ARP',
}

/**
 * Inline SVG placeholder standing in for real product photography.
 * Replace with photographed images (see docs/PROJECT.md open items) and
 * run `npm run images` once real photos are supplied.
 */
export default function ProductArt({ colorKey = 'neutral', label, className }) {
  const color = NOTE_COLORS[colorKey] || NOTE_COLORS.neutral
  const text = label || LABELS[colorKey] || 'ARP'
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label={`Placeholder illustration for ${text} prop note stack`}
    >
      <rect width="400" height="300" fill="#ffffff" />
      {[18, 10, 2].map((offset, i) => (
        <g key={i} transform={`translate(${60 - offset}, ${190 - offset})`}>
          <rect width="280" height="90" rx="8" fill={color} opacity={0.25 + i * 0.25} stroke={color} strokeWidth="2" />
        </g>
      ))}
      <g transform="translate(60,110)">
        <rect width="280" height="130" rx="10" fill={color} />
        <circle cx="140" cy="65" r="42" fill="rgba(255,255,255,0.18)" />
        <text
          x="140"
          y="78"
          textAnchor="middle"
          fontFamily="Fraunces, Georgia, serif"
          fontWeight="700"
          fontSize="40"
          fill="#fff"
        >
          {text}
        </text>
        <text x="20" y="24" fontFamily="Public Sans, sans-serif" fontSize="11" fill="rgba(255,255,255,0.85)" letterSpacing="1">
          NOT LEGAL TENDER
        </text>
        <text x="20" y="118" fontFamily="Public Sans, sans-serif" fontSize="10" fill="rgba(255,255,255,0.7)" letterSpacing="1">
          PROP · AUSTRALIAN RESERVE PROPS
        </text>
      </g>
    </svg>
  )
}
