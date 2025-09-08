"use client";

import { useAnimation, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import {
  MotionSection,
  MotionH2,
  MotionDiv,
  MotionUl,
  MotionLi,
  MotionA,
} from "./common/Motion";

export default function WhoWeAre() {
  // ✅ properly typed ref for useInView
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-50px",
  });
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
    <MotionSection
      ref={ref}
      className="relative max-w-6xl mx-auto my-20 px-6 md:px-12 py-16 rounded-3xl bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-xl overflow-hidden"
    >
      {/* Decorative Circles */}
      <MotionDiv className="absolute -top-16 -left-16 w-56 h-56 bg-purple-200 rounded-full opacity-30 dark:bg-purple-700" />
      <MotionDiv className="absolute -bottom-16 -right-16 w-72 h-72 bg-pink-200 rounded-full opacity-20 dark:bg-pink-700" />

      {/* Heading */}
      <MotionH2
        className="text-4xl md:text-5xl font-bold text-center text-purple-700 dark:text-purple-300 mb-12"
        initial={{ y: -20, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        Who We Are
      </MotionH2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Mission Card */}
        <MotionDiv
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
          initial={{ x: -50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
            Our Mission
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            At <strong>Celebrate With Us</strong>, we transform ordinary events
            into extraordinary experiences. Every detail is carefully curated to
            ensure your celebration is memorable, joyful, and stress-free.
          </p>
        </MotionDiv>

        {/* Approach Card */}
        <MotionDiv
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
          initial={{ x: 50, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">
            Our Approach
          </h3>
          <MotionUl
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
              <MotionLi
                key={index}
                variants={listItem}
                transition={{ delay: index * 0.2 }}
              >
                {item}
              </MotionLi>
            ))}
          </MotionUl>
        </MotionDiv>
      </div>

      {/* Call to Action */}
      <Link href="/packages" passHref legacyBehavior>
        <MotionA
          className="mt-10 inline-block bg-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 mx-auto"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Explore Our Packages →
        </MotionA>
      </Link>
    </MotionSection>
  );
}
