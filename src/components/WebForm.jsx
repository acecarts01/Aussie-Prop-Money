'use client'

import { useRef, useState } from 'react'
import { FORMS, SITE } from '@/config/site'

/**
 * Posts to the site's own API route (/api/send). Mail delivery is configured
 * entirely through Vercel environment variables — see src/app/api/send/route.js.
 * `kind` selects the inbox and email template: 'order' | 'contact' | 'wholesale'.
 */
export default function WebForm({ kind = 'contact', thankYouHref, fields, submitLabel = 'Send' }) {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | error
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    const form = formRef.current
    if (!form.reportValidity()) return
    setStatus('sending')
    setError('')
    const data = Object.fromEntries(new FormData(form).entries())
    data.kind = kind
    try {
      const res = await fetch(FORMS.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      const out = await res.json().catch(() => ({}))
      if (res.ok && out.ok) {
        window.location.href = thankYouHref
      } else {
        throw new Error(out.error || 'Submission failed')
      }
    } catch (err) {
      setStatus('error')
      setError(err.message || 'Something went wrong sending that — please try again, or reach us directly.')
    }
  }

  const wa = `https://wa.me/${(SITE.whatsapp || '').replace(/\D/g, '')}`

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      <input type="text" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      {fields}

      <div className="form-status" aria-live="polite">
        {status === 'error' && (
          <p className="error">
            {error} <a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp {SITE.whatsapp}</a>
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-accent" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
    </form>
  )
}
