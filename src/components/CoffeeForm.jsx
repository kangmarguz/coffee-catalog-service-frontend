import { useEffect, useState } from "react";

const defaultState = {
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

function CoffeeForm({ initialValues, onSubmit, submitting, submitLabel }) {
  const [formState, setFormState] = useState(defaultState);

  useEffect(() => {
    if (initialValues) {
      setFormState({
        ...defaultState,
        ...initialValues,
        price:
          initialValues.price === null || initialValues.price === undefined
            ? ""
            : String(initialValues.price),
      });
    }
  }, [initialValues]);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit({
      ...formState,
      price: formState.price === "" ? null : Number(formState.price),
    });
  }

  return (
    <form
      className="rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_25px_80px_rgba(28,25,23,0.08)] backdrop-blur-xl sm:p-8"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Coffee name</span>
          <input
            className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 text-sm outline-none transition focus:border-stone-400 focus:bg-white"
            name="name"
            value={formState.name}
            onChange={handleChange}
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Origin</span>
          <input
            className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 text-sm outline-none transition focus:border-stone-400 focus:bg-white"
            name="origin"
            value={formState.origin}
            onChange={handleChange}
            required
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">Description</span>
          <textarea
            className="min-h-[7.5rem] w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-stone-400 focus:bg-white"
            name="description"
            value={formState.description}
            onChange={handleChange}
            required
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Roast level</span>
          <select
            className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 text-sm outline-none transition focus:border-stone-400 focus:bg-white"
            name="roastLevel"
            value={formState.roastLevel}
            onChange={handleChange}
          >
            <option value="light">light</option>
            <option value="medium">medium</option>
            <option value="medium-dark">medium-dark</option>
            <option value="dark">dark</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Category</span>
          <input
            className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 text-sm outline-none transition focus:border-stone-400 focus:bg-white"
            name="category"
            value={formState.category}
            onChange={handleChange}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Price</span>
          <input
            className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 text-sm outline-none transition focus:border-stone-400 focus:bg-white"
            min="0"
            name="price"
            step="0.01"
            type="number"
            value={formState.price}
            onChange={handleChange}
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">Image URL</span>
          <input
            className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 text-sm outline-none transition focus:border-stone-400 focus:bg-white"
            name="imageUrl"
            type="url"
            value={formState.imageUrl}
            onChange={handleChange}
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">Tasting notes</span>
          <textarea
            className="min-h-[7rem] w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm outline-none transition focus:border-stone-400 focus:bg-white"
            name="notes"
            value={formState.notes}
            onChange={handleChange}
            placeholder="Chocolate, citrus, jasmine..."
          />
        </label>
      </div>

      <label className="mt-5 inline-flex items-center gap-3 rounded-full bg-stone-100 px-4 py-3 text-sm text-stone-700">
        <input
          checked={formState.isAvailable}
          className="h-4 w-4 rounded border-stone-300"
          name="isAvailable"
          type="checkbox"
          onChange={handleChange}
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
