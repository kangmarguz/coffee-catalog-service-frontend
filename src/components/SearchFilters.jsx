import { Search, SlidersHorizontal } from "lucide-react";

const roastLevels = ["all", "light", "medium", "medium-dark", "dark"];

function SearchFilters({ filters, onChange, onReset }) {
  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/80 p-5 shadow-[0_25px_80px_rgba(28,25,23,0.08)] backdrop-blur-xl">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
        <SlidersHorizontal size={14} />
        Refine selection
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.7fr_1fr_1fr_auto]">
        <label className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input
            className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white"
            type="text"
            name="search"
            value={filters.search}
            onChange={onChange}
            placeholder="Search by name, notes, origin"
          />
        </label>

        <select
          className="h-12 rounded-2xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white"
          name="roastLevel"
          value={filters.roastLevel}
          onChange={onChange}
        >
          {roastLevels.map((level) => (
            <option key={level} value={level}>
              {level === "all" ? "All roast levels" : level}
            </option>
          ))}
        </select>

        <select
          className="h-12 rounded-2xl border border-stone-200 bg-stone-50 px-4 text-sm text-stone-900 outline-none transition focus:border-stone-400 focus:bg-white"
          name="available"
          value={filters.available}
          onChange={onChange}
        >
          <option value="all">All stock states</option>
          <option value="true">Available</option>
          <option value="false">Out of stock</option>
        </select>

        <button
          className="h-12 rounded-2xl border border-stone-300 px-5 text-sm font-medium text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
          onClick={onReset}
          type="button"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default SearchFilters;

