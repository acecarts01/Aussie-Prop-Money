'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

// The chat button and the review pop-up are not needed to read or buy, so they load after the page is
// interactive instead of competing with hydration (keeps early interactions and INP fast).
const ChatHub = dynamic(() => import('./ChatHub'), { ssr: false })
const ActivityPop = dynamic(() => import('./ActivityPop'), { ssr: false })

export default function LateWidgets() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const show = () => setReady(true)
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(show, { timeout: 3000 })
      return () => window.cancelIdleCallback(id)
    }
    const t = setTimeout(show, 2000)
    return () => clearTimeout(t)
  }, [])

  if (!ready) return null
  return (
    <>
      <ChatHub />
      <ActivityPop />
    </>
  )
}
