import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  invoice: z.string(),
  customer_name: z.string().min(2).max(50),
  invoice_date: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return new Date(arg);
    }
    return arg;
  }, z.date()),  
  amount: z.string(),
  document_url: z.string().url(),
  status: z.number()
})

export type Task = z.infer<typeof taskSchema>