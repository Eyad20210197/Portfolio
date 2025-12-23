import { z } from "zod";

export const createCaseStudySchema = z.object({
  body: z.object({
    projectId: z.string().min(1, "Project ID is required"),
    architecture_overview: z.string().min(1),
    technical_decisions: z.string().min(1),
    challenges: z.string().min(1),
    tradeoffs: z.string().min(1),
    future_improvements: z.string().min(1),
  }),
});


export const updateCaseStudySchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Case Study ID is required'),
  }),
  body: z.object({
    architecture_overview: z.string().min(1, 'Architecture overview is required').optional(),
    technical_decisions: z.string().min(1, 'Technical decisions are required').optional(),
    challenges: z.string().min(1, 'Challenges are required').optional(),
    tradeoffs: z.string().min(1, 'Tradeoffs are required').optional(),
    future_improvements: z.string().min(1, 'Future improvements are required').optional(),
  }),
});

export const getCaseStudyByProjectSlugSchema = z.object({
  params: z.object({
    slug: z.string().min(1, 'Project slug is required'),
  }),
});

export const getCaseStudyByProjectIdSchema = z.object({
  params: z.object({
    projectId: z.string().min(1, 'Project ID is required'),
  }),
});
