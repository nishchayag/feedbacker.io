import z from "zod";

export const signinSchema = z.object({
  identifier: z
    .string()
    .min(4, "Identifier must be at least 4 characters long")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || /^[a-z0-9_]{3,20}$/.test(val),
      {
        message: "Must be a valid email or username",
      }
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .refine(
      (val) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          val
        ),
      {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }
    ),
});
