'use client'

import dynamic from 'next/dynamic'

// The chart pulls in d3, which is heavy and sits below the fold, so it loads after the page is interactive.
// The placeholder mirrors the chart's box (title line + a 2:1 plot with the same padding and border), so the
// page does not shift when the chart arrives.
const YieldChart = dynamic(() => import('./YieldChart'), {
  ssr: false,
  loading: () => (
    <div className="yield-chart-wrap" style={{ marginTop: '1.5rem' }} aria-hidden="true">
      <div style={{ height: '35px' }} />
      <div style={{ padding: '1rem', border: '1px solid transparent' }}>
        <div style={{ aspectRatio: '2 / 1' }} />
      </div>
    </div>
  ),
})

export default function LazyYieldChart(props) {
  return <YieldChart {...props} />
}
