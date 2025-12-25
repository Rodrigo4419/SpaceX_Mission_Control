import Link from "next/link";

export default function WelcomePage() {
  return (
    <main className="min-h-screen h-[dvh] w-[dvw] flex items-center justify-center gap-6 bg-cover bg-[linear-gradient(rgba(0,0,0,0)_30%,#060628a3),url(/images/backgrounds/welcome_bg.jpg)] overflow-hidden">
      <div className="h-fit w-fit flex flex-col">
        <h1 className="animate-blur-text whitespace-nowrap text-center text-[2rem] leading-[normal] font-bold sm:text-[5.6dvw] sm:leading-[7dvw]">
        SpaceX Mision Control
      </h1>

      <p className="animate-slide-in [animation-delay:2500ms] opacity-0 w-fit max-w-[90%] m-auto mt-2 bg-[#00000066] p-1 rounded-md text-center text-sm sm:text-base">
        Explore and visualize the history of SpaceX Rocket Launches, through a fast, clean and responsive UI
      </p>

      <Link
        href="/dashboard"
        className="animate-pop-up [animation-delay:3000ms] scale-0 w-fit m-auto mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
      >
        Enter Dashboard
      </Link>
      </div>
    </main>
  );
}