'use client'

import { useState } from 'react'
import { CHAT } from '@/config/site'

const ICONS = { whatsapp: '💬', email: '✉️', telegram: '📨' }
const LABELS = { whatsapp: 'WhatsApp', email: 'Email', telegram: 'Telegram' }

function hrefFor(channel) {
  if (channel.type === 'whatsapp') return `https://wa.me/${(channel.value || '').replace(/\D/g, '')}`
  if (channel.type === 'email') return `mailto:${channel.value}`
  if (channel.type === 'telegram') return `https://t.me/${channel.value}`
  return '#'
}

export default function ChatHub() {
  const [open, setOpen] = useState(false)
  const channels = (CHAT.channels || []).filter((c) => c.value && !c.value.startsWith('['))

  if (channels.length === 0) return null

  if (channels.length === 1) {
    const c = channels[0]
    return (
      <div className="chat-hub">
        <a href={hrefFor(c)} className="chat-fab" aria-label={`Contact via ${LABELS[c.type]}`} target="_blank" rel="noopener noreferrer">
          {ICONS[c.type] || '💬'}
        </a>
      </div>
    )
  }

  return (
    <div className="chat-hub">
      {open && (
        <div className="chat-menu">
          {channels.map((c) => (
            <a key={c.type} href={hrefFor(c)} target="_blank" rel="noopener noreferrer">
              <span aria-hidden="true">{ICONS[c.type] || '💬'}</span> {LABELS[c.type] || c.type}
            </a>
          ))}
        </div>
      )}
      <button type="button" className="chat-fab" aria-expanded={open} aria-label={open ? 'Close contact options' : 'Open contact options'} onClick={() => setOpen((v) => !v)}>
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}
