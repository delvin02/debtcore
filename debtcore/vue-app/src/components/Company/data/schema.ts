import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
	id: z.number(),
	name: z.string().max(50)
})

export type Task = z.infer<typeof taskSchema>
