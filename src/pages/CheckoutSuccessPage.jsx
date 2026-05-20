import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { completeCheckoutSession } from "../api/paymentApi";
import Button from "../components/ui/Button";
import Surface from "../components/ui/Surface";
import { useCartStore } from "../stores/cartStore";

function CheckoutSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);
  const [searchParams] = useSearchParams();
  const [statusLabel, setStatusLabel] = useState("Confirming payment...");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    let cancelled = false;
    const sessionId = searchParams.get("session_id");

    async function confirmOrder() {
      if (!sessionId) {
        clearCart();
        setStatusLabel("Payment completed.");
        return;
      }

      try {
        const order = await completeCheckoutSession(sessionId);

        if (!cancelled) {
          setOrderId(order.id);
          clearCart();
          setStatusLabel("Payment completed and order saved.");
        }
      } catch {
        if (!cancelled) {
          clearCart();
          setStatusLabel("Payment completed. Order confirmation is pending.");
          toast.warn("Payment succeeded, but order history could not be refreshed.");
        }
      }
    }

    confirmOrder();

    return () => {
      cancelled = true;
    };
  }, [clearCart, searchParams]);

  return (
    <Surface className="mx-auto max-w-2xl rounded-[2.5rem] p-8 text-center" variant="solid">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <CheckCircle2 size={30} />
      </div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
        Payment complete
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950">
        Your coffee order is confirmed
      </h1>
      <p className="mt-4 text-base leading-8 text-stone-600">
        {statusLabel}
      </p>
      {orderId ? (
        <div className="mx-auto mt-6 max-w-md rounded-3xl bg-stone-100 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            Order ID
          </p>
          <p className="mt-2 break-all text-lg font-semibold text-stone-950">
            {orderId}
          </p>
        </div>
      ) : null}
      <Button className="mt-8" to="/">
        Back to catalog
      </Button>
    </Surface>
  );
}

export default CheckoutSuccessPage;
