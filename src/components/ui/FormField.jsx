import { forwardRef } from "react";

const fieldClass =
  "w-full rounded-2xl border border-stone-200 bg-stone-50 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-400 focus:bg-white";

const FormField = forwardRef(function FormField(
  {
    as: Component = "input",
    children,
    className = "",
    error,
    icon: Icon,
    label,
    wrapperClassName = "",
    ...props
  },
  ref
) {
  return (
    <label className={["block space-y-2", wrapperClassName].join(" ")}>
      {label ? <span className="text-sm font-medium text-stone-700">{label}</span> : null}
      <span className="relative block">
        {Icon ? (
          <Icon
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-stone-400"
            size={18}
          />
        ) : null}
        <Component
          aria-invalid={Boolean(error)}
          className={[
            fieldClass,
            Component === "textarea" ? "min-h-28 px-4 py-3" : "h-12 px-4",
            Icon ? "pl-11" : "",
            className,
          ].join(" ")}
          ref={ref}
          {...props}
        >
          {children}
        </Component>
      </span>
      {error ? <p className="text-xs font-medium text-rose-600">{error}</p> : null}
    </label>
  );
});

export default FormField;
