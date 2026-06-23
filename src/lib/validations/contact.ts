import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Please enter your name")
    .max(100, "Name must be 100 characters or less"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email")
    .email("Please enter a valid email address")
    .max(254, "Email must be 254 characters or less"),
  phone: z
    .string()
    .trim()
    .max(30, "Phone must be 30 characters or less"),
  message: z
    .string()
    .trim()
    .min(1, "Please enter a message")
    .max(2000, "Message must be 2000 characters or less"),
});

export type ContactFormData = z.infer<typeof contactSchema>;
