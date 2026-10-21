import { createEmailWebhookHandler } from 'npm:@lovable.dev/email-js@0.3.1'
import { createClient } from 'npm:@supabase/supabase-js@2'
import { eventRecord } from './event-record.ts'

const apiKey = Deno.env.get('LOVABLE_API_KEY')
const url = Deno.env.get('SUPABASE_URL')
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
if (!apiKey || !url || !serviceKey) throw new Error('Missing email events configuration')
const db = createClient(url, serviceKey)

async function recordEvent(event: {
  event_id: string,
  data: { recipient: string; message_id?: string },
}, type: 'email.bounced' | 'email.complaint' | 'email.unsubscribed') {
  // Deterministic audit ID makes event retries idempotent without a new table.
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(event.event_id))
  const hex = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('')
  const id = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`
  const check = (error: { code: string; message: string } | null) => {
    if (!error) return
    console.error('Email event audit failed', { code: error.code, message: error.message, event_id: event.event_id })
    throw new Error('Unable to record email event')
  }
  const { data: existing, error: lookupError } = await db.from('email_send_log').select('id').eq('id', id).maybeSingle()
  check(lookupError)
  if (existing) return
  const email = event.data.recipient.toLowerCase()
  const record = eventRecord(type)
  const { error: suppressError } = await db.from('suppressed_emails').upsert({
    email, reason: record.reason, metadata: null,
  }, { onConflict: 'email' })
  check(suppressError)
  if (type === 'email.unsubscribed') {
    const { error } = await db.from('email_unsubscribe_tokens')
      .update({ used_at: new Date().toISOString() }).eq('email', email).is('used_at', null)
    check(error)
  }
  const { error } = await db.from('email_send_log').upsert({
    id, message_id: event.data.message_id ?? null, template_name: 'system', recipient_email: email,
    status: record.status, error_message: record.message, metadata: null,
  }, { onConflict: 'id', ignoreDuplicates: true })
  check(error)
}

const handler = createEmailWebhookHandler({
  apiKey,
  on: {
    'email.bounced': async (event) => {
      await recordEvent(event, 'email.bounced')
    },
    'email.complaint': async (event) => {
      await recordEvent(event, 'email.complaint')
    },
    'email.unsubscribed': async (event) => {
      await recordEvent(event, 'email.unsubscribed')
    },
  },
})

Deno.serve((req) => handler(req))
