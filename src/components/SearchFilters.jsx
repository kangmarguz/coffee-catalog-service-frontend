import { Search, SlidersHorizontal } from "lucide-react";
import Button from "./ui/Button";
import FormField from "./ui/FormField";
import Surface from "./ui/Surface";

const roastLevels = ["all", "light", "medium", "medium-dark", "dark"];

function SearchFilters({ filters, onChange, onReset }) {
  return (
    <Surface className="rounded-4xl p-5">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
        <SlidersHorizontal size={14} />
        Refine selection
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1.7fr_1fr_1fr_auto]">
        <FormField
          icon={Search}
          type="text"
          name="search"
          value={filters.search}
          onChange={onChange}
          placeholder="Search by name, notes, origin"
        />

        <FormField
          as="select"
          name="roastLevel"
          value={filters.roastLevel}
          onChange={onChange}
        >
          {roastLevels.map((level) => (
            <option key={level} value={level}>
              {level === "all" ? "All roast levels" : level}
            </option>
          ))}
        </FormField>

        <FormField
          as="select"
          name="available"
          value={filters.available}
          onChange={onChange}
        >
          <option value="all">All stock states</option>
          <option value="true">Available</option>
          <option value="false">Out of stock</option>
        </FormField>

        <Button
          className="rounded-2xl"
          onClick={onReset}
          variant="secondary"
        >
          Reset
        </Button>
      </div>
    </Surface>
  );
}

export default SearchFilters;
