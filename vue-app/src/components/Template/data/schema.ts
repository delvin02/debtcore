import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(50),
  type: z.string(),
  status: z.string(),
  message_delivered: z.number(),
  message_read: z.number(),
  due_date: z.string().pipe( z.coerce.date() ),
})


export const languageSchema = z.object({
  value: z.string(),
  label: z.string()
})

export type Task = z.infer<typeof taskSchema>
export type Language = z.infer<typeof languageSchema>