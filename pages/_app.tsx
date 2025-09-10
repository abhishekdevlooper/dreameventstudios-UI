// frontend/pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";
import "../styles/calendar.css";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader"; // 👈 create this file
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setLoading(true);
      NProgress.start();
    };
    const handleStop = () => {
      setLoading(false);
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  // Hide Navbar & WhatsApp for admin routes and auth pages
  const hideLayout =
    router.pathname.startsWith("/admin") ||
    router.pathname === "/login" ||
    router.pathname === "/logout";

  return (
    <AuthProvider>
      {loading && <Loader />} {/* 👈 Overlay spinner */}
      {!hideLayout && <Navbar />}
      <Component {...pageProps} />
      {!hideLayout && <WhatsAppButton />}
    </AuthProvider>
  );
}
