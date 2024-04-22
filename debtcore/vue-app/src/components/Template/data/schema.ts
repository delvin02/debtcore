import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  template_id: z.string(),
  name: z.string().min(2).max(50),
  language: z.string(),
  category: z.string(),
  status: z.string(),
  message_delivered: z.number(),
  message_read: z.number(),
  last_updated_date: z.string().pipe( z.coerce.date() ),
})


export type Task = z.infer<typeof taskSchema>
