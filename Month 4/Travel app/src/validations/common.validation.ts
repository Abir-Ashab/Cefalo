import { z } from 'zod';
const paginationValidation = z.object({
  query: z.object({
    page: z.number().int().positive().optional().default(1),
    limit: z.number().int().positive().max(100).optional().default(10),
    sort_by: z.string().optional(),
    sort_order: z.enum(['asc', 'desc']).optional().default('desc'),
  }),
});

const searchValidation = z.object({
  query: z.object({
    query: z.string().min(1, "Search query is required"),
    filters: z.record(z.any()).optional(),
    page: z.number().int().positive().optional().default(1),
    limit: z.number().int().positive().max(100).optional().default(10),
    sort_by: z.string().optional(),
    sort_order: z.enum(['asc', 'desc']).optional().default('desc'),
  }),
});

export const CommonValidations = {
  paginationValidation,
  searchValidation,
};