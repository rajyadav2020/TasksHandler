
import {z} from 'zod'

export const createTaskSchema = z.object({
  title: z.string().min(1).max(200),
  description : z.string().min(1)
})

export const taskIdSchema = z.object({
  id:z.coerce.number().int().positive()
})

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit : z.coerce.number().int().positive().max(100).default(20)
})

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  completed : z.boolean().optional()
})

export type CreateTask = z.infer<typeof createTaskSchema>;
export type Pagination = z.infer<typeof paginationSchema>;
