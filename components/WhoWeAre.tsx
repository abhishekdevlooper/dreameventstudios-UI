"use client";

import { useAnimation, useInView, motion } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";

export default function WhoWeAre() {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.section
      ref={ref}
      className="bg-purple-50 dark:bg-gray-900 max-w-6xl mx-auto my-20 p-12 rounded-3xl shadow-xl"
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      <motion.h2
        className="text-4xl font-bold text-center text-purple-700 dark:text-purple-300 mb-12"
        variants={itemVariants}
      >
        Who We Are
      </motion.h2>

      <motion.div
        className="grid md:grid-cols-2 gap-12"
        variants={containerVariants}
      >
        <motion.div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Our Mission</h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed"> At <strong>Celebrate With Us</strong>, we transform ordinary events into extraordinary experiences. Every detail is carefully curated to ensure your celebration is memorable, joyful, and stress-free. </p>
        </motion.div>

        <motion.div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8" variants={itemVariants}>
          <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">Our Approach</h3>
          <motion.ul className="text-gray-700 dark:text-gray-300 space-y-3">
            {[
              "🎯 Personalized events tailored to your vision",
              "🤝 Dedicated support from planning to execution",
              "✨ Attention to detail for a flawless celebration",
              "📸 Creating memories worth cherishing forever",
            ].map((item, idx) => (
              <motion.li key={idx} variants={itemVariants}>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>

      <Link href="/packages" passHref legacyBehavior>
        <motion.a
          className="mt-10 inline-block bg-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 mx-auto block text-center"
          variants={itemVariants}
        >
          Explore Our Packages →
        </motion.a>
      </Link>
    </motion.section>
  );
}
