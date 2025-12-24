import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-6 bg-cover bg-[url(/images/backgrounds/404_bg.jpg)]">
      <h1 className="text-[12rem] leading-48 font-bold">404</h1>

      <p className="text-zinc-50 text-2xl text-center max-w-md">
        It seems you got a little bit lost.
      </p>

      <Link
        href="/"
        className="rounded-md bg-white px-4 py-2 text-black font-medium hover:bg-neutral-200"
      >
        Go back home
      </Link>
    </div>
  );
}