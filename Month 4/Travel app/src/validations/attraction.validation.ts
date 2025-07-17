import { z } from 'zod';
const attractionTypes = z.enum(['museum', 'monument', 'park', 'beach', 'temple', 'market', 'viewpoint', 'adventure']);
const bestTimeToVisit = z.enum(['morning', 'afternoon', 'evening', 'night']);

const dateString = z.string().refine(
  (val) => !isNaN(Date.parse(val)),
  { message: "Invalid date format (expected ISO or YYYY-MM-DD)" }
);

const locationSchema = z.object({
  name: z.string().min(1, "Location name is required"),
  country: z.string().optional(),
  region: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string().optional(),
});

const createAttractionValidation = z.object({
  body: z.object({
    attraction_name: z.string().min(1, "Attraction name is required"),
    attraction_type: attractionTypes,
    entry_cost: z.number().min(0, "Entry cost must be non-negative"),
    rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
    review: z.string().optional(),
    time_spent_hours: z.number().min(0, "Time spent must be non-negative"),
    best_time_to_visit: bestTimeToVisit,
    recommended: z.boolean().optional().default(false),
    tips: z.string().optional(),
    notes: z.string().optional(),
    visit_date: dateString,
    location: locationSchema.optional(), 
  }),
});

const updateAttractionValidation = z.object({
  body: z.object({
    attraction_name: z.string().min(1, "Attraction name is required").optional(),
    attraction_type: attractionTypes.optional(),
    entry_cost: z.number().min(0, "Entry cost must be non-negative").optional(),
    rating: z.number().min(0).max(5, "Rating must be between 0 and 5").optional(),
    review: z.string().optional(),
    time_spent_hours: z.number().min(0, "Time spent must be non-negative").optional(),
    best_time_to_visit: bestTimeToVisit.optional(),
    recommended: z.boolean().optional(),
    tips: z.string().optional(),
    notes: z.string().optional(),
    location: locationSchema.optional(),
    visit_date: dateString.optional(),
  }),
});

export const AttractionValidations = {
  createAttractionValidation,
  updateAttractionValidation,
};