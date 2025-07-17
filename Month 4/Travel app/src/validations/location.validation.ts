import { z } from "zod";

const createLocationValidation = z.object({
  body: z.object({
    name: z.string().min(1, "Location name is required"),
    country: z.string().min(1, "Country is required"),
    region: z.string().min(1, "Region is required"),
    latitude: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
    longitude: z.number().min(-180).max(180, "Longitude must be between -180 and 180"),
    timezone: z.string().min(1, "Timezone is required"),
  }),
});

const updateLocationValidation = z.object({
  body: z.object({
    name: z.string().min(1, "Location name is required").optional(),
    country: z.string().min(1, "Country is required").optional(),
    region: z.string().min(1, "Region is required").optional(),
    latitude: z.number().min(-90).max(90, "Latitude must be between -90 and 90").optional(),
    longitude: z.number().min(-180).max(180, "Longitude must be between -180 and 180").optional(),
    timezone: z.string().min(1, "Timezone is required").optional(),
  }),
});

export const LocationValidations = {
  createLocationValidation,
  updateLocationValidation,
};