import { z } from "zod";

const optionalText = z.string().trim().optional().or(z.literal(""));

export const roastLevels = ["light", "medium", "medium-dark", "dark"];

export const coffeeFormSchema = z.object({
  name: z.string().trim().min(1, "Coffee name is required."),
  origin: z.string().trim().min(1, "Origin is required."),
  description: z.string().trim().min(1, "Description is required."),
  roastLevel: z.enum(roastLevels, {
    message: "Choose a valid roast level.",
  }),
  category: z.string().trim().min(1, "Category is required."),
  price: z.preprocess(
    (value) => (value === "" ? null : value),
    z.coerce
      .number({
        invalid_type_error: "Price must be a number.",
      })
      .min(0, "Price cannot be negative.")
      .nullable()
  ),
  imageUrl: optionalText.refine(
    (value) => !value || z.string().url().safeParse(value).success,
    "Enter a valid image URL."
  ),
  notes: optionalText,
  isAvailable: z.boolean(),
});

export const coffeeFormDefaultValues = {
  name: "",
  description: "",
  origin: "",
  roastLevel: "medium",
  price: "",
  imageUrl: "",
  notes: "",
  category: "Signature",
  isAvailable: true,
};

export function toCoffeeFormValues(initialValues) {
  return {
    ...coffeeFormDefaultValues,
    ...initialValues,
    price:
      initialValues?.price === null || initialValues?.price === undefined
        ? ""
        : String(initialValues.price),
  };
}
