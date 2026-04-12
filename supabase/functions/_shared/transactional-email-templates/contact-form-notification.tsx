import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "VLINGTON Properties"

interface ContactFormNotificationProps {
  name?: string
  email?: string
  message?: string
}

const ContactFormNotificationEmail = ({ name, email, message }: ContactFormNotificationProps) => (
  <Html lang="pt" dir="ltr">
    <Head />
    <Preview>Nova mensagem de contacto de {name || 'visitante'}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nova Mensagem de Contacto</Heading>
        <Text style={text}>Recebeu uma nova mensagem através do formulário de contacto do website.</Text>
        <Hr style={hr} />
        <Text style={label}>Nome</Text>
        <Text style={value}>{name || '—'}</Text>
        <Text style={label}>Email</Text>
        <Text style={value}>{email || '—'}</Text>
        <Text style={label}>Mensagem</Text>
        <Text style={value}>{message || '—'}</Text>
        <Hr style={hr} />
        <Text style={footer}>Este email foi enviado automaticamente por {SITE_NAME}.</Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactFormNotificationEmail,
  subject: (data: Record<string, any>) => `Nova mensagem de contacto de ${data?.name || 'visitante'}`,
  to: 'geral@vlington.com',
  displayName: 'Contact form notification',
  previewData: { name: 'João Silva', email: 'joao@exemplo.com', message: 'Gostaria de saber mais sobre os vossos projetos.' },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: "'Urbanist', Arial, sans-serif" }
const container = { padding: '30px 25px', maxWidth: '560px', margin: '0 auto' }
const h1 = { fontSize: '22px', fontWeight: '700' as const, color: '#424040', margin: '0 0 20px' }
const text = { fontSize: '14px', color: '#55575d', lineHeight: '1.6', margin: '0 0 16px' }
const label = { fontSize: '11px', color: '#bcac6f', textTransform: 'uppercase' as const, letterSpacing: '2px', margin: '0 0 4px', fontWeight: '600' as const }
const value = { fontSize: '14px', color: '#424040', lineHeight: '1.5', margin: '0 0 16px' }
const hr = { borderColor: '#e5e5e5', margin: '20px 0' }
const footer = { fontSize: '12px', color: '#999999', margin: '20px 0 0' }
