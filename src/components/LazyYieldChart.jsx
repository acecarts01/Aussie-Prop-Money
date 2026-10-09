'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'

// The chart pulls in d3 and draws an SVG, so it loads and renders only when it is about to scroll into view.
// The placeholder mirrors the chart's box (title line + a 2:1 plot with the same padding and border), so the
// page does not shift when the chart arrives.
const YieldChart = dynamic(() => import('./YieldChart'), { ssr: false })

function Placeholder() {
  return (
    <div className="yield-chart-wrap" style={{ marginTop: '1.5rem' }} aria-hidden="true">
      <div style={{ height: '35px' }} />
      <div style={{ padding: '1rem', border: '1px solid transparent' }}>
        <div style={{ aspectRatio: '2 / 1' }} />
      </div>
    </div>
  )
}

export default function LazyYieldChart(props) {
  const ref = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setShow(true)
      return
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShow(true)
        io.disconnect()
      }
    }, { rootMargin: '300px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return show ? <YieldChart {...props} /> : <div ref={ref}><Placeholder /></div>
}
