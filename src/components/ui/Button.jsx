import { Link } from "react-router-dom";

const baseClass =
  "inline-flex items-center justify-center gap-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary:
    "bg-stone-950 text-white shadow-[0_16px_45px_rgba(28,25,23,0.18)] hover:-translate-y-0.5 hover:bg-stone-800 focus-visible:outline-stone-900",
  secondary:
    "border border-stone-300 bg-white/70 text-stone-800 hover:border-stone-400 hover:bg-white focus-visible:outline-stone-500",
  danger:
    "bg-rose-600 text-white shadow-[0_16px_45px_rgba(159,18,57,0.16)] hover:-translate-y-0.5 hover:bg-rose-500 focus-visible:outline-rose-600",
  ghost:
    "text-stone-600 hover:bg-white/80 hover:text-stone-950 focus-visible:outline-stone-500",
};

const sizes = {
  sm: "h-10 rounded-full px-4",
  md: "h-12 rounded-full px-5",
  icon: "h-10 w-10 rounded-full",
};

function Button({
  as: Component = "button",
  children,
  className = "",
  size = "md",
  to,
  type = "button",
  variant = "primary",
  ...props
}) {
  const ResolvedComponent = to ? Link : Component;
  const resolvedProps = to ? { to } : { type };

  return (
    <ResolvedComponent
      className={[baseClass, variants[variant], sizes[size], className].join(" ")}
      {...resolvedProps}
      {...props}
    >
      {children}
    </ResolvedComponent>
  );
}

export default Button;
