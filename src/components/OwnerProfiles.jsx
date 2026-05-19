import { ArrowUpRight, Coffee } from "lucide-react";
import Surface from "./ui/Surface";

function OwnerProfiles() {
  return (
    <Surface
      as="section"
      className="overflow-hidden rounded-[2.5rem] p-0"
      variant="solid"
    >
      <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-88 overflow-hidden bg-stone-200 lg:min-h-136">
          <img
            alt="Coffee shop owner"
            className="h-full w-full object-cover"
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e09bdfc4-503d-47f3-a277-46c8e2f15fd0/dhz14u1-1a2ece86-77b8-4175-b768-64727b620efd.png/v1/fit/w_828,h_1182/kasumi_yoshizawa__persona_5__png_by_spider_monkie_dhz14u1-414w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTMxMyIsInBhdGgiOiIvZi9lMDliZGZjNC01MDNkLTQ3ZjMtYTI3Ny00NmM4ZTJmMTVmZDAvZGh6MTR1MS0xYTJlY2U4Ni03N2I4LTQxNzUtYjc2OC02NDcyN2I2MjBlZmQucG5nIiwid2lkdGgiOiI8PTkyMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.BB6e4DGJw-7mURJI5Fd-iIJYedsfZBdB4a8-L1t0Dfc"
          />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-black/35 to-transparent lg:hidden" />
        </div>

        <div className="flex flex-col justify-center px-6 py-10 sm:px-8 lg:px-12">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-stone-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
            <Coffee size={15} />
            Owner story
          </div>

          <h2 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
            Crafted by people who care about every cup.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-stone-600">
            This catalog is personal. Every coffee is selected, tested, and written
            with a clear point of view so customers can understand the flavor before
            they choose a bag.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-stone-100 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                Focus
              </p>
              <p className="mt-2 text-lg font-semibold text-stone-950">
                Honest tasting notes
              </p>
            </div>
            <div className="rounded-2xl bg-stone-100 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                Promise
              </p>
              <p className="mt-2 text-lg font-semibold text-stone-950">
                Coffee chosen with care
              </p>
            </div>
          </div>

          <p className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-stone-900">
            Meet the owner behind the collection
            <ArrowUpRight size={16} />
          </p>
        </div>
      </div>
    </Surface>
  );
}

export default OwnerProfiles;
