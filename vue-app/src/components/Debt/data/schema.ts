import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  status: z.number(),
  invoice: z.string(),
  customer_name: z.string().min(2).max(50),
  due_date: z.date(),
  amount: z.string(),
  document_url: z.string().url()
})

export type Task = z.infer<typeof taskSchema>