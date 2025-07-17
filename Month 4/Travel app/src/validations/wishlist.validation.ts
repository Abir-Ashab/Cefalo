import { z } from 'zod';
const groupingTypes = z.enum(['region', 'theme', 'budget', 'season']);

const createWishlistValidation = z.object({
  body: z.object({
    user_id: z.string().uuid("Invalid user ID"),
    name: z.string().min(1, "Wishlist name is required"),
    description: z.string().optional(),
    grouping_type: groupingTypes,
    is_public: z.boolean().optional().default(false),
  }),
});

const updateWishlistValidation = z.object({
  body: z.object({
    user_id: z.string().uuid("Invalid user ID").optional(),
    name: z.string().min(1, "Wishlist name is required").optional(),
    description: z.string().optional(),
    grouping_type: groupingTypes.optional(),
    is_public: z.boolean().optional(),
  }),
});

const createWishlistItemValidation = z.object({
  body: z.object({
    location_id: z.string().optional(),
    user_id: z.string().uuid("Invalid user ID"),
    wishlist_id: z.string().uuid("Invalid wishlist ID"),
    location: z.object({
      name: z.string().min(1, "Location name is required"),
      country: z.string().min(1, "Country is required"),
      region: z.string().min(1, "Region is required"),
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
      timezone: z.string().optional(),
    }).optional(),
    notes: z.string().optional(),
    estimated_budget: z.number().min(0, "Budget must be non-negative").optional(),
    priority_level: z.number().int().min(1).max(5, "Priority level must be between 1 and 5"),
    preferred_start_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Start date must be in YYYY-MM-DD format").optional(),
    preferred_end_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "End date must be in YYYY-MM-DD format").optional(),

  }).refine((data) => data.location_id || data.location, {
    message: "Either location_id or location must be provided",
    path: ["location"], // Adjust path as needed
  })
});


const updateWishlistItemValidation = z.object({
  body: z.object({
    notes: z.string().optional(),
    estimated_budget: z.number().min(0, "Budget must be non-negative").optional(),
    priority_level: z.number().int().min(1).max(5, "Priority level must be between 1 and 5").optional(),
    preferred_start_date: z.string().datetime("Invalid start date format").optional(),
    preferred_end_date: z.string().datetime("Invalid end date format").optional(),
  }),
});

const wishlistFiltersValidation = z.object({
  query: z.object({
    grouping_type: groupingTypes.optional(),
    is_public: z.boolean().optional(),
    search: z.string().optional(),
    limit: z.number().int().positive().max(100).optional().default(10),
    offset: z.number().int().min(0).optional().default(0),
  }),
});

const addWishlistItemValidation = z.object({
  body: z.object({
    location_id: z.string().optional(),
    location: z.object({
      name: z.string().min(1, "Location name is required"),
      country: z.string().min(1, "Country is required"),
      region: z.string().min(1, "Region is required"),
      latitude: z.number().min(-90).max(90),
      longitude: z.number().min(-180).max(180),
      timezone: z.string().optional(),
    }).optional(),
    notes: z.string().optional(),
    estimated_budget: z.number().min(0, "Budget must be non-negative").optional(),
    priority_level: z.number().int().min(1).max(5, "Priority level must be between 1 and 5"),
    preferred_start_date: z.string().datetime("Invalid start date format").optional(),
    preferred_end_date: z.string().datetime("Invalid end date format").optional(),
  }),
});

export const WishlistValidations = {
  createWishlistValidation,
  updateWishlistValidation,
  createWishlistItemValidation,
  updateWishlistItemValidation,
  addWishlistItemValidation,
  wishlistFiltersValidation,
};
