import { ContactSchema } from './validation.ts'

Deno.test('contact accepts trimmed visitor input and rejects invalid input', () => {
  const valid = ContactSchema.safeParse({ id: crypto.randomUUID(), name: ' Visitor ', email: 'visitor@example.test', message: ' Enquiry ' })
  if (!valid.success || valid.data.name !== 'Visitor' || valid.data.message !== 'Enquiry') throw new Error('Valid contact rejected')
  if (ContactSchema.safeParse({ id: 'bad', name: '', email: 'invalid', message: '' }).success) throw new Error('Invalid contact accepted')
})