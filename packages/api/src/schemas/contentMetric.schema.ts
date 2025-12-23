import { z } from 'zod';

export const getContentMetricsByTypeSchema = z.object({
  params: z.object({
    entityType: z.enum(['PROJECT', 'BLOG'], {
      errorMap: () => ({ message: "Entity type must be 'PROJECT' or 'BLOG'" }),
    }),
  }),
});