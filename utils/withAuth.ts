"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component: any) {
  return function AuthenticatedComponent(props: any) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // wait for session
      if (!session) router.push("/login");
    }, [session, status, router]);

    if (status === "loading" || !session) {
      return <p className="text-center text-lg text-gray-600">Loading...</p>;
    }

    return <Component {...props} />;
  };
}
