import { z } from 'zod'
import { parseISO } from 'date-fns';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  verified_name: z.string(),
  quality_rating: z.string(),
  platform_type: z.string(),
  last_onboarded_time: z.preprocess((arg) => {
    if (typeof arg === 'string') {
      try {
        return parseISO(arg);  // More robust parsing for ISO strings
      } catch {
        return new Date(arg);  // Fallback to native Date parsing
      }
    }
    return arg;
  }, z.date()),
   display_phone_number: z.string(),
   is_default_phone: z.boolean()
})

export type Task = z.infer<typeof taskSchema>
