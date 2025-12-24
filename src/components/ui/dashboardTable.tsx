"use client";
import { useState, useEffect } from "react";
import{ApiDocs, ApiResponse}from "@/types"
import Image from "next/image";
import {parseDate}from "@/utils"
import { Table } from "@/components/ui";

type TProps={
  data:ApiResponse
}
export default function DashboardTable({ data }: TProps) {

  const [selected, setSelected] = useState<ApiDocs>(data.docs[0]);

  return (
    <div className="flex gap-4 flex-col mt-4 2xl:flex-row">
      <div className="relative grow w-full  2xl:w-0">
        <Table 
        data={data} 
        filters={false} 
        //@ts-expect-error 
        setSelected={setSelected}
        />
      </div>

      <div className="flex flex-row gap-4 relative basis-sm 2xl:flex-col">
        <div className="p-4 h-fit w-1/2 relative text-sm border rounded-lg border-zinc-800 2xl:w-full">
          <img
            alt="rocket img"
            src={selected.launchpad.images.large[0]}
            className="rounded-md w-full h-auto"
          />
          <p className="text-sm text-zinc-500 mb-0.5 mt-2">
            {selected.launchpad.locality},&nbsp;{selected.launchpad.region}
          </p>
          <h2 className="flex gap-2 text-lg font-semibold text-zinc-300 mb-0.5">
            {selected.name}
          </h2>
          <p className="text-sm text-zinc-400">
            {selected.launchpad.details.split(".")[0]}
          </p>
        </div>

        <div className="p-4 h-full w-1/2 relative text-sm border rounded-lg border-zinc-800 2xl:w-full 2xl:h-fit">
          <h2 className="text-lg font-semibold text-zinc-300 mb-6">
            Launch Details
          </h2>
          <div className="border-t border-b border-t-zinc-800 border-b-zinc-800 pt-4 pb-4">
            <ul className="flex flex-col gap-1.5 text-zinc-400">
              <li>
                <b>Name:</b>&nbsp;{selected.name}
              </li>
              <li>
                <b>Date:</b>&nbsp;{parseDate(selected.date_utc)}
              </li>
              <li>
                <b>Status:</b>&nbsp;{selected.success === false ? 'Failed'  : 'Successful'}
              </li>
              <li>
                <b>Rocket Name:</b>&nbsp;{selected.rocket.name}
              </li>
              <li>
                <b>Rocket Type:</b>&nbsp;{selected.rocket.type}
              </li>
              <li>
                <b>Company:</b>&nbsp;{selected.rocket.company}
              </li>
              <li>
                <b>Flight Number:</b>&nbsp;{selected.flight_number}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
