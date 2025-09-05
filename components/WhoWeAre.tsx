"use client";

import { motion, useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";

export default function WhoWeAre() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  const listItem = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      ref={ref}
      className="relative max-w-6xl mx-auto my-20 px-6 md:px-12 py-16 rounded-3xl bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-xl overflow-hidden"
    >
      {/* Decorative Circles */}
      <div className="absolute -top-16 -left-16 w-56 h-56 bg-purple-200 rounded-full opacity-30 dark:bg-purple-700"></div>
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-pink-200 rounded-full opacity-20 dark:bg-pink-700"></div>

      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center text-purple-700 dark:text-purple-300 mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        Who We Are
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Mission Card */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
          initial={{ x: -50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            At <strong>Celebrate With Us</strong>, we transform ordinary events into extraordinary experiences. 
            Every detail is carefully curated to ensure your celebration is memorable, joyful, and stress-free.
          </p>
        </motion.div>

        {/* Approach Card with scroll-triggered bullet animations */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
          initial={{ x: 50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
            Our Approach
          </h3>
          <motion.ul
            className="text-gray-700 dark:text-gray-300 space-y-3 leading-relaxed"
            initial="hidden"
            animate={controls}
          >
            {[
              "🎯 Personalized events tailored to your vision",
              "🤝 Dedicated support from planning to execution",
              "✨ Attention to detail for a flawless celebration",
              "📸 Creating memories worth cherishing forever",
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={listItem}
                transition={{ delay: index * 0.2 }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </div>

      {/* Call to Action */}
      <motion.a
        href="/packages"
        className="mt-10 inline-block bg-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 mx-auto"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Explore Our Packages →
      </motion.a>
    </section>
  );
}
