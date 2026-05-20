import { ArrowUpRight, Bean, MapPin, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../auth/AuthContext";
import { useCartStore } from "../stores/cartStore";
import { formatRoastLevel } from "../utils/coffeeValidation";
import StatusBadge from "./StatusBadge";
import Button from "./ui/Button";
import Surface from "./ui/Surface";

function CoffeeCard({ coffee }) {
  const { isAdmin } = useAuth();
  const addItem = useCartStore((state) => state.addItem);

  function handleAddToCart() {
    addItem(coffee);
    toast.success(`${coffee.name} added to cart.`);
  }

  return (
    <Surface
      as="article"
      className="group overflow-hidden rounded-4xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_90px_rgba(28,25,23,0.12)]"
      variant="solid"
    >
      <div className="relative h-64 overflow-hidden bg-stone-100">
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={coffee.imageUrl}
          alt={coffee.name}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-black/30 to-transparent" />
      </div>

      <div className="space-y-5 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-stone-500">
              {coffee.category}
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">
              {coffee.name}
            </h3>
          </div>
          <StatusBadge available={coffee.isAvailable} />
        </div>

        <p className="overflow-hidden text-sm leading-7 text-stone-600 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
          {coffee.description}
        </p>

        <div className="flex flex-wrap gap-3 text-sm text-stone-600">
          <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5">
            <MapPin size={14} />
            {coffee.origin}
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1.5">
            <Bean size={14} />
            {formatRoastLevel(coffee.roastLevel)}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-stone-100 pt-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-stone-500">
              From
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-tight text-stone-950">
              ${Number(coffee.price).toFixed(2)}
            </p>
          </div>

          <div className="flex flex-wrap justify-end gap-2">
            {!isAdmin ? (
              <Button
                className="cursor-pointer"
                disabled={!coffee.isAvailable}
                onClick={handleAddToCart}
                size="sm"
                variant="secondary"
              >
                <ShoppingCart size={16} />
                Add
              </Button>
            ) : null}
            <Button size="sm" to={`/coffees/${coffee.id}`}>
              Explore
              <ArrowUpRight size={16} />
            </Button>
          </div>
        </div>
      </div>
    </Surface>
  );
}

export default CoffeeCard;
