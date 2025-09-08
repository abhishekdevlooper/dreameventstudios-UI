"use client";

import { useState } from "react";
import { MotionSection, MotionDiv } from "@/components/common/Motion";

export default function AwardsSection() {
  const awards = [
    "Best Wedding Planner 2023",
    "Corporate Event Excellence",
    "Top Event Firm India",
    "ISO Certified",
  ];

  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <MotionSection
      className="max-w-6xl mx-auto my-16 text-center px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-12">
        🏆 Awards & Certifications
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {awards.map((award, i) => (
          <div
            key={i}
            className="relative p-6 rounded-2xl shadow-lg bg-gradient-to-tr from-purple-100 via-white to-purple-50 
              dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 hover:shadow-2xl 
              transition transform hover:-translate-y-2 cursor-pointer"
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <MotionDiv whileHover={{ scale: 1.05 }} className="flex flex-col items-center">
              <span className="text-xl mb-2">🏅</span>
              <p className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-200 text-center">
                {award}
              </p>
            </MotionDiv>

            {hoveredIdx === i &&
              [...Array(15)].map((_, idx) => {
                const delay = Math.random() * 1.5;
                const size = Math.random() * 3 + 2;
                const x = Math.random() * 60 - 30;
                const y = Math.random() * -60;
                return (
                  <MotionDiv
                    key={idx}
                    className="absolute rounded-full bg-yellow-400 dark:bg-yellow-300"
                    style={{ width: size, height: size, top: "50%", left: "50%" }}
                    animate={{
                      x: [0, x],
                      y: [0, y],
                      opacity: [1, 0],
                      scale: [1, 0],
                    }}
                    transition={{
                      duration: 1 + Math.random(),
                      delay,
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                );
              })}
          </div>
        ))}
      </div>
    </MotionSection>
  );
}
