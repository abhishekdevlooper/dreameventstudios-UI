"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CallToAction() {
  const confetti = Array.from({ length: 15 });

  return (
    <section className="relative text-center py-20 bg-gradient-to-r from-purple-100 to-white dark:from-gray-800 dark:to-gray-900 mt-16 rounded-3xl shadow-xl overflow-hidden px-6">
      
      {/* Floating Confetti */}
      {confetti.map((_, i) => (
        <motion.div
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
      <motion.h3
        className="text-3xl md:text-4xl font-bold mb-12 text-purple-700 dark:text-purple-300"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Ready to make your event unforgettable?
      </motion.h3>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        {/* Book Now */}
        <Link href="/booking">
          <motion.button
            whileHover={{ scale: 1.1, rotate: [0, 3, -3, 0] }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-10 py-4 rounded-full shadow-2xl text-lg font-semibold overflow-hidden"
          >
            🎉 Book Now
          </motion.button>
        </Link>

        {/* Contact Us */}
        <Link href="/contact">
          <motion.button
            whileHover={{ scale: 1.1, rotate: [0, 3, -3, 0] }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 bg-gradient-to-r from-green-500 to-teal-400 text-white px-10 py-4 rounded-full shadow-2xl text-lg font-semibold overflow-hidden"
          >
            📩 Contact Us
          </motion.button>
        </Link>
      </div>

      {/* Mini Confetti Burst on Hover (CSS) */}
      <div className="absolute inset-0 pointer-events-none"></div>
    </section>
  );
}
