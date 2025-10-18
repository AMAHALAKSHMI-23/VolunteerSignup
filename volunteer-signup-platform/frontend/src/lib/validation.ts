import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['admin', 'volunteer'])
})
export const eventSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  location: z.string().min(3),
  date: z.string(),
  capacity: z.number().min(1)
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})
