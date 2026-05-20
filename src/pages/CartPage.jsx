import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CreditCard, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { createCheckoutSession } from "../api/paymentApi";
import { useAuth } from "../auth/AuthContext";
import EmptyState from "../components/EmptyState";
import Button from "../components/ui/Button";
import FormField from "../components/ui/FormField";
import Surface from "../components/ui/Surface";
import { useCartStore } from "../stores/cartStore";
import { guestCheckoutSchema } from "../utils/checkoutValidation";

function CartPage() {
  const { isAdmin } = useAuth();
  const { addItem, clearCart, items, removeItem, setQuantity } = useCartStore();
  const [submitting, setSubmitting] = useState(false);
  const subtotal = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );
  const itemCount = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
    },
    resolver: zodResolver(guestCheckoutSchema),
  });

  async function handleCheckout(values) {
    if (items.length === 0) {
      toast.info("Your cart is empty.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await createCheckoutSession({
        customer: values,
        items: items.map((item) => ({
          coffeeId: item.id,
          quantity: item.quantity,
        })),
        successUrl: `${window.location.origin}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cart`,
      });
      const checkoutUrl = response.url || response.checkoutUrl;

      if (!checkoutUrl) {
        throw new Error("Checkout URL missing.");
      }

      window.location.assign(checkoutUrl);
    } catch {
      toast.error("Stripe checkout could not be started.");
      setSubmitting(false);
    }
  }

  if (isAdmin) {
    return (
      <EmptyState
        title="Guest checkout only"
        description="Log out of the admin account to add coffees to the cart and checkout as a guest."
        action={
          <Button to="/">
            <ArrowLeft size={16} />
            Back to catalog
          </Button>
        }
      />
    );
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title="Your cart is empty"
        description="Guests can add available coffees to the cart and checkout with a name and address."
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
      <Link
        className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-900"
        to="/"
      >
        <ArrowLeft size={16} />
        Continue shopping
      </Link>

      <section className="grid gap-8 lg:grid-cols-[1fr_420px]">
        <Surface className="rounded-[2.5rem] p-6 sm:p-8" variant="solid">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-stone-200 pb-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
                Guest cart
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-950">
                {itemCount} item{itemCount === 1 ? "" : "s"} ready for checkout
              </h1>
            </div>
            <Button onClick={clearCart} size="sm" variant="ghost">
              <Trash2 size={16} />
              Clear
            </Button>
          </div>

          <div className="mt-6 divide-y divide-stone-200">
            {items.map((item) => (
              <div
                className="grid gap-5 py-6 sm:grid-cols-[112px_1fr_auto] sm:items-center"
                key={item.id}
              >
                <img
                  alt={item.name}
                  className="h-28 w-28 rounded-3xl object-cover"
                  src={item.imageUrl}
                />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                    {item.category}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">
                    {item.name}
                  </h2>
                  <p className="mt-2 text-sm text-stone-600">
                    ${item.price.toFixed(2)} each
                  </p>
                </div>

                <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <div className="flex items-center rounded-full border border-stone-200 bg-stone-50 p-1">
                    <Button
                      aria-label={`Decrease ${item.name}`}
                      disabled={item.quantity === 1}
                      onClick={() => setQuantity(item.id, item.quantity - 1)}
                      size="icon"
                      variant="ghost"
                    >
                      <Minus size={16} />
                    </Button>
                    <span className="w-10 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <Button
                      aria-label={`Increase ${item.name}`}
                      onClick={() => addItem(item)}
                      size="icon"
                      variant="ghost"
                    >
                      <Plus size={16} />
                    </Button>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-lg font-semibold text-stone-950">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <Button
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeItem(item.id)}
                      size="icon"
                      variant="ghost"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Surface>

        <Surface
          as="form"
          className="h-fit rounded-[2.5rem] p-6 sm:p-8"
          onSubmit={handleSubmit(handleCheckout)}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-950 text-white">
              <ShoppingBag size={20} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                Delivery details
              </p>
              <h2 className="text-xl font-semibold text-stone-950">
                Guest checkout
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <FormField
              error={errors.name?.message}
              label="Name"
              placeholder="Your name"
              {...register("name")}
            />
            <FormField
              as="textarea"
              error={errors.address?.message}
              label="Address"
              placeholder="House number, street, city, postal code"
              {...register("address")}
            />
          </div>

          <div className="mt-6 space-y-3 rounded-3xl bg-stone-100 p-5">
            <div className="flex justify-between text-sm text-stone-600">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-stone-600">
              <span>Delivery</span>
              <span>Calculated later</span>
            </div>
            <div className="flex justify-between border-t border-stone-200 pt-3 text-xl font-semibold text-stone-950">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <Button className="mt-6 w-full" disabled={submitting} type="submit">
            <CreditCard size={16} />
            {submitting ? "Opening Stripe..." : "Pay with Stripe"}
          </Button>
        </Surface>
      </section>
    </div>
  );
}

export default CartPage;
