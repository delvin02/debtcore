import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
	id: z.number(),
	name: z.string(),
	whatsapp_phone_number: z.string(),
	email: z.string().optional(),
	country_name: z.string(),
	outstanding_debts: z.number()
})

export type Task = z.infer<typeof taskSchema>
