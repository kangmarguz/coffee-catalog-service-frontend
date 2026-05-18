import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  coffeeFormDefaultValues,
  coffeeFormSchema,
  roastLevels,
  toCoffeeFormValues,
} from "../utils/coffeeValidation";

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

  function errorMessage(name) {
    return errors[name] ? (
      <p className="text-xs font-medium text-rose-600">
        {errors[name].message}
      </p>
    ) : null;
  }

  const inputClass =
    "h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 text-sm outline-none transition focus:border-stone-400 focus:bg-white";
  const textareaClass =
    "w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-stone-400 focus:bg-white";

  return (
    <form
      className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_25px_80px_rgba(28,25,23,0.08)] backdrop-blur-xl sm:p-8"
      noValidate
      onSubmit={handleSubmit(submitForm)}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Coffee name</span>
          <input
            aria-invalid={Boolean(errors.name)}
            className={inputClass}
            {...register("name")}
          />
          {errorMessage("name")}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Origin</span>
          <input
            aria-invalid={Boolean(errors.origin)}
            className={inputClass}
            {...register("origin")}
          />
          {errorMessage("origin")}
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">Description</span>
          <textarea
            aria-invalid={Boolean(errors.description)}
            className={`min-h-[7.5rem] ${textareaClass}`}
            {...register("description")}
          />
          {errorMessage("description")}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Roast level</span>
          <select
            aria-invalid={Boolean(errors.roastLevel)}
            className={inputClass}
            {...register("roastLevel")}
          >
            {roastLevels.map((roastLevel) => (
              <option key={roastLevel} value={roastLevel}>
                {roastLevel}
              </option>
            ))}
          </select>
          {errorMessage("roastLevel")}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Category</span>
          <input
            aria-invalid={Boolean(errors.category)}
            className={inputClass}
            {...register("category")}
          />
          {errorMessage("category")}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Price</span>
          <input
            aria-invalid={Boolean(errors.price)}
            className={inputClass}
            min="0"
            step="0.01"
            type="number"
            {...register("price")}
          />
          {errorMessage("price")}
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Image URL</span>
          <input
            aria-invalid={Boolean(errors.imageUrl)}
            className={inputClass}
            type="url"
            {...register("imageUrl")}
          />
          {errorMessage("imageUrl")}
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">Tasting notes</span>
          <textarea
            aria-invalid={Boolean(errors.notes)}
            className={`min-h-[7rem] ${textareaClass}`}
            placeholder="Chocolate, citrus, jasmine..."
            {...register("notes")}
          />
          {errorMessage("notes")}
        </label>
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
        <button
          className="inline-flex min-w-40 items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700 disabled:cursor-not-allowed disabled:bg-stone-400"
          disabled={submitting}
          type="submit"
        >
          {submitting ? "Saving..." : submitLabel}
        </button>
      </div>
    </form>
  );
}

export default CoffeeForm;
