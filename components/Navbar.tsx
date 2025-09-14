"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Briefcase,
  Image,
  Phone,
  Calendar,
  MessageCircleHeart,
  Gift,
} from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: <Home size={16} className="inline mr-2" /> },
  { href: "/services", label: "Services", icon: <Briefcase size={16} className="inline mr-2" /> },
  { href: "/gallery", label: "Gallery", icon: <Image size={16} className="inline mr-2" /> },
  { href: "/contact", label: "Contact", icon: <Phone size={16} className="inline mr-2" /> },
  { href: "/ClientBookingPage", label: "Book", icon: <Calendar size={16} className="inline mr-2" /> },
  { href: "/testimonials", label: "Testimonials", icon: <MessageCircleHeart size={16} className="inline mr-2" /> },
  { href: "/packages", label: "Packages", icon: <Gift size={16} className="inline mr-2" /> },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-gradient-to-r from-purple-100/80 via-white/80 to-purple-100/80 dark:from-purple-900/70 dark:via-gray-900/70 dark:to-purple-900/70 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-purple-200 dark:border-purple-800 px-6 py-4 rounded-b-2xl transition-all">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" scroll={true}>
          <h1 className="text-2xl font-extrabold text-purple-700 dark:text-purple-200 tracking-tight hover:scale-105 transition cursor-pointer">
            Dream Event Studios
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-6 text-sm font-medium items-center">
          {navLinks.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center transition-all hover:text-purple-600 dark:hover:text-purple-400 ${
                pathname === href
                  ? "text-purple-700 dark:text-purple-300 underline underline-offset-4"
                  : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-purple-700 dark:text-purple-200"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <div className="flex flex-col mt-4 space-y-3 md:hidden text-sm font-medium animate-fade-in">
          {navLinks.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center transition-all hover:text-purple-600 dark:hover:text-purple-400 ${
                pathname === href
                  ? "text-purple-700 dark:text-purple-300 underline underline-offset-4"
                  : "text-gray-800 dark:text-gray-200"
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
