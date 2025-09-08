"use client";

import Link from "next/link";
import {
  MotionSection,
  MotionH1,
  MotionP,
  MotionDiv,
  MotionButton,
} from "@/components/common/Motion"; // ✅ typed motion imports
// import Lottie from "lottie-react";
// import celebrationAnimation from "@/public/animations/celebration.json"; // Optional

export default function Hero() {
  const confetti = Array.from({ length: 15 });

  // Variants for staggered buttons
  const buttonContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const buttonVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <MotionSection
      className="relative bg-gradient-to-br from-purple-100 via-white to-purple-50 dark:from-gray-900 dark:via-black dark:to-gray-800 text-center py-24 px-6 rounded-xl shadow-md overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading with bounce-in */}
        <MotionH1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: [-40, 0, -10, 0] }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl font-extrabold mb-4 leading-tight text-purple-700 dark:text-purple-300"
        >
          Your Dream Event Starts Here
        </MotionH1>

        {/* Subheading */}
        <MotionP
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xl text-gray-700 dark:text-gray-300 mb-6"
        >
          Elevate your celebrations with expert planning, stunning décor, and unforgettable experiences.
        </MotionP>

        {/* Optional Lottie animation */}
        {/* <div className="w-48 mx-auto mb-6">
          <Lottie animationData={celebrationAnimation} loop autoplay />
        </div> */}

        {/* Buttons with stagger */}
        <MotionDiv
          variants={buttonContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row justify-center gap-6 mt-6 relative z-10"
        >
          {/* Book Now */}
          <MotionDiv variants={buttonVariant}>
            <Link href="/booking">
              <MotionButton
                whileHover={{ scale: 1.1, rotate: [0, 3, -3, 0] }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-full shadow-lg text-lg font-semibold"
              >
                🎉 Book Now
              </MotionButton>
            </Link>
          </MotionDiv>

          {/* Contact Us */}
          <MotionDiv variants={buttonVariant}>
            <Link href="/contact">
              <MotionButton
                whileHover={{ scale: 1.1, rotate: [0, 3, -3, 0] }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-500 to-teal-400 text-white px-8 py-3 rounded-full shadow-lg text-lg font-semibold"
              >
                📩 Contact Us
              </MotionButton>
            </Link>
          </MotionDiv>
        </MotionDiv>
      </div>

      {/* Confetti Effect */}
      {confetti.map((_, i) => (
        <MotionDiv
          key={i}
          className="absolute w-2 h-2 rounded-full bg-pink-400 dark:bg-purple-500 opacity-70"
          style={{
            top: `${20 + Math.random() * 60}%`,
            left: `${10 + Math.random() * 80}%`,
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
    </MotionSection>
  );
}
