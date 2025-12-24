import Link from "next/link";

export default function WelcomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 bg-cover bg-[linear-gradient(rgba(0,0,0,0)_30%,rgba(10,37,117,0.73)),url(/images/backgrounds/welcome_bg.jpg)]">
      <h1 className="text-8xl font-bold">
        SpaceX Mision Control
      </h1>

      <p className="bg-[#00000066] p-1 rounded-md">
        Explore and visualize the history of SpaceX Rocket Launches, through a fast, clean and responsive UI
      </p>

      <Link
        href="/dashboard"
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-800 transition"
      >
        Enter Dashboard
      </Link>
    </main>
  );
}