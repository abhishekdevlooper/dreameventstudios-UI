"use client";

import CountUp from "react-countup";
import { MotionDiv } from "./common/Motion"; // adjust the path

const stats = [
  { label: "Events Managed", value: 250 },
  { label: "Happy Clients", value: 180 },
  { label: "Weddings Planned", value: 100 },
  { label: "Team Members", value: 12 },
];

export default function Stats() {
  return (
    <div className="bg-gradient-to-r from-purple-50 via-white to-purple-100 dark:from-gray-800 dark:to-gray-900 py-16 px-6 rounded-xl shadow-inner">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, index) => (
          <MotionDiv
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md hover:shadow-xl transition"
          >
            <p className="text-4xl font-extrabold text-purple-700 dark:text-purple-300">
              <CountUp end={stat.value} duration={2} />+
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-400 mt-2">
              {stat.label}
            </p>
          </MotionDiv>
        ))}
      </div>
    </div>
  );
}
