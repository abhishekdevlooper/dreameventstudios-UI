'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Briefcase, Image, Phone, Calendar, MessageCircleHeart, Gift } from 'lucide-react';
import { getClientToken, removeClientToken } from '../utils/auth-client';

type User = {
  name?: string;
  email?: string;
  picture?: string;
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    setProfileOpen(false);
    const token = getClientToken();
    if (token) {
      setLoggedIn(true);
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      });
    } else {
      setLoggedIn(false);
      setUser(null);
    }
  }, [pathname]);

  const navLinks = [
    { href: '/', label: 'Home', icon: <Home size={16} className="inline mr-2" /> },
    { href: '/services', label: 'Services', icon: <Briefcase size={16} className="inline mr-2" /> },
    { href: '/gallery', label: 'Gallery', icon: <Image size={16} className="inline mr-2" /> },
    { href: '/contact', label: 'Contact', icon: <Phone size={16} className="inline mr-2" /> },
    { href: '/booking', label: 'Book', icon: <Calendar size={16} className="inline mr-2" /> },
    { href: '/testimonials', label: 'Testimonials', icon: <MessageCircleHeart size={16} className="inline mr-2" /> },
    { href: '/packages', label: 'Packages', icon: <Gift size={16} className="inline mr-2" /> },
  ];

  const handleLogout = () => {
    removeClientToken();
    setLoggedIn(false);
    setUser(null);
    setProfileOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-100/80 via-white/80 to-purple-100/80 dark:from-purple-900/70 dark:via-gray-900/70 dark:to-purple-900/70 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-purple-200 dark:border-purple-800 px-6 py-4 rounded-b-2xl transition-all">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
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
                  ? 'text-purple-700 dark:text-purple-300 underline underline-offset-4'
                  : 'text-gray-800 dark:text-gray-200'
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}

          {/* Profile / Login */}
          {loggedIn && user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center space-x-2 hover:text-purple-600 dark:hover:text-purple-400"
              >
                {user.picture ? (
                  <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 bg-gray-400 rounded-full" />
                )}
                <span className="hidden md:inline">{user.name || user.email}</span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg py-2 z-50">
                  <p className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">{user.name || user.email}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-700 dark:text-red-400 rounded"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="text-purple-700 dark:text-purple-200 hover:underline">
              Login
            </Link>
          )}
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
                  ? 'text-purple-700 dark:text-purple-300 underline underline-offset-4'
                  : 'text-gray-800 dark:text-gray-200'
              }`}
            >
              {icon}
              {label}
            </Link>
          ))}

          {/* Profile / Login for mobile */}
          {loggedIn && user ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-700 rounded"
            >
              {user.picture && <img src={user.picture} alt={user.name} className="w-6 h-6 rounded-full" />}
              <span>Logout</span>
            </button>
          ) : (
            <Link href="/login" className="text-purple-700 dark:text-purple-200 px-4 py-2">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
