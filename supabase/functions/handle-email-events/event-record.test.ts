import { eventRecord } from './event-record.ts'

Deno.test('bounce preserves legacy reason and audit status', () => {
  const record = eventRecord('email.bounced')
  if (record.reason !== 'bounce' || record.status !== 'bounced') throw new Error('Invalid bounce mapping')
})
Deno.test('complaint preserves legacy reason and audit status', () => {
  const record = eventRecord('email.complaint')
  if (record.reason !== 'complaint' || record.status !== 'complained') throw new Error('Invalid complaint mapping')
})
Deno.test('unsubscribe preserves legacy reason and audit status', () => {
  const record = eventRecord('email.unsubscribed')
  if (record.reason !== 'unsubscribe' || record.status !== 'suppressed') throw new Error('Invalid unsubscribe mapping')
})