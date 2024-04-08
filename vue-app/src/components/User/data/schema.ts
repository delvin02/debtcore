import { z } from 'zod'

// Data table
export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  company_name: z.string().nullable(),
  last_login: z.preprocess((arg) => {
    if (arg instanceof Date) return arg;
    if (typeof arg === 'string') return new Date(arg);
    return arg; // or handle invalid types as needed
  }, z.date()).nullable()
})


export type Task = z.infer<typeof taskSchema>