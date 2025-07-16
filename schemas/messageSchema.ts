import z from "zod";

export const messagesSchema = z.object({
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(500, { message: "Message must be at most 500 characters long" }),
});
