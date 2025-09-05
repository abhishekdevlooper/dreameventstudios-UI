"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function LogoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Automatically sign out on page load
    signOut({ redirect: false }).then(() => {
      setLoading(false);
    });
  }, []);

  const handleRedirect = () => {
    router.push("/admin/login"); // redirect to login page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900">
      <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl shadow-xl w-full max-w-sm text-center space-y-6">
        <h1 className="text-3xl font-extrabold text-white">
          {loading ? "Signing Out..." : "Logged Out"}
        </h1>
        {!loading && (
          <>
            <p className="text-white/80">
              You have been successfully logged out of the Admin Panel.
            </p>
            <button
              onClick={handleRedirect}
              className="w-full py-3 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-800 transition"
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}
