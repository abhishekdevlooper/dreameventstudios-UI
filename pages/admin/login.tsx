"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
// import animationData from "../assets/security.json";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Taglines for typewriter effect
  const taglines = [
    "Crafting unforgettable experiences, one event at a time.",
    "Where imagination meets celebration.",
    "Designing dreams. Delivering memories.",
    "Turning your vision into reality with creativity & passion."
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index >= taglines.length) return;

    const current = taglines[index];

    // speed settings
    const typingSpeed = deleting ? 40 : 80;
    const pauseTime = 2000;

    if (!deleting && subIndex === current.length) {
      // pause before deleting
      setTimeout(() => setDeleting(true), pauseTime);
      return;
    }

    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % taglines.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  useEffect(() => {
    setText(taglines[index].substring(0, subIndex));
  }, [subIndex, index]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res: any = await signIn("credentials", { redirect: false, username, password });

    if (res?.error) {
      setError("Invalid username or password");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side - Branding / Animation */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900 items-center justify-center relative overflow-hidden">
        <div className="text-center text-white px-10 z-10">
          <h1 className="text-4xl font-extrabold mb-4">Dream Event Studios</h1>
          <p className="text-lg text-white/80 h-6">
            {text}
            <span className="animate-pulse">|</span>
          </p>
        </div>
        {/* Optional: Animated Illustration */}
        {/* <Lottie animationData={animationData} loop className="absolute bottom-0 w-2/3" /> */}
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
        <div className="bg-black/40 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-full max-w-sm space-y-6">
          <h1 className="text-3xl font-extrabold text-white text-center mb-6">Admin Login</h1>
          {error && <p className="text-red-400 text-center">{error}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-purple-800 transition"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-white/60 text-sm">&copy; 2025 Dream Event Studios</p>
        </div>
      </div>
    </div>
  );
}

// Server-side redirect: redirect already logged-in users to /admin
export async function getServerSideProps(context: any) {
  const { getSession } = await import("next-auth/react");
  const session = await getSession(context);

  if (session) {
    return {
      redirect: { destination: "/admin", permanent: false },
    };
  }

  return { props: {} };
}
