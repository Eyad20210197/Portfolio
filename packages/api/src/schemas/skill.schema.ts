import { z } from 'zod';

export const createSkillSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    category: z.string().min(1, 'Category is required'),
    level: z.string().nullable().optional(),
    is_visible: z.boolean().default(true).optional(),
  }),
});

export const updateSkillSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Skill ID is required'),
  }),
  body: z.object({
    name: z.string().min(1, 'Name is required').optional(),
    category: z.string().min(1, 'Category is required').optional(),
    level: z.string().nullable().optional(),
    is_visible: z.boolean().optional(),
  }),
});

export const getSkillByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Skill ID is required'),
  }),
});
