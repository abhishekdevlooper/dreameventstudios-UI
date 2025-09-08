"use client";

import { Sparkles, BadgeCheck, DollarSign, Clock, Award, Users, Gift, Star } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  { icon: Sparkles, label: "Creative Concepts & Themes" },
  { icon: BadgeCheck, label: "Professional Planning & Execution" },
  { icon: DollarSign, label: "Affordable Packages Tailored to You" },
  { icon: Clock, label: "On-Time Delivery, Every Time" },
  { icon: Award, label: "Award-Winning Team" },
  { icon: Users, label: "Dedicated Event Coordinators" },
  { icon: Gift, label: "Personalized Services" },
  { icon: Star, label: "Memorable Experiences" },
];

export default function WhyChooseUs() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-purple-50/80 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-2xl ring-1 ring-purple-200/40"
    >
      <h3 className="text-3xl font-bold mb-8 text-purple-700 dark:text-purple-300 text-center">
        Why Choose Us
      </h3>

      {/* Mobile & Tablet: Keep stacked cards as-is */}
      <div className="block lg:hidden space-y-4">
        {reasons.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              className="flex gap-4 items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="p-3 bg-purple-100 dark:bg-purple-700/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-300 shadow-md">
                <Icon size={20} />
              </div>
              <span className="font-medium text-gray-700 dark:text-gray-200 text-sm sm:text-base">
                {item.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Laptop & Desktop: Vertical Timeline Layout */}
      <div className="hidden lg:flex flex-col relative border-l-2 border-purple-300 dark:border-purple-700 pl-8 space-y-8">
        {reasons.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              className="flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="flex-shrink-0 bg-gradient-to-br from-purple-200 to-purple-400 dark:from-purple-700/30 dark:to-purple-600/40 rounded-full p-4 shadow-md">
                <Icon size={24} className="text-purple-700 dark:text-purple-300" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                  {item.label}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {/* Optional description */}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
