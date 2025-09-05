// frontend/pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from "@/context/AuthContext";
import Navbar from '@/components/Navbar';
import WhatsAppButton from "@/components/WhatsAppButton";
import "../styles/calendar.css";       
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Hide Navbar & WhatsApp for admin routes and auth pages
  const hideLayout =
    router.pathname.startsWith('/admin') ||
    router.pathname === '/login' ||
    router.pathname === '/logout';

  return (
    <AuthProvider>
      {!hideLayout && <Navbar />}
      <Component {...pageProps} />
      {!hideLayout && <WhatsAppButton />}
    </AuthProvider>
  );
}
