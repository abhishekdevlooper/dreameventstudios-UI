"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setClientToken, removeClientToken } from "../utils/auth-client";

const LoginSuccess = () => {
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");

      if (!token) {
        router.replace("/login");
        return;
      }

      setClientToken(token);

      try {
        const res = await axios.get("http://localhost:8000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // store user in localStorage
        localStorage.setItem("user", JSON.stringify(res.data));

        // redirect to dashboard
        router.replace("/dashboard");
      } catch (err) {
        console.error("Failed to fetch user:", err);
        removeClientToken();
        router.replace("/login");
      }
    };

    fetchUser();
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-600 text-white">
      <h1 className="text-2xl font-bold animate-pulse">Logging you in...</h1>
    </div>
  );
};

export default LoginSuccess;
