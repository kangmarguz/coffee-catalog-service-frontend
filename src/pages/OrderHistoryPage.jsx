import { ArrowLeft, ClipboardList, PackageCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getOrders } from "../api/orderApi";
import EmptyState from "../components/EmptyState";
import LoadingState from "../components/LoadingState";
import Button from "../components/ui/Button";
import Surface from "../components/ui/Surface";

function formatDate(value) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatMoney(value) {
  return `$${Number(value).toFixed(2)}`;
}

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadOrders() {
      setLoading(true);
      setError("");

      try {
        const response = await getOrders();

        if (!cancelled) {
          setOrders(response.result);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load order history.");
          toast.error("Failed to load order history.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return <LoadingState label="Loading order history..." />;
  }

  if (error) {
    return (
      <EmptyState
        title="Order history is unavailable"
        description="The API could not return saved orders right now."
        action={
          <Button to="/">
            <ArrowLeft size={16} />
            Back to catalog
          </Button>
        }
      />
    );
  }

  if (orders.length === 0) {
    return (
      <EmptyState
        title="No orders yet"
        description="Guest checkout orders will appear here after Stripe checkout starts."
        action={
          <Button to="/">
            <ArrowLeft size={16} />
            Back to catalog
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-8">
      <Surface className="rounded-[2.5rem] p-8" variant="solid">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              Admin orders
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950">
              Order history
            </h1>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-950 text-white">
            <ClipboardList size={22} />
          </div>
        </div>
      </Surface>

      <section className="space-y-5">
        {orders.map((order) => (
          <Surface className="rounded-[2rem] p-6" key={order.id} variant="solid">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5 text-sm font-medium text-stone-700">
                    <PackageCheck size={15} />
                    {order.status}
                  </span>
                  <span className="text-sm text-stone-500">{formatDate(order.createdAt)}</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold tracking-tight text-stone-950">
                  {order.guestName}
                </h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-stone-600">
                  {order.deliveryAddress}
                </p>
              </div>

              <div className="text-left lg:text-right">
                <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
                  Total
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight text-stone-950">
                  {formatMoney(order.total)}
                </p>
                <p className="mt-2 text-xs text-stone-500">#{order.id}</p>
              </div>
            </div>

            <div className="mt-6 divide-y divide-stone-100 rounded-3xl bg-stone-50 px-5">
              {order.items.map((item) => (
                <div className="flex items-center justify-between gap-4 py-4" key={item.id}>
                  <div>
                    <p className="font-medium text-stone-950">{item.name}</p>
                    <p className="text-sm text-stone-500">
                      Qty {item.quantity} x {formatMoney(item.price)}
                    </p>
                  </div>
                  <p className="font-semibold text-stone-950">
                    {formatMoney(item.lineTotal)}
                  </p>
                </div>
              ))}
            </div>
          </Surface>
        ))}
      </section>
    </div>
  );
}

export default OrderHistoryPage;
