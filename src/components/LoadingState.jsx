import Surface from "./ui/Surface";

function LoadingState({ label = "Loading coffees..." }) {
  return (
    <Surface className="rounded-4xl p-12 text-center">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-stone-300 border-t-stone-900" />
      <p className="mt-4 text-sm text-stone-600">{label}</p>
    </Surface>
  );
}

export default LoadingState;
