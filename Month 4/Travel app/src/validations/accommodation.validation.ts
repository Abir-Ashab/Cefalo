import { z } from 'zod';

const accommodationTypes = z.enum(['hotel', 'hostel', 'airbnb', 'guesthouse']);

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

const amenitiesSchema = z.record(z.boolean(), {
  invalid_type_error: "Amenities must be an object with boolean values",
});

const createAccommodationValidation = z.object({
  body: z.object({
    accommodation_type: accommodationTypes,
    name: z.string().min(1, "Accommodation name is required"),
    cost_per_night: z.number().min(0, "Cost per night must be non-negative"),
    rating: z.number().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5"),
    review: z.string().optional(),
    notes: z.string().optional(),
    amenities: amenitiesSchema.optional(),
    location: locationSchema.optional(), 
    check_in_date: dateString,
    check_out_date: dateString,
  }),
});

const updateAccommodationValidation = z.object({
  body: z.object({
    accommodation_type: accommodationTypes.optional(),
    name: z.string().min(1, "Accommodation name is required").optional(),
    cost_per_night: z.number().min(0, "Cost per night must be non-negative").optional(),
    rating: z.number().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5").optional(),
    review: z.string().optional(),
    notes: z.string().optional(),
    location: locationSchema.optional(),
    amenities: amenitiesSchema.optional(),
    check_in_date: dateString.optional(),
    check_out_date: dateString.optional(),
  }),
});

export const AccommodationValidations = {
  createAccommodationValidation,
  updateAccommodationValidation,
};
