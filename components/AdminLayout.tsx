"use client";

import Link from "next/link";
import { useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

const sidebarLinks = [
  { href: "/admin/", label: "Analytics", icon: "🏠" },
  { href: "/admin/revenue", label: "Revenue", icon: "💰" },
  { href: "/admin/packages", label: "Packages", icon: "📦" },
  { href: "/admin/leads", label: "Leads", icon: "👥" },
  { href: "/admin/bookings", label: "Bookings", icon: "📅" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

type AdminLayoutProps = {
  children: ReactNode;
  sidebarOpen?: boolean; // allow parent to control sidebar
};

export default function AdminLayout({ children, sidebarOpen: sidebarOpenProp }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(sidebarOpenProp ?? true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const router = useRouter();

  // Update internal state if parent prop changes
  useEffect(() => {
    if (typeof sidebarOpenProp === "boolean") setSidebarOpen(sidebarOpenProp);
  }, [sidebarOpenProp]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-20 flex flex-col bg-gradient-to-b from-purple-700 via-purple-800 to-purple-900 text-white shadow-xl
          transition-all duration-300
          ${sidebarOpen ? "w-64" : "w-20"}
          md:relative md:min-h-screen
          ${mobileSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        style={{ minHeight: "100vh" }}
      >
        <div className="flex flex-col flex-1 p-6">
          <h2 className={`text-3xl font-extrabold mb-8 tracking-wide transition-opacity duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0"}`}>
            Admin Panel
          </h2>

          <nav className="flex-1 flex flex-col justify-start space-y-3">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  flex items-center gap-3 px-4 py-2 rounded-xl transition-colors
                  ${router.pathname === link.href ? "bg-purple-600 font-semibold" : "hover:bg-purple-600"}
                  ${!sidebarOpen ? "justify-center px-0" : ""}
                `}
              >
                <span className="text-xl">{link.icon}</span>
                {sidebarOpen && <span>{link.label}</span>}
              </Link>
            ))}
          </nav>

          <div className="mt-auto">
            <Link
              href="/admin/logout"
              className={`
                flex items-center gap-3 px-4 py-2 rounded-xl bg-purple-600 text-center hover:bg-purple-500 transition-colors
                ${!sidebarOpen ? "justify-center px-0" : ""}
              `}
            >
              <span className="text-xl">⏻</span>
              {sidebarOpen && <span>Logout</span>}
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-10 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-gray-100 p-6 md:p-8 transition-all duration-300">
        {/* Toggle Buttons */}
        <div className="flex items-center mb-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:inline-flex px-3 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-500 shadow-lg transition-colors"
            aria-label="Toggle Sidebar"
          >
            {sidebarOpen ? "✖" : "☰"}
          </button>

          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="md:hidden px-3 py-2 rounded-full bg-purple-600 text-white hover:bg-purple-500 shadow-lg transition-colors"
            aria-label="Open Sidebar"
          >
            ☰
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}
