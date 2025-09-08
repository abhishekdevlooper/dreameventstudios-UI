"use client";

import React, { useEffect, useState } from "react";
import { MotionDiv } from "./common/Motion"; // adjust the path as needed

const partners = [
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
];

export default function OurPartners() {
  const [speed, setSpeed] = useState(20); // default duration

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSpeed(30); // mobile: slower
      } else if (window.innerWidth < 1024) {
        setSpeed(20); // tablet: medium
      } else {
        setSpeed(15); // desktop: faster
      }
    };

    handleResize(); // run once
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="my-16 py-12 bg-gradient-to-r from-white to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-purple-700 dark:text-purple-300 mb-8">
        Our Trusted Partners
      </h2>

      <div className="overflow-hidden relative w-full">
        <MotionDiv
          className="flex space-x-12 items-center w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: speed,
            ease: "linear",
          }}
        >
          {[...partners, ...partners].map((logo, i) => (
            <img
              key={i}
              src={logo}
              alt="partner logo"
              className="h-8 sm:h-10 md:h-12 lg:h-16 xl:h-20 object-contain grayscale hover:grayscale-0 transition"
            />
          ))}
        </MotionDiv>
      </div>
    </section>
  );
}
