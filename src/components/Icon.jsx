// One icon set, one stroke weight (1.75), 24px grid. Decorative by default.
const PATHS = {
  clapper: (
    <>
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="M3 9 5 4h14l2 5" />
      <path d="m7 4 2.5 5M12 4l2.5 5M17 4l2.5 5" />
    </>
  ),
  ruler: (
    <>
      <path d="m3 17 14-14 4 4L7 21H3v-4Z" />
      <path d="m7 13 2 2M10 10l2 2M13 7l2 2" />
    </>
  ),
  set: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.5" />
      <path d="M12 4v3M12 17v3M4 12h3M17 12h3" />
    </>
  ),
  au: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />
      <path d="M3.5 12h17M12 3c2.6 2.6 3.9 5.6 3.9 9s-1.3 6.4-3.9 9c-2.6-2.6-3.9-5.6-3.9-9S9.4 5.6 12 3Z" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="10" width="14" height="11" rx="1.5" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  check: <path d="m5 12 4.5 4.5L19 7" />,
  btc: (
    <>
      <circle cx="12" cy="12" r="10" fill="#F7931A" stroke="none" />
      <path d="M16 11.2c0-2.4-1.2-3.2-3.6-3.2h-3.4v8h3.8c2.4 0 3.2-0.8 3.2-3.2v-1.6zm-5-1.6h1.8c1 0 1.4 0.4 1.4 1.2v0.4c0 0.8-0.4 1.2-1.4 1.2H11v-2.8z" fill="white" stroke="none" />
    </>
  ),
  eth: (
    <>
      <circle cx="12" cy="12" r="10" fill="#627EEA" stroke="none" />
      <path d="M12 4l-0.1 0.3v10.6l0.1 0.1 5-2.9-5-8.1z" fill="white" fillOpacity="0.6" stroke="none" />
      <path d="M12 4l-5 8.1 5 2.9v-11z" fill="white" stroke="none" />
      <path d="M12 15.1l-0.1 0.1v4.7l0.1 0.1 5-7.1-5 2.2z" fill="white" fillOpacity="0.6" stroke="none" />
      <path d="M12 20v-4.9l-5-2.2 5 7.1z" fill="white" stroke="none" />
    </>
  ),
  usdt: (
    <>
      <circle cx="12" cy="12" r="10" fill="#26A17B" stroke="none" />
      <path d="M12.6 7.2v1.8h2.4v1.8H9v-1.8h2.4V7.2H6.6V5.4h10.8v1.8h-4.8zm0 5.4v5.4h-1.2v-5.4H6.6V10.8h10.8v1.8h-4.8z" fill="white" stroke="none" />
    </>
  ),
  bnb: (
    <>
      <circle cx="12" cy="12" r="10" fill="#F3BA2F" stroke="none" />
      <path d="M12 8.4l1.8 1.8 1.8-1.8-1.8-1.8L12 8.4zm3.6 3.6l1.8-1.8-1.8-1.8L13.8 12l1.8 1.8zm-3.6 3.6l1.8-1.8-1.8-1.8L10.2 12l1.8 1.8zm-3.6-3.6l-1.8 1.8 1.8 1.8L10.2 12l-1.8-1.8zm3.6 0.9l0.9-0.9-0.9-0.9-0.9 0.9 0.9 0.9z" fill="white" stroke="none" />
    </>
  ),
  trustpilot: (
    <path d="m12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" fill="currentColor" stroke="none" />
  ),
}

export default function Icon({ name, size = 18, label }) {
  const path = PATHS[name] || PATHS.check
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : 'true'}
      role={label ? 'img' : undefined}
      aria-label={label}
    >
      {path}
    </svg>
  )
}
