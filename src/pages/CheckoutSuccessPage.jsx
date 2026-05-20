import { CheckCircle2 } from "lucide-react";
import { useEffect } from "react";
import Button from "../components/ui/Button";
import Surface from "../components/ui/Surface";
import { useCartStore } from "../stores/cartStore";

function CheckoutSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

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
        Stripe accepted the payment and your cart has been cleared.
      </p>
      <Button className="mt-8" to="/">
        Back to catalog
      </Button>
    </Surface>
  );
}

export default CheckoutSuccessPage;
