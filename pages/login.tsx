"use client";

import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const ClientLoginPage = () => {
  const router = useRouter();
  const checkingLogin = useAuthRedirect({ requireAuth: false, redirectPath: "/dashboard" });

  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (checkingLogin) return <p className="text-center mt-20">Loading...</p>;

  // Google Login
  const handleGoogleLogin = () => {
    // After Google login, ensure the returned user object has loginType: "google"
    window.location.href = "http://localhost:8000/api/client/login";
  };

  // Request OTP
  const handleSendOtp = async () => {
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const res = await fetch("http://localhost:8000/api/auth/email-otp/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed to send OTP");
      setOtpSent(true);
      setSuccessMsg("OTP sent! Please check your email.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8000/api/auth/email-otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      if (!res.ok) throw new Error("Invalid OTP");
      const data = await res.json();

      // Store user safely with loginType
      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          loginType: "otp",
          token: data.access_token,
        })
      );
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row font-sans">
      {/* Branding */}
      <div className="relative flex w-full lg:w-1/2 items-center justify-center p-8 text-center lg:text-left overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-900 to-black" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative text-white max-w-lg z-10"
        >
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
            Dream Event Studios
          </h1>
          <p className="text-base lg:text-lg text-white/80 mb-6 leading-relaxed">
            Transforming ideas into unforgettable moments with{" "}
            <span className="font-semibold text-purple-300">creativity</span>,{" "}
            <span className="font-semibold text-purple-300">elegance</span>, and{" "}
            <span className="font-semibold text-purple-300">passion</span>.
          </p>
        </motion.div>
      </div>

      {/* Login Form */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Client Login</h2>
          <p className="text-gray-500 mb-8 text-sm lg:text-base">
            Access your personalized event dashboard securely
          </p>

          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full py-3 mb-4 rounded-lg shadow-md bg-gray-100 hover:bg-gray-200 hover:shadow-lg text-gray-800 transition duration-300 ease-in-out"
          >
            <FcGoogle size={26} />
            <span className="font-medium">Sign in with Google</span>
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-2 text-gray-400 text-xs lg:text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {!otpSent ? (
            <>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg border mb-3"
              />
              <button
                onClick={handleSendOtp}
                disabled={loading || !email}
                className="w-full py-3 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full p-3 rounded-lg border mb-3"
              />
              <button
                onClick={handleVerifyOtp}
                disabled={loading || !otp}
                className="w-full py-3 rounded-lg font-medium bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
              {successMsg && <p className="text-green-500 mt-2">{successMsg}</p>}
            </>
          )}

          {error && <p className="text-red-500 mt-3">{error}</p>}
        </motion.div>
      </div>
    </div>
  );
};

export default ClientLoginPage;
