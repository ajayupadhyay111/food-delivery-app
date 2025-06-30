import { z } from "zod";

export const userSignUpSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  contact: z.string().min(10, "Contact number must be at least 10 digits"),
});

export type UserSignupState = z.infer<typeof userSignUpSchema>

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type UserLoginState = z.infer<typeof userLoginSchema>