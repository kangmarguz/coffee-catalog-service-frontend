function StatusBadge({ available }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
        available
          ? "bg-emerald-100 text-emerald-700"
          : "bg-stone-200 text-stone-600",
      ].join(" ")}
    >
      {available ? "Available" : "Out of stock"}
    </span>
  );
}

export default StatusBadge;

