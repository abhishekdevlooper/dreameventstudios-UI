"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";

const ClientLoginPage = () => {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/api/client/login";
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row font-sans">
      {/* Branding Section with Luxury Background */}
      <div className="relative flex w-full lg:w-1/2 items-center justify-center p-8 text-center lg:text-left overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-900 to-black" />

        {/* Abstract Shapes */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-52 h-52 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />

        {/* Content */}
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
          <p className="text-sm text-white/60">
            Welcome to your exclusive Client Portal — where your vision becomes reality.
          </p>
        </motion.div>
      </div>

      {/* Login Section */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Client Login
          </h2>
          <p className="text-gray-500 mb-8 text-sm lg:text-base">
            Access your personalized event dashboard securely
          </p>

          {/* Google Login Button */}
          <button
            onClick={handleLogin}
            className="flex items-center justify-center gap-3 w-full py-3 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 hover:shadow-lg transition duration-300 ease-in-out"
          >
            <FcGoogle size={26} />
            <span className="text-gray-800 font-medium">Sign in with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-2 text-gray-400 text-xs lg:text-sm">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Support Text */}
          <p className="text-xs lg:text-sm text-gray-500">
            Need help? Contact{" "}
            <a
              href="mailto:support@dreameventstudios.com"
              className="text-purple-600 hover:underline"
            >
              support@dreameventstudios.com
            </a>
          </p>

          {/* Footer */}
          <p className="mt-6 text-xs text-gray-400">
            &copy; 2025 Dream Event Studios · All Rights Reserved
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientLoginPage;
