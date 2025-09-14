"use client";

import React from "react";
import { motion } from "framer-motion";

const LoginDisabledPage = () => {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row font-sans">
      {/* Branding Section */}
      <div className="relative flex w-full lg:w-1/2 items-center justify-center p-8 text-center lg:text-left overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-purple-900 to-black" />
        <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-52 h-52 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-10 -left-20 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl animate-pulse" />

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
            Our client login is currently{" "}
            <span className="font-semibold text-purple-300">temporarily disabled</span>. 
            We apologize for the inconvenience.
          </p>
          <p className="text-sm text-white/60">
            Please check back shortly. Thank you for your patience.
          </p>
        </motion.div>
      </div>

      {/* Message Section */}
      <div className="flex flex-1 items-center justify-center bg-gray-50 p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md text-center"
        >
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
            Login Disabled
          </h2>
          <p className="text-gray-500 mb-6 text-sm lg:text-base">
            Our client login feature is temporarily disabled for maintenance.
            You can still explore our website, or contact support if needed.
          </p>

          {/* Support Link */}
          <p className="text-xs lg:text-sm text-gray-500 mb-6">
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

export default LoginDisabledPage;
