"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { PartyPopper, Gift, Briefcase } from "lucide-react";
import { MotionSection, MotionDiv, MotionButton } from "./common/Motion"; // adjust path

export default function PackagesTeaser() {
  const router = useRouter();

  const packages = [
    { 
      name: "Birthday Bash", 
      price: "₹25,000", 
      desc: "Decor, Cake, Music & Fun", 
      icon: PartyPopper,
      tag: "Popular" 
    },
    { 
      name: "Wedding Package", 
      price: "₹1,50,000", 
      desc: "Venue, Decor, Catering & DJ", 
      icon: Gift,
      tag: "Best Value" 
    },
    { 
      name: "Corporate Event", 
      price: "₹75,000", 
      desc: "Conference Setup, AV & Food", 
      icon: Briefcase,
      tag: null 
    },
  ];

  return (
    <MotionSection
      className="max-w-6xl mx-auto my-16 text-center px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-6">
        🎉 Our Packages
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-12">
        Customizable plans to fit every occasion — starting at just{" "}
        <span className="font-semibold text-purple-600 dark:text-purple-300">₹25,000</span>.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        {packages.map((pkg, i) => {
          const Icon = pkg.icon;
          return (
            <MotionDiv
              key={i}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 
                         hover:shadow-2xl transition-all duration-300 border border-transparent 
                         hover:border-purple-300 dark:hover:border-purple-600"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
              whileHover={{ y: -8 }}
            >
              {pkg.tag && (
                <span
                  className={`absolute top-3 right-3 text-white text-xs px-3 py-1 rounded-full shadow-md 
                    ${pkg.tag === "Popular" ? "bg-purple-600" : "bg-pink-500"}`}
                >
                  {pkg.tag}
                </span>
              )}

              <div className="flex justify-center mb-4">
                <Icon className="w-8 h-8 text-purple-500" />
              </div>

              <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
              <p className="text-purple-600 dark:text-purple-300 font-bold text-2xl mb-3">
                {pkg.price}
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{pkg.desc}</p>

              <div className="flex justify-center gap-3">
                <MotionButton
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                >
                  Book Now
                </MotionButton>
                <MotionButton
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 rounded-lg border border-purple-500 text-purple-600 
                             dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-gray-700"
                >
                  Get Quote
                </MotionButton>
              </div>
            </MotionDiv>
          );
        })}
      </div>

      <MotionButton
        whileHover={{ scale: 1.05 }}
        onClick={() => router.push("/packages")}
        className="mt-10 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 
                   hover:opacity-90 text-white font-semibold shadow-lg"
      >
        View All Packages →
      </MotionButton>
    </MotionSection>
  );
}
