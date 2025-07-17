import { z } from "zod";
const createTransportValidation = z.object({
  body: z.object({
    transport_type: z.string().min(1, "Transport type is required"),
    provider: z.string().min(1, "Provider is required"),
    cost: z.number().min(0, "Cost must be non-negative"),
    notes: z.string().optional(),
  }),
});

const updateTransportValidation = z.object({
  body: z.object({
    transport_type: z.string().min(1, "Transport type is required").optional(),
    provider: z.string().min(1, "Provider is required").optional(),
    cost: z.number().min(0, "Cost must be non-negative").optional(),
    notes: z.string().optional(),
  }),
});

export const TransportValidations = {
  createTransportValidation,
  updateTransportValidation,
};
