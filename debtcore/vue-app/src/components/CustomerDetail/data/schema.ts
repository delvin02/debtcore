import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  invoice: z.string(),
  invoice_date: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
  due_date: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
  term: z.number(),
  overdue: z.number(),
  amount: z.string(),
  document_url: z.string(),
  status: z.number(),
  editable: z.boolean()
})

export type Task = z.infer<typeof taskSchema>