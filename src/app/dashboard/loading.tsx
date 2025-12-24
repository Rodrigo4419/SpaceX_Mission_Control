import { LoadingIcon } from "@/components/svg";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="w-fit h-fit">
        <div className="w-[10dvh] h-[10dvh] m-auto"><LoadingIcon height="10dvh" width="10dvh" color="#2b7fff" /></div>
        <p className="text-zinc-400 text-center animate-pulse">Loading page</p>
      </div>
    </div>
  );
}