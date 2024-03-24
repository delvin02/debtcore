import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(50),
  status: z.string(),
  label: z.string(),
  type: z.string(),
  message_delivered: z.number(),
  message_read: z.number(),
  last_updated: z.date().min(new Date("1900-01-01"), { message: "Too old" })
})


export const languageSchema = z.object({
  value: z.string(),
  label: z.string()
})

export type Task = z.infer<typeof taskSchema>
export type Language = z.infer<typeof languageSchema>