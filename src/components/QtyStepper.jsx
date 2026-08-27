'use client'

export default function QtyStepper({ value, onChange, min = 1 }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', border: '1.5px solid var(--line)', borderRadius: 999 }}>
      <button
        type="button"
        aria-label="Decrease quantity"
        className="tap-target"
        style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        −
      </button>
      <span style={{ minWidth: '2ch', textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        className="tap-target"
        style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
        onClick={() => onChange(value + 1)}
      >
        +
      </button>
    </div>
  )
}
