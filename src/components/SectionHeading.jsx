function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-stone-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-stone-600 sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export default SectionHeading;

