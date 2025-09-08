"use client";

import { CalendarHeart, Briefcase, Cake, Heart, Users } from "lucide-react";
import {
  MotionSection,
  MotionDiv,
  MotionLi,
  MotionUl,
} from "./common/Motion"; // ✅ import typed components

const eventTypes = [
  {
    icon: CalendarHeart,
    title: "Wedding Planning",
    desc: "Elegant, stylish, and stress-free weddings designed just for you.",
  },
  {
    icon: Briefcase,
    title: "Corporate Events",
    desc: "Impactful seminars, conferences, and office parties that reflect your brand.",
  },
  {
    icon: Cake,
    title: "Birthday Parties",
    desc: "Theme-based parties and milestone celebrations brought to life with flair.",
  },
  {
    icon: Heart,
    title: "Engagement & Anniversary",
    desc: "Celebrate love stories with personalized and romantic setups.",
  },
  {
    icon: Users,
    title: "Cultural & Social Events",
    desc: "Mehendi, Sangeet, Baby Showers and more, with tradition and style.",
  },
];

export default function EventTypes() {
  return (
    <MotionSection
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-purple-50/80 via-white to-purple-100 
                 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                 p-8 rounded-3xl shadow-2xl ring-1 ring-purple-200/40"
    >
      <h3 className="text-3xl font-bold mb-10 text-purple-700 dark:text-purple-300 text-center">
        Tailored for Every Occasion
      </h3>

      {/* Mobile / Tablet - Stacked Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden gap-6">
        {eventTypes.map((event, idx) => {
          const Icon = event.icon;
          return (
            <MotionDiv
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md 
                         hover:shadow-xl transition-all duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full 
                              bg-purple-100 dark:bg-purple-700/30 text-purple-600 
                              dark:text-purple-300 mb-4 shadow-md 
                              group-hover:scale-110 transform transition">
                <Icon size={24} />
              </div>
              <h4 className="font-semibold text-purple-700 dark:text-purple-300 mb-2 text-lg">
                {event.title}
              </h4>
              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                {event.desc}
              </p>
            </MotionDiv>
          );
        })}
      </div>

      {/* Laptop / Desktop - Compact List */}
      <MotionUl className="hidden lg:flex flex-col space-y-4">
        {eventTypes.map((event, idx) => {
          const Icon = event.icon;
          return (
            <MotionLi
              key={idx}
              className="flex items-start gap-4 p-4 rounded-lg 
                         hover:bg-purple-50 dark:hover:bg-gray-700 
                         cursor-pointer transition"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="flex-shrink-0 p-2 bg-purple-100 dark:bg-purple-700/30 
                              rounded-full text-purple-600 dark:text-purple-300 shadow-md">
                <Icon size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-purple-700 dark:text-purple-300">
                  {event.title}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {event.desc}
                </p>
              </div>
            </MotionLi>
          );
        })}
      </MotionUl>
    </MotionSection>
  );
}
