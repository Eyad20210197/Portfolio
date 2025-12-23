import { z } from "zod";

export const createTechnologySchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    category: z.string().min(1, "Category is required"),
    icon_url: z
      .string()
      .min(1, "Icon name cannot be empty")
      .nullable()
      .optional(),
  }),
});

export const updateTechnologySchema = z.object({
  params: z.object({
    id: z.string().min(1, "Technology ID is required"),
  }),
  body: z.object({
    name: z.string().min(1, "Name is required").optional(),
    category: z.string().min(1, "Category is required").optional(),
    icon_url: z
      .string()
      .min(1, "Icon name cannot be empty")
      .nullable()
      .optional(),
  }),
});

export const getTechnologyByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, "Technology ID is required"),
  }),
});
