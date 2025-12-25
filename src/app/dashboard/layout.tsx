import SidebarComponent from "@/components/layout/Sidebar";
import { Header } from "@/components/ui";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <aside className="w-64 hidden bg-zinc-900 p-4 border-r border-zinc-800 sm:block">
        <SidebarComponent />
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <Header />
        {children}
      </main>
    </div>
  );
}
