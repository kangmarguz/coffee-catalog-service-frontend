import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { toast } from "react-toastify";
import { getCoffees } from "../api/coffeeApi";
import { useAuth } from "../auth/AuthContext";
import CoffeeCard from "../components/CoffeeCard";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import SearchFilters from "../components/SearchFilters";
import SectionHeading from "../components/SectionHeading";
import Button from "../components/ui/Button";
import Surface from "../components/ui/Surface";

const initialFilters = {
  search: "",
  roastLevel: "all",
  available: "all",
};

function CatalogPage() {
  const { isAdmin } = useAuth();
  const [filters, setFilters] = useState(initialFilters);
  const [queryFilters, setQueryFilters] = useState(initialFilters);
  const [coffees, setCoffees] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, limit: 12 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCoffees() {
      setLoading(true);
      setError("");

      try {
        const response = await getCoffees({
          search: queryFilters.search || undefined,
          roastLevel:
            queryFilters.roastLevel === "all" ? undefined : queryFilters.roastLevel,
          available:
            queryFilters.available === "all" ? undefined : queryFilters.available,
          page: 1,
          limit: 12,
        });

        if (!cancelled) {
          setCoffees(response.result);
          setMeta(response.meta);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load coffee list.");
          toast.error("Failed to load coffee list.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCoffees();

    return () => {
      cancelled = true;
    };
  }, [queryFilters]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setQueryFilters((current) => ({
        ...current,
        search: filters.search,
      }));
    }, 1500);

    return () => window.clearTimeout(timeoutId);
  }, [filters.search]);

  function handleFilterChange(event) {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));

    if (name !== "search") {
      setQueryFilters((current) => ({ ...current, [name]: value }));
    }
  }

  function handleReset() {
    setFilters(initialFilters);
    setQueryFilters(initialFilters);
  }

  return (
    <div className="space-y-8">
      <Surface
        as="section"
        className="overflow-hidden rounded-[2.5rem] px-6 py-10 sm:px-8 lg:px-12"
      >
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.34em] text-stone-500">
              A curated coffee experience
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
              Clean, modern coffee discovery with the calm of a premium product page.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-stone-600">
              Browse expressive origins, polished tasting profiles, and a catalog
              designed with clarity, restraint, and generous spacing.
            </p>
            {isAdmin ? (
              <div className="mt-8 flex flex-wrap gap-4">
                <Button to="/admin/coffees/new">
                  Add a coffee
                  <ArrowRight size={16} />
                </Button>
                <Button to="/admin/coffees" variant="secondary">
                  Manage catalog
                </Button>
              </div>
            ) : null}
          </div>

          <Surface className="rounded-[2rem] p-8" variant="dark">
            <p className="text-xs uppercase tracking-[0.28em] text-stone-300">
              Collection insight
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-[1.5rem] bg-white/8 p-5">
                <p className="text-3xl font-semibold tracking-tight">{meta.total}</p>
                <p className="mt-2 text-sm text-stone-300">Selectable coffees</p>
              </div>
              <div className="rounded-[1.5rem] bg-white/8 p-5">
                <p className="text-3xl font-semibold tracking-tight">4</p>
                <p className="mt-2 text-sm text-stone-300">Roast expressions</p>
              </div>
            </div>
            <p className="mt-6 text-sm leading-7 text-stone-300">
              Built for browsing first, with fast paths into deeper tasting notes
              and an uncluttered admin workflow.
            </p>
          </Surface>
        </div>
      </Surface>

      <SearchFilters
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleReset}
      />

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Current catalog"
          title="Browse the latest collection"
          description="Filter by roast profile, availability, or search for a specific expression."
        />

        {loading ? <LoadingState /> : null}

        {!loading && error ? (
          <EmptyState
            title="We couldn’t load the catalog"
            description="The storefront is available, but the coffee data could not be retrieved from the API."
          />
        ) : null}

        {!loading && !error && coffees.length === 0 ? (
          <EmptyState
            title="No coffees match these filters"
            description="Adjust the search, roast level, or availability filter to see more selections."
            action={
              <Button
                onClick={handleReset}
              >
                Clear filters
              </Button>
            }
          />
        ) : null}

        {!loading && !error && coffees.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {coffees.map((coffee) => (
              <CoffeeCard key={coffee.id} coffee={coffee} />
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}

export default CatalogPage;
