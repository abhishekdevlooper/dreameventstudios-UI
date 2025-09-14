"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type AuthRedirectOptions = {
  requireAuth: boolean;       // true => user must be logged in, false => redirect if logged in
  redirectPath: string;       // where to redirect
};

export const useAuthRedirect = ({ requireAuth, redirectPath }: AuthRedirectOptions) => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedUser = localStorage.getItem("user");

    if (requireAuth) {
      // User must be logged in
      if (!storedUser) {
        router.replace(redirectPath);
      }
    } else {
      // Redirect if already logged in
      if (storedUser) {
        router.replace(redirectPath);
      }
    }

    setChecking(false);
  }, [requireAuth, redirectPath, router]);

  return checking; // true = still checking, false = done checking
};
