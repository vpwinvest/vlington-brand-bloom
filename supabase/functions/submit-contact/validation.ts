import { z } from 'npm:zod@3.25.76'

export const ContactSchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(1).max(255),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(10000),
})