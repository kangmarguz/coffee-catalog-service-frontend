import { useEffect, useState } from "react";
import { ArrowLeft, Bean, MapPin, PencilLine } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getCoffeeById } from "../api/coffeeApi";
import { isAdminSessionActive } from "../auth/session";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import StatusBadge from "../components/StatusBadge";

function CoffeeDetailPage() {
  const { id } = useParams();
  const isAdmin = isAdminSessionActive();
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
          <Link
            className="inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
            to="/"
          >
            Back to catalog
          </Link>
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
        <div className="overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/75 shadow-[0_30px_100px_rgba(28,25,23,0.08)]">
          <img
            className="h-full min-h-[24rem] w-full object-cover"
            src={coffee.imageUrl}
            alt={coffee.name}
          />
        </div>

        <div className="rounded-[2.5rem] border border-white/70 bg-white/80 p-8 shadow-[0_30px_100px_rgba(28,25,23,0.08)] backdrop-blur-xl">
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
            <div className="rounded-[1.5rem] bg-stone-100 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                Origin
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-lg font-medium text-stone-900">
                <MapPin size={18} />
                {coffee.origin}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-stone-100 p-5">
              <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                Roast level
              </p>
              <p className="mt-3 inline-flex items-center gap-2 text-lg font-medium text-stone-900">
                <Bean size={18} />
                {coffee.roastLevel}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-[linear-gradient(160deg,_rgba(28,25,23,0.96),_rgba(68,64,60,0.88))] p-6 text-white">
            <p className="text-xs uppercase tracking-[0.24em] text-stone-300">
              Tasting notes
            </p>
            <p className="mt-3 text-base leading-8 text-stone-100">
              {coffee.notes || "Balanced, expressive, and designed for a clean finish."}
            </p>
          </div>

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
              <Link
                className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
                to={`/admin/coffees/${coffee.id}/edit`}
              >
                <PencilLine size={16} />
                Edit coffee
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CoffeeDetailPage;
