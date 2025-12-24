import { ImageCarousel } from "@/components/ui";
import { RocketDocs } from "@/types";

const activeClass =
  "pt-0.5 pb-0.5 pl-1.5 pr-1.5 rounded-3xl text-xs font-bold border border-green-900 bg-green-500/20 text-green-500 ml-auto";
const inactiveClass =
  "pt-0.5 pb-0.5 pl-1.5 pr-1.5 rounded-3xl text-xs font-bold border border-red-900 bg-red-500/20 text-red-300 ml-auto";

type TProps = {
  selected: RocketDocs;
};

export default function RocketInfo({ selected }: TProps) {
  return (
    <>
      <div className="hidden relative w-full h-[30%] mb-6 2xl:block">
        <ImageCarousel
          images={selected.flickr_images}
          width={"100%"}
          height={"100%"}
        />
      </div>
      <article>
        <h2 className="text-lg font-semibold text-zinc-50">{selected?.name}</h2>
        <h4 className="flex items-center text-sm text-zinc-700 font-semibold mb-4">
          First Flight: {selected?.first_flight}{" "}
          <span className={selected?.active ? activeClass : inactiveClass}>
            {selected?.active ? "Active" : "Inactive"}
          </span>
        </h4>
        <p className="text-zinc-400">{selected?.description}</p>
      </article>
    </>
  );
}
