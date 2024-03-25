import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  status: z.string(),
  invoice: z.string(),
  companyName: z.string().min(2).max(50),
  due_date: z.string().pipe( z.coerce.date() )
})

export type Task = z.infer<typeof taskSchema>