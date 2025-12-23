import { z } from "zod";

export const createSiteConfigSchema = z.object({
  body: z.object({
    key: z.string().min(1),
    value: z.string().min(1),
  }),
});

export const updateSiteConfigSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    key: z.string().min(1).optional(),
    value: z.string().min(1).optional(),
  }),
});

export const getSiteConfigByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export const getSiteConfigByKeySchema = z.object({
  params: z.object({
    key: z.string().min(1),
  }),
});
