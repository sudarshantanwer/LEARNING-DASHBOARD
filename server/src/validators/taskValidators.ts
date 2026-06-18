import { z } from "zod";

export const taskPrioritySchema = z.enum(["LOW", "MEDIUM", "HIGH"]);
export const taskStatusSchema = z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]);

export const createTaskBodySchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional().default(""),
  category: z.string().optional().default("General"),
  priority: taskPrioritySchema,
  status: taskStatusSchema.optional().default("TODO"),
  ownerId: z.string().min(1, "Owner is required"),
  dueDate: z
    .string()
    .min(1, "Due date is required")
    .refine((s) => !Number.isNaN(Date.parse(s)), "dueDate must be a valid ISO date string")
});

export const updateTaskBodySchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  category: z.string().min(1).optional(),
  priority: taskPrioritySchema.optional(),
  status: taskStatusSchema.optional(),
  ownerId: z.string().min(1).optional(),
  dueDate: z
    .string()
    .refine((s) => !Number.isNaN(Date.parse(s)), "dueDate must be a valid ISO date string")
    .optional()
});

export const patchTaskStatusBodySchema = z.object({
  status: taskStatusSchema
});

export type CreateTaskBody = z.infer<typeof createTaskBodySchema>;
export type UpdateTaskBody = z.infer<typeof updateTaskBodySchema>;
export type PatchTaskStatusBody = z.infer<typeof patchTaskStatusBodySchema>;
