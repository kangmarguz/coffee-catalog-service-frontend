const variants = {
  glass:
    "border border-white/70 bg-white/80 shadow-[0_30px_100px_rgba(28,25,23,0.08)] backdrop-blur-xl",
  solid: "border border-white/70 bg-white/90 shadow-[0_25px_80px_rgba(28,25,23,0.08)]",
  dashed:
    "border border-dashed border-stone-300 bg-white/70 shadow-[0_25px_80px_rgba(28,25,23,0.06)]",
  dark:
    "bg-[linear-gradient(160deg,_rgba(28,25,23,0.98),_rgba(68,64,60,0.86))] text-white shadow-[0_30px_90px_rgba(28,25,23,0.18)]",
};

function Surface({
  as: Component = "div",
  children,
  className = "",
  variant = "glass",
  ...props
}) {
  return (
    <Component className={[variants[variant], className].join(" ")} {...props}>
      {children}
    </Component>
  );
}

export default Surface;
