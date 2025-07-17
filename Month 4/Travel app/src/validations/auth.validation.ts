import { z } from "zod";
import { USER_Role, USER_STATUS } from "../interfaces/user.interface";

const createUserValidation = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    role: z.nativeEnum(USER_Role).default(USER_Role.EXPLORER),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    status: z.nativeEnum(USER_STATUS).default(USER_STATUS.ACTIVE),
    passwordChangedAt: z.date().optional(),
  }),
});

const loginValidation = z.object({
  body: z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  }),
});

export const AuthValidations = {
  createUserValidation,
  loginValidation,
};
