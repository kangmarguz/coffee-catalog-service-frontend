import { useEffect, useState } from "react";
import { ArrowLeft, Bean, MapPin, PencilLine } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCoffeeById } from "../api/coffeeApi";
import { useAuth } from "../auth/AuthContext";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import StatusBadge from "../components/StatusBadge";
import Button from "../components/ui/Button";
import Surface from "../components/ui/Surface";

function CoffeeDetailPage() {
  const { id } = useParams();
  const { isAdmin } = useAuth();
  const [coffee, setCoffee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadCoffee() {
      setLoading(true);
      setError("");

      try {
        const response = await getCoffeeById(id);

        if (!cancelled) {
          setCoffee(response.result);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load coffee.");
          toast.error("Failed to load coffee.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCoffee();

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <LoadingState label="Loading coffee details..." />;
  }

  if (error || !coffee) {
    return (
      <EmptyState
        title="Coffee not found"
        description="This item may have been removed or the detail page could not reach the API."
        action={
          <Button to="/">
            Back to catalog
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-8">
      <Link
        className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-900"
        to="/"
      >
        <ArrowLeft size={16} />
        Back to catalog
      </Link>

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Surface className="overflow-hidden rounded-[2.5rem] p-0" variant="solid">
          <img
            className="h-full min-h-96 w-full object-cover"
            src={coffee.imageUrl}
            alt={coffee.name}
          />
        </Surface>

        <Surface className="rounded-[2.5rem] p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
            {coffee.category}
          </p>
          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <h1 className="text-4xl font-semibold tracking-tight text-stone-950">
              {coffee.name}
            </h1>
            <StatusBadge available={coffee.isAvailable} />
          </div>
          <p className="mt-6 text-base leading-8 text-stone-600">
            {coffee.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl bg-stone-100 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                Origin
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-lg font-medium text-stone-900">
                <MapPin size={18} />
                {coffee.origin}
              </p>
            </div>
            <div className="rounded-3xl bg-stone-100 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                Roast level
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-lg font-medium text-stone-900">
                <Bean size={18} />
                {coffee.roastLevel}
              </p>
            </div>
          </div>

          <Surface className="mt-8 rounded-3xl p-6" variant="dark">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-300">
              Tasting notes
            </p>
            <p className="mt-3 text-base leading-8 text-stone-100">
              {coffee.notes || "Balanced, expressive, and designed for a clean finish."}
            </p>
          </Surface>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-6">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                Starting at
              </p>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-stone-950">
                ${Number(coffee.price).toFixed(2)}
              </p>
            </div>
            {isAdmin ? (
              <Button to={`/admin/coffees/${coffee.id}/edit`}>
                <PencilLine size={16} />
                Edit coffee
              </Button>
            ) : null}
          </div>
        </Surface>
      </section>
    </div>
  );
}

export default CoffeeDetailPage;
