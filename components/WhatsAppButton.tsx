"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const pathname = usePathname();

  // Ensure code runs only on the client (to avoid hydration error)
  const [isClient, setIsClient] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Hide only on /gallery
  if (!isClient || pathname === "/gallery" || !isVisible) return null;

  // Long press to hide
  const handleLongPressStart = () => {
    const timer = setTimeout(() => {
      setIsVisible(false); // Only hides till refresh
    }, 1500);
    setPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (pressTimer) clearTimeout(pressTimer);
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <a
      href="https://wa.me/918892467800?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20your%20event%20services"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 animate-bounceSlow"
      onMouseDown={handleLongPressStart}
      onTouchStart={handleLongPressStart}
      onMouseUp={handleLongPressEnd}
      onTouchEnd={handleLongPressEnd}
      aria-label="WhatsApp Chat"
    >
      <div className="bg-green-500 hover:bg-green-600 text-white rounded-full p-3 shadow-lg transition-all duration-300 flex items-center gap-2">
        {isMobile ? (
          <MessageCircle className="w-6 h-6" />
        ) : (
          <>
            <MessageCircle className="w-5 h-5" />
            <span className="hidden sm:inline font-medium">Chat with us</span>
          </>
        )}
      </div>
    </a>
  );
};

export default WhatsAppButton;
