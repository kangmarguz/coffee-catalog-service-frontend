import { z } from "zod";

export const guestCheckoutSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  address: z.string().trim().min(8, "Please enter a complete delivery address."),
});
