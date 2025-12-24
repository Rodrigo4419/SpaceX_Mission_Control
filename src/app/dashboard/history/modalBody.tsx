"use client";
import { useState } from "react";
import { RocketInfo, LaunchpadInfo, ImageCarousel } from "@/components/ui";
import { parseDate } from "@/utils";
import { ApiDocs } from "@/types";
import { YoutubeIcon, ArticleIcon, LinkIcon } from "@/components/svg";

const buttonON =
  "pt-1 pb-1 pl-1.5 pr-1.5 text-xs font-medium  bg-zinc-50 text-zinc-900 cursor-pointer";
const buttonOff =
  "pt-1 pb-1 pl-1.5 pr-1.5 text-xs font-medium  bg-zinc-900 text-zinc-600 cursor-pointer duration-150 ease-in-out hover:bg-zinc-800 hover:text-zinc-50";

type TProps = {
  selected: ApiDocs;
};

export default function ModalBody({ selected }: TProps) {
  const [showInfo, setShowInfo] = useState({ rocket: true, launchPad: false });

  return (
    <div className="w-full h-full flex">
      <div className="p-8 w-0 grow flex gap-4">
        <ImageCarousel
          images={selected.links.flickr.original}
          width={"50%"}
          height={"100%"}
        />
        <article className="flex flex-col basis-1/2">
          <h2 className="text-2xl text-zinc-50 font-semibold">
            {selected.name}
          </h2>
          <p className="text-sm text-zinc-700 font-semibold">
            {parseDate(selected.date_utc)}
          </p>
          <div className="flex gap-2 mt-4">
            {selected.links.webcast && (
              <a
                href={selected.links.webcast}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold bg-zinc-600 text-zinc-50 h-fit pt-1 pb-1 pl-2 pr-2 rounded-md transition duration-150 ease-in-out hover:text-blue-400"
              >
                <YoutubeIcon width="1rem" height="1rem" />
                Webcast
              </a>
            )}
            {selected.links.article && (
              <a
                href={selected.links.article}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold bg-zinc-600 text-zinc-50 h-fit pt-1 pb-1 pl-2 pr-2 rounded-md transition duration-150 ease-in-out hover:text-blue-400"
              >
                <ArticleIcon height="1rem" width="1rem" />
                Article
              </a>
            )}
            {selected.links.wikipedia && (
              <a
                href={selected.links.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-semibold bg-zinc-600 text-zinc-50 h-fit pt-1 pb-1 pl-2 pr-2 rounded-md transition duration-150 ease-in-out hover:text-blue-400"
              >
                <LinkIcon height="1rem" width="1rem" />
                Wikipedia Link
              </a>
            )}
          </div>
          {selected.details ? (
            <p className="mt-4 text-zinc-400 grow overflow-y-auto">{selected.details}</p>
          ) : (
            <p className="mt-4 text-zinc-400">No Details</p>
          )}
        </article>
      </div>
      <div className="border-l border-l-zinc-700 p-8 h-full w-88 overflow-y-auto 2xl:w-lg">
        <div className="flex mb-6">
          <button
            onClick={() => setShowInfo({ launchPad: false, rocket: true })}
            className={`${
              showInfo.rocket ? buttonON : buttonOff
            } rounded-tl-lg rounded-bl-lg`}
          >
            Rocket
          </button>
          <button
            onClick={() => setShowInfo({ rocket: false, launchPad: true })}
            className={`${
              showInfo.launchPad ? buttonON : buttonOff
            } rounded-tr-lg rounded-br-lg`}
          >
            Launchpad
          </button>
        </div>
        {showInfo.rocket ? (
          <RocketInfo selected={selected?.rocket} />
        ) : (
          <LaunchpadInfo selected={selected?.launchpad} />
        )}
      </div>
    </div>
  );
}
