import { useEffect, useState } from "react";
import { AlertTriangle, PencilLine, Plus, Trash2, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCoffee, getCoffees } from "../api/coffeeApi";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import SectionHeading from "../components/SectionHeading";
import StatusBadge from "../components/StatusBadge";

function confirmDeleteToast() {
  return new Promise((resolve) => {
    let handled = false;
    const toastId = toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-3">
          <p className="inline-flex items-center gap-2 text-sm font-medium text-stone-900">
            <AlertTriangle size={16} className="text-rose-600" />
            Delete this coffee item?
          </p>
          <div className="flex gap-2">
            <button
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-rose-500"
              onClick={() => {
                handled = true;
                resolve(true);
                closeToast();
              }}
              type="button"
            >
              <Trash2 size={14} />
              Delete
            </button>
            <button
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-stone-300 px-4 py-2 text-xs font-semibold text-stone-700 transition hover:bg-stone-50"
              onClick={() => {
                handled = true;
                resolve(false);
                closeToast();
              }}
              type="button"
            >
              <X size={14} />
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        onClose: () => {
          if (!handled) {
            resolve(false);
          }
        },
      }
    );

    setTimeout(() => {
      if (handled) {
        return;
      }
      toast.dismiss(toastId);
    }, 15000);
  });
}

function AdminCoffeesPage() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState("");

  async function loadCoffees() {
    setLoading(true);

    try {
      const response = await getCoffees({ page: 1, limit: 50 });
      setCoffees(response.result);
    } catch {
      toast.error("Failed to load coffee list.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCoffees();
  }, []);

  async function handleDelete(id) {
    const confirmed = await confirmDeleteToast();
    if (!confirmed) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteCoffee(id);
      toast.success("Coffee deleted successfully.");
      await loadCoffees();
    } catch {
      toast.error("Failed to delete coffee.");
    } finally {
      setDeletingId("");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[2.5rem] border border-white/70 bg-white/80 p-6 shadow-[0_30px_100px_rgba(28,25,23,0.08)] sm:flex-row sm:items-end sm:justify-between sm:p-8">
        <SectionHeading
          eyebrow="Catalog operations"
          title="Manage coffee entries"
          description="Create, update, and remove items from the collection with a compact admin surface."
        />
        <Link
          className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
          to="/admin/coffees/new"
        >
          <Plus size={16} />
          New coffee
        </Link>
      </div>

      {loading ? <LoadingState /> : null}

      {!loading && coffees.length === 0 ? (
        <EmptyState
          title="No coffees yet"
          description="Create your first entry to populate the storefront and detail pages."
          action={
            <Link
              className="inline-flex rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
              to="/admin/coffees/new"
            >
              Create first coffee
            </Link>
          }
        />
      ) : null}

      {!loading && coffees.length > 0 ? (
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_25px_80px_rgba(28,25,23,0.08)]">
          <div className="hidden grid-cols-[1.8fr_1fr_1fr_0.9fr_1fr] gap-4 border-b border-stone-200 px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500 md:grid">
            <span>Name</span>
            <span>Origin</span>
            <span>Roast</span>
            <span>Status</span>
            <span className="text-right">Actions</span>
          </div>

          <div className="divide-y divide-stone-100">
            {coffees.map((coffee) => (
              <div
                key={coffee.id}
                className="grid grid-cols-1 gap-4 px-6 py-5 text-sm text-stone-700 md:grid-cols-[1.8fr_1fr_1fr_0.9fr_1fr] md:items-center"
              >
                <div>
                  <p className="font-semibold text-stone-950">{coffee.name}</p>
                  <p className="mt-1 text-stone-500">{coffee.category}</p>
                </div>
                <span className="md:text-inherit">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.24em] text-stone-400 md:hidden">
                    Origin
                  </span>
                  {coffee.origin}
                </span>
                <span className="capitalize">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-[0.24em] text-stone-400 md:hidden">
                    Roast
                  </span>
                  {coffee.roastLevel}
                </span>
                <div>
                  <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.24em] text-stone-400 md:hidden">
                    Status
                  </span>
                  <StatusBadge available={coffee.isAvailable} />
                </div>
                <div className="flex justify-end gap-2">
                  <Link
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-300 text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
                    to={`/admin/coffees/${coffee.id}/edit`}
                  >
                    <PencilLine size={16} />
                  </Link>
                  <button
                    className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-rose-200 text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
                    disabled={deletingId === coffee.id}
                    onClick={() => handleDelete(coffee.id)}
                    type="button"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AdminCoffeesPage;
