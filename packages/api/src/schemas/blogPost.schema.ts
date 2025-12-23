import { z } from 'zod';

export const createBlogPostSchema = z.object({
  body: z.object({
    slug: z.string().min(1, 'Slug is required'),
    title: z.string().min(1, 'Title is required'),
    summary: z.string().min(1, 'Summary is required'),
    content: z.string().min(1, 'Content is required'),
    is_published: z.boolean().default(false).optional(),
    published_at: z.string().datetime().nullable().optional(), // ISO string date
  }),
});

export const updateBlogPostSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Blog Post ID is required'),
  }),
  body: z.object({
    slug: z.string().min(1, 'Slug is required').optional(),
    title: z.string().min(1, 'Title is required').optional(),
    summary: z.string().min(1, 'Summary is required').optional(),
    content: z.string().min(1, 'Content is required').optional(),
    is_published: z.boolean().optional(),
    published_at: z.string().datetime().nullable().optional(),
  }),
});

export const getBlogPostBySlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Blog Post slug is required'),
  }),
});

export const getBlogPostByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Blog Post ID is required'),
  }),
});
