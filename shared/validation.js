import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
})

export const postSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(120, 'Title too long'),
  category: z.enum(['Workshops', 'Career', 'Clubs', 'Sports']).optional(),
  date: z.string().refine((d) => !isNaN(Date.parse(d)), 'Invalid date'),
  location: z.string().optional(),
  description: z.string().trim().min(20, 'Description must be at least 20 characters'),
  image: z.string().url().optional().or(z.literal('')),
  rsvpLimit: z.preprocess(
    (v) => (v === '' || v === null ? undefined : v),
    z.coerce.number().int().min(1).optional()
  ),
  status: z.enum(['published', 'draft']).default('draft'),
})
