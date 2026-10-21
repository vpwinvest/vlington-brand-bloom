import { createClient } from 'npm:@supabase/supabase-js@2'
import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { ContactSchema } from './validation.ts'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

const TEMPLATE = 'contact-form-notification'
const RECIPIENT = 'geral@vlington.com'
const json = (data: unknown, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { ...corsHeaders, 'Content-Type': 'application/json' },
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405)
  const url = Deno.env.get('SUPABASE_URL')
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !key) return json({ error: 'Server configuration error' }, 500)
  const db = createClient(url, key)
  try {
    const parsed = ContactSchema.safeParse(await req.json())
    if (!parsed.success) return json({ error: 'Invalid contact information' }, 400)
    const contact = parsed.data
    const { data: existing, error: lookupError } = await db.from('contact_submissions')
      .select('id,name,email,message').eq('id', contact.id).maybeSingle()
    if (lookupError) throw lookupError
    if (existing && (existing.name !== contact.name || existing.email !== contact.email || existing.message !== contact.message)) {
      return json({ error: 'Submission conflict' }, 409)
    }
    if (!existing) {
      // Durable per-address limit, shared across function instances.
      const { count, error: limitError } = await db.from('contact_submissions')
        .select('id', { count: 'exact', head: true }).ilike('email', contact.email)
        .gte('created_at', new Date(Date.now() - 3600000).toISOString())
      if (limitError) throw limitError
      if ((count ?? 0) >= 5) return json({ error: 'Please try again later' }, 429)
      const { error } = await db.from('contact_submissions').insert(contact)
      if (error) throw error
    }
    const { data: logged, error: logLookupError } = await db.from('email_send_log')
      .select('id').eq('message_id', contact.id).eq('status', 'sent').maybeSingle()
    if (logLookupError) throw logLookupError
    if (logged) return json({ success: true, notification: 'sent' })
    const writeLog = async (status: string, errorMessage?: string) => {
      const { error } = await db.from('email_send_log').insert({
        message_id: contact.id, template_name: TEMPLATE, recipient_email: RECIPIENT,
        status, error_message: errorMessage?.slice(0, 1000),
      })
      if (error) console.error('Email audit write failed', { code: error.code, message: error.message })
    }
    try {
      const result = await sendTemplateEmail(TEMPLATE, RECIPIENT, {
        templateData: { name: contact.name, email: contact.email, message: contact.message },
        idempotencyKey: `contact-notify-${contact.id}`,
      })
      await writeLog(result.sent ? 'sent' : 'suppressed')
      return json({ success: true, notification: result.sent ? 'sent' : 'suppressed' })
    } catch (error) {
      await writeLog('failed', error instanceof Error ? error.message : 'Email send failed')
      // The contact is saved even if notification sending fails.
      return json({ success: true, notification: 'failed' })
    }
  } catch {
    return json({ error: 'Unable to save contact' }, 500)
  }
})