import { ArrowUpRight, Bean, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

function CoffeeCard({ coffee }) {
  return (
    <article className="group overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 shadow-[0_25px_70px_rgba(28,25,23,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_90px_rgba(28,25,23,0.12)]">
      <div className="relative h-64 overflow-hidden bg-stone-100">
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={coffee.imageUrl}
          alt={coffee.name}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />
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
            {coffee.roastLevel}
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

          <Link
            className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-stone-700"
            to={`/coffees/${coffee.id}`}
          >
            Explore
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default CoffeeCard;
