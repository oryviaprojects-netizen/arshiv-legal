import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Phone number must be of 10 digits").regex(/^[0-9]+$/, "Only numbers allowed"),
  query: z.string().min(10, "Please describe your case"),
});
