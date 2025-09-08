"use client";

import Image from "next/image";
import {
  MotionSection,
  MotionDiv,
  MotionH2,
} from "@/components/common/Motion"; // ✅ import typed motion components

const galleryImages = [
  "/images/event1.jpg",
  "/images/event2.jpg",
  "/images/event3.jpg",
  "/images/event4.jpg",
  "/images/event5.jpg",
  "/images/event6.jpg",
  "/images/event7.jpg",
  "/images/event8.jpg",
];

export default function EventGallery() {
  return (
    <MotionSection
      className="max-w-6xl mx-auto my-16 px-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <MotionH2 className="text-3xl font-bold text-purple-700 dark:text-purple-300 text-center mb-12">
        Event Gallery
      </MotionH2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryImages.map((src, i) => (
          <MotionDiv
            key={i}
            whileHover={{ scale: 1.05 }}
            className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition transform hover:shadow-2xl"
          >
            <Image
              src={src}
              alt={`Event ${i + 1}`}
              width={600}
              height={400}
              className="w-full h-48 object-cover"
              loading="lazy" // ✅ keeps lazy loading
            />
          </MotionDiv>
        ))}
      </div>
    </MotionSection>
  );
}
