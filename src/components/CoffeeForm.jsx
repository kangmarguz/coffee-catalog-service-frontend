import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  coffeeFormDefaultValues,
  coffeeFormSchema,
  roastLevels,
  toCoffeeFormValues,
} from "../utils/coffeeValidation";
import Button from "./ui/Button";
import FormField from "./ui/FormField";
import Surface from "./ui/Surface";

function CoffeeForm({ initialValues, onSubmit, submitting, submitLabel }) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    defaultValues: coffeeFormDefaultValues,
    resolver: zodResolver(coffeeFormSchema),
  });

  useEffect(() => {
    reset(toCoffeeFormValues(initialValues));
  }, [initialValues, reset]);

  function submitForm(values) {
    onSubmit(values);
  }

  return (
    <Surface
      as="form"
      className="rounded-[2rem] p-6 sm:p-8"
      noValidate
      onSubmit={handleSubmit(submitForm)}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <FormField
          label="Coffee name"
          error={errors.name?.message}
          {...register("name")}
        />

        <FormField
          label="Origin"
          error={errors.origin?.message}
          {...register("origin")}
        />

        <FormField
          as="textarea"
          className="min-h-[7.5rem]"
          wrapperClassName="md:col-span-2"
          label="Description"
          error={errors.description?.message}
          {...register("description")}
        />

        <FormField
          as="select"
          label="Roast level"
          error={errors.roastLevel?.message}
          {...register("roastLevel")}
        >
            {roastLevels.map((roastLevel) => (
              <option key={roastLevel} value={roastLevel}>
                {roastLevel}
              </option>
            ))}
        </FormField>

        <FormField
          label="Category"
          error={errors.category?.message}
          {...register("category")}
        />

        <FormField
          label="Price"
          error={errors.price?.message}
          min="0"
          step="0.01"
          type="number"
          {...register("price")}
        />

        <FormField
          label="Image URL"
          error={errors.imageUrl?.message}
          type="url"
          {...register("imageUrl")}
        />

        <FormField
          as="textarea"
          className="min-h-28"
          wrapperClassName="md:col-span-2"
          label="Tasting notes"
          error={errors.notes?.message}
          placeholder="Chocolate, citrus, jasmine..."
          {...register("notes")}
        />
      </div>

      <label className="mt-5 inline-flex items-center gap-3 rounded-full bg-stone-100 px-4 py-3 text-sm text-stone-700">
        <input
          className="h-4 w-4 rounded border-stone-300"
          type="checkbox"
          {...register("isAvailable")}
        />
        Available for ordering
      </label>

      <div className="mt-8 flex justify-end">
        <Button
          className="min-w-40"
          disabled={submitting}
          type="submit"
        >
          {submitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </Surface>
  );
}

export default CoffeeForm;
