import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  name: z.string().min(2).max(50),
  companyName: z.string().min(2).max(50),
  phoneNumber: z.string(),
  email: z.string(),
  outstanding: z.string()
})

export type Task = z.infer<typeof taskSchema>