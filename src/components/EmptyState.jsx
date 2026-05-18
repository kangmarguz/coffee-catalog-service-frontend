import { Coffee } from "lucide-react";

function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-stone-300 bg-white/70 p-12 text-center shadow-[0_25px_80px_rgba(28,25,23,0.06)]">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-stone-700">
        <Coffee size={24} />
      </div>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-stone-950">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-stone-600">
        {description}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export default EmptyState;

