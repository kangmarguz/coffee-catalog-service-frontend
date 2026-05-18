function LoadingState({ label = "Loading coffees..." }) {
  return (
    <div className="rounded-[2rem] border border-white/70 bg-white/80 p-12 text-center shadow-[0_25px_80px_rgba(28,25,23,0.08)] backdrop-blur-xl">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-stone-300 border-t-stone-900" />
      <p className="mt-4 text-sm text-stone-600">{label}</p>
    </div>
  );
}

export default LoadingState;

