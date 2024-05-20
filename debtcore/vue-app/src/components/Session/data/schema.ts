import { z } from 'zod'
import { parseISO } from 'date-fns';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  invoice: z.string(),
  company_name: z.string(),
  customer_name: z.string().min(2).max(50),
  event_display: z.string(),
  scheduled_date: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      return new Date(arg);
    }
    return arg;
  }, z.date()),
  completed_date: z.string().nullable(),
  status: z.string(),
  additional_info: z.string(),
  change_info: z.string().nullable(),
  editable: z.boolean()
})

export type Task = z.infer<typeof taskSchema>