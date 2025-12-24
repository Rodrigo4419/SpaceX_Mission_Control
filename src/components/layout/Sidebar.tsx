import Link from "next/link";
import { SpacexIcon, HomeIcon, ListIcon } from "@/components/svg";

export default function SidebarComponent() {
  return (
    <>
      <header className="flex gap-4 pb-4 border-b border-zinc-800 items-center">
        <SpacexIcon height="2rem" width="2rem" />
        <h4 className="text-2xl font-semibold">SpaceX</h4>
      </header>
      <ul className="flex flex-col gap-2 mt-4">
        <li className="flex p-1.5 gap-4 rounded-xl items-center text-sm transition-all duration-150 cursor-pointer hover:bg-zinc-800">
          <HomeIcon width="1rem" height="1rem" />
          <Link href="/dashboard">Home</Link> 
        </li>
        <li className="flex p-1.5 gap-4 rounded-xl items-center text-sm transition-all duration-150 cursor-pointer hover:bg-zinc-800">
          <ListIcon width="1rem" height="1rem" />
          <Link href="/dashboard/history">History</Link> 
        </li>
      </ul>
    </>
  );
}
