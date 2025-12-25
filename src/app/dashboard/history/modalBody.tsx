"use client";
import { useState } from "react";
import { RocketInfo, LaunchpadInfo, ImageCarousel } from "@/components/ui";
import { parseDate } from "@/utils";
import { ApiDocs } from "@/types";
import { YoutubeIcon, ArticleIcon, LinkIcon } from "@/components/svg";

const buttonON =
  "p-2 text-sm font-medium rounded-lg bg-zinc-50 text-zinc-900 cursor-pointer sm:pt-2 sm:pb-2 sm:pl-4 sm:pr-4";
const buttonOff =
  "p-2 text-sm font-medium rounded-lg bg-transparent text-zinc-400 cursor-pointer duration-150 ease-in-out hover:bg-zinc-800 hover:text-zinc-50 sm:pt-2 sm:pb-2 sm:pl-4 sm:pr-4";

type TProps = {
  selected: ApiDocs;
};

export default function ModalBody({ selected }: TProps) {
  const [showInfo, setShowInfo] = useState({
    rocket: false,
    launchPad: false,
    launch: true,
  });

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex gap-1 w-fit mx-auto m-4 p-1 bg-zinc-700 rounded-lg">
        <button
          onClick={() =>
            setShowInfo({ rocket: false, launchPad: false, launch: true })
          }
          className={`${
            showInfo.launch ? buttonON : buttonOff
          }`}
        >
          Launch
        </button>
        <button
          onClick={() =>
            setShowInfo({ launchPad: false, rocket: true, launch: false })
          }
          className={`${
            showInfo.rocket ? buttonON : buttonOff
          }`}
        >
          Rocket
        </button>
        <button
          onClick={() =>
            setShowInfo({ rocket: false, launchPad: true, launch: false })
          }
          className={`${
            showInfo.launchPad ? buttonON : buttonOff
          }`}
        >
          Launchpad
        </button>
      </div>

      {showInfo.launch && (
        <div className="p-8 pt-0 w-full grow flex flex-col gap-4 sm:flex-row sm:pt-4">
          <div className="w-full h-1/2 sm:w-1/2 sm:h-full">
            <ImageCarousel
              images={selected.links.flickr.original}
              width={"100%"}
              height={"100%"}
            />
          </div>
          <article className="flex flex-col basis-1/2">
            <h2 className="text-2xl text-zinc-50 font-semibold max-w-full overflow-hidden whitespace-nowrap text-ellipsis">
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
                  Wiki
                </a>
              )}
            </div>
            {selected.details ? (
              <p className="mt-2 text-zinc-400 grow h-0 overflow-y-auto sm:mt-4">
                {selected.details}
              </p>
            ) : (
              <p className="mt-2 text-zinc-400 sm:mt-4">No Details</p>
            )}
          </article>
        </div>
      )}
      {showInfo.rocket && <RocketInfo selected={selected?.rocket} />}
      {showInfo.launchPad && <LaunchpadInfo selected={selected?.launchpad} />}
    </div>
  );
}
