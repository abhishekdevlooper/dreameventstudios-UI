"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function WhoWeAre() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative py-20 px-6 md:px-16 bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-6 text-purple-700 dark:text-purple-300"
        >
          Who We Are
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          We are a passionate team dedicated to crafting unforgettable events.
          From weddings to corporate gatherings, our goal is to turn your
          vision into a seamless, memorable experience.
        </motion.p>

        <Link href="/packages" passHref legacyBehavior>
          <motion.a
            className="mt-10 inline-block bg-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 mx-auto"
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Explore Packages
          </motion.a>
        </Link>
      </div>
    </motion.section>
  );
}
