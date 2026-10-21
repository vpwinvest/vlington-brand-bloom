export function eventRecord(type: 'email.bounced' | 'email.complaint' | 'email.unsubscribed') {
  if (type === 'email.bounced') return { reason: 'bounce', status: 'bounced', message: 'Permanent bounce — email address is invalid or rejected' }
  if (type === 'email.complaint') return { reason: 'complaint', status: 'complained', message: 'Spam complaint — recipient marked email as spam' }
  return { reason: 'unsubscribe', status: 'suppressed', message: 'Recipient unsubscribed' }
}