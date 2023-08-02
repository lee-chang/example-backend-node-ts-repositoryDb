import  z  from "zod";

export const registerSchema = z.object({
  userName: z
    .string({
      required_error: "username is required",
    })
    .min(3, {
      message: "username must be at least 3 characters",
    }),
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, {
      message: "password must be at least 6 characters",
    })
    .regex(/[A-Z]/, {
      message: "password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "password must contain at least one number",
    }),

  email: z
    .string({
      required_error: "email is required",
    })
    .email(),
});

export const loginSchema = z.object({
  password: z
    .string({
      required_error: "password is required",
    })
    .min(6, {
      message: "password must be at least 6 characters",
    })
    .regex(/[A-Z]/, {
      message: "password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, {
      message: "password must contain at least one number",
    }),

  email: z
    .string({
      required_error: "email is required",
    })
    .email(),
});
