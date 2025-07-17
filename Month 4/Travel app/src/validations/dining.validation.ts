import { z } from 'zod';
const mealTypes = z.enum(['breakfast', 'lunch', 'dinner', 'snack']);

const dateString = z.string().refine(
  (val) => !isNaN(Date.parse(val)),
  { message: "Invalid date format (expected ISO or YYYY-MM-DD)" }
);

const diningSchema = z.record(z.boolean(), {
  invalid_type_error: "dining must be an object with boolean values",
});

const locationSchema = z.object({
  name: z.string().min(1, "Location name is required"),
  country: z.string().optional(),
  region: z.string().optional(),
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string().optional(),
}); 

const createDiningValidation = z.object({
  body: z.object({
    restaurant_name: z.string().min(1, "Restaurant name is required"),
    cuisine_type: z.string().min(1, "Cuisine type is required"),
    meal_type: mealTypes,
    cost: z.number().min(0, "Cost must be non-negative"),
    rating: z.number().min(0).max(5, "Rating must be between 0 and 5"),
    review: z.string().optional(),
    dishes_tried: diningSchema.optional(),
    location: locationSchema.optional(), 
    notes: z.string().optional(),
    visit_date: dateString
  }),
});

const updateDiningValidation = z.object({
  body: z.object({
    restaurant_name: z.string().min(1, "Restaurant name is required").optional(),
    cuisine_type: z.string().min(1, "Cuisine type is required").optional(),
    meal_type: mealTypes.optional(),
    cost: z.number().min(0, "Cost must be non-negative").optional(),
    rating: z.number().min(0).max(5, "Rating must be between 0 and 5").optional(),
    review: z.string().optional(),
    dishes_tried: diningSchema.optional(),
    notes: z.string().optional(),
    location: locationSchema.optional(),
    visit_date: dateString.optional(),
  }),
});

export const DiningValidations = {
  createDiningValidation,
  updateDiningValidation,
};