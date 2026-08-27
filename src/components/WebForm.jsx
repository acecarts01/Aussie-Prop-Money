'use client'

import { useRef, useState } from 'react'
import { FORMS } from '@/config/site'

/**
 * Web3Forms — the exact CORS-safe method: FormData body, Accept-only header,
 * no action/method/redirect field. See CLAUDE.md + webforge forms reference.
 */
export default function WebForm({ subject, fromName, thankYouHref, fields, submitLabel = 'Send' }) {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle') // idle | sending | error
  const [error, setError] = useState('')

  const keyPending = !FORMS.web3formsKey || FORMS.web3formsKey.startsWith('YOUR-') || FORMS.web3formsKey === ''

  async function onSubmit(e) {
    e.preventDefault()
    if (keyPending) {
      window.location.href = thankYouHref
      return
    }
    setStatus('sending')
    setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(formRef.current),
      })
      const data = await res.json()
      if (res.status === 200 && data.success) {
        window.location.href = thankYouHref
      } else {
        throw new Error(data.message || 'Submission failed')
      }
    } catch (err) {
      setStatus('error')
      setError('Something went wrong sending that — please try again, or reach us directly by email.')
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      <input type="hidden" name="access_key" value={FORMS.web3formsKey} />
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="from_name" value={fromName} />
      <input type="text" name="botcheck" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

      {fields}

      <div className="form-status" aria-live="polite">
        {status === 'error' && <p className="error">{error}</p>}
        {keyPending && <p style={{ color: 'var(--ink-faint)', fontSize: '0.85rem' }}>This form isn&rsquo;t connected yet — you&rsquo;ll be taken straight to the confirmation page. Use chat/email in the meantime for anything urgent.</p>}
      </div>

      <button type="submit" className="btn btn-accent" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : submitLabel}
      </button>
    </form>
  )
}
