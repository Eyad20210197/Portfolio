import { z } from 'zod';

export const createProjectSchema = z.object({
  body: z.object({
    slug: z.string().min(1, 'Slug is required'),
    title: z.string().min(1, 'Title is required'),
    short_description: z.string().min(1, 'Short description is required'),
    problem_statement: z.string().min(1, 'Problem statement is required'),
    solution_summary: z.string().min(1, 'Solution summary is required'),
    outcome: z.string().min(1, 'Outcome is required'),
    is_featured: z.boolean().default(false).optional(),
    is_visible: z.boolean().default(true).optional(),
    github_url: z.string().url('Invalid GitHub URL format').nullable().optional(),
    live_demo_url: z.string().url('Invalid Live Demo URL format').nullable().optional(),
    technology_ids: z.array(z.string()).optional(), // For ProjectTechnology relationship
  }),
});

export const updateProjectSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Project ID is required'),
  }),
  body: z.object({
    slug: z.string().min(1, 'Slug is required').optional(),
    title: z.string().min(1, 'Title is required').optional(),
    short_description: z.string().min(1, 'Short description is required').optional(),
    problem_statement: z.string().min(1, 'Problem statement is required').optional(),
    solution_summary: z.string().min(1, 'Solution summary is required').optional(),
    outcome: z.string().min(1, 'Outcome is required').optional(),
    is_featured: z.boolean().optional(),
    is_visible: z.boolean().optional(),
    github_url: z.string().url('Invalid GitHub URL format').nullable().optional(),
    live_demo_url: z.string().url('Invalid Live Demo URL format').nullable().optional(),
    technology_ids: z.array(z.string()).optional(), // For ProjectTechnology relationship
  }),
});

export const getProjectBySlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Project slug is required'),
  }),
});

export const getProjectByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Project ID is required'),
  }),
});
