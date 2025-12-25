import { ImageCarousel } from "@/components/ui";
import { RocketDocs } from "@/types";

const activeClass =
  "hidden pt-0.5 pb-0.5 pl-1.5 pr-1.5 rounded-3xl text-xs font-bold border border-green-900 bg-green-500/20 text-green-500 ml-auto sm:block";
const inactiveClass =
  "hidden pt-0.5 pb-0.5 pl-1.5 pr-1.5 rounded-3xl text-xs font-bold border border-red-900 bg-red-500/20 text-red-300 ml-auto sm:block";

type TProps = {
  selected: RocketDocs;
};

export default function RocketInfo({ selected }: TProps) {
  return (
    <>
      <div className="p-8 pt-4 w-full grow flex flex-col gap-4 sm:flex-row">
        <div className="w-full h-1/2 sm:w-1/2 sm:h-full">
          <ImageCarousel
            images={selected.flickr_images}
            width={"100%"}
            height={"100%"}
          />
        </div>
        <article className="flex flex-col basis-1/2">
          <h2 className="text-2xl text-zinc-50 font-semibold max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
            {selected.name}
          </h2>
          <span className={selected?.active ? activeClass : inactiveClass}>
            {selected?.active ? "Active" : "Inactive"}
          </span>
          <p className="text-sm text-zinc-700 font-semibold">
            First Flight: {selected.first_flight}{" "}
          </p>
          <p className="mt-2 text-zinc-400 grow h-0 overflow-y-auto sm:mt-4">
            {selected.description}
          </p>
        </article>
      </div>
    </>
  );
}
