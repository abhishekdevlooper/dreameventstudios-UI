"use client";

import Link from "next/link";
import React from "react";
import { MotionDiv, MotionH3, MotionButton } from "./common/Motion"; // adjust path if needed

export default function CallToAction() {
  const confetti = Array.from({ length: 15 });

  return (
    <MotionDiv className="relative text-center py-20 bg-gradient-to-r from-purple-100 to-white dark:from-gray-800 dark:to-gray-900 mt-16 rounded-3xl shadow-xl overflow-hidden px-6">
      
      {/* Floating Confetti */}
      {confetti.map((_, i) => (
        <MotionDiv
          key={i}
          className="absolute w-2 h-2 rounded-full bg-pink-400 dark:bg-purple-500 opacity-70"
          style={{
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, 10, -10, 0],
            opacity: [0.3, 0.9, 0.3],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Heading */}
      <MotionH3
        className="text-3xl md:text-4xl font-bold mb-8 text-purple-700 dark:text-purple-300"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Ready to make your event unforgettable?
      </MotionH3>

      {/* Contact Us Button */}
      <Link href="/contact">
        <MotionButton
          whileHover={{ scale: 1.1, rotate: [0, 3, -3, 0] }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-4 rounded-full shadow-2xl text-lg font-semibold overflow-hidden"
        >
          📩 Contact Us
        </MotionButton>
      </Link>

      {/* Mini Confetti Burst on Hover (CSS) */}
      <div className="absolute inset-0 pointer-events-none"></div>
    </MotionDiv>
  );
}
