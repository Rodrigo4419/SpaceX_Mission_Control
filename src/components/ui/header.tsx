"use client"
import { usePathname } from "next/navigation";
import { ChevronRightIcon, MenuIcon } from "@/components/svg";
import Drawer from "@/components/layout/Drawer";
import { useState } from "react";

const titlesMap: Record<string, string> = {
  "/": "Home",
  "/dashboard": "Home",
  "/dashboard/history": "History",
  "/profile": "My Profile",
};


export default function HeaderComponent() {

const pathname = usePathname();
const title = titlesMap[pathname] ?? "Page";
const [showDrawer, setShowDrawer] =useState(false)
  return (
    <header className="max-w-425 m-auto fixed top-0 left-0 w-dvw h-24 p-4 bg-zinc-900 border-b border-b-zinc-800 z-10 sm:relative sm:w-auto sm:h-fit sm:p-0 sm:bg-transparent sm:border-b-0 sm:border-b-transparent">
      <div className="flex gap-x-1.5 items-center text-sm text-zinc-400 font-medium mb-5">
        <span>Dashboard</span>
        <ChevronRightIcon height="1rem" width="1rem" />
        <span>{title}</span>
      </div>
      <h2 className="font-bold">Overview</h2>
      <button
           onClick={() => setShowDrawer(!showDrawer)}
          className="absolute bottom-4 right-4 h-8 w-8 rounded-md border border-zinc-700 flex items-center justify-center disabled:text-zinc-800 disabled:pointer-events-none sm:hidden"
        >
          <MenuIcon width="1rem" height="1rem" />
        </button>
        <Drawer show={showDrawer} setShow={setShowDrawer}/>
    </header>
  );
}
