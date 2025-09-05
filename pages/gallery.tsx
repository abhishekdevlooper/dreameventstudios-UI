'use client';

import SEO from "@/components/SEO";
import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { motion } from "framer-motion";

const allImages = [
  { src: "/images/event1.jpg", category: "Wedding" },
  { src: "/images/event2.jpg", category: "Corporate" },
  { src: "/images/event3.jpg", category: "Social" },
  { src: "/images/event4.jpg", category: "Wedding" },
  { src: "/images/event5.jpg", category: "Corporate" },
  { src: "/images/event6.jpg", category: "Social" },
  { src: "/images/event7.jpg", category: "Wedding" },
  { src: "/images/event8.jpg", category: "Corporate" },
];

const categories = ["All", "Wedding", "Corporate", "Social"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredImages =
    activeCategory === "All"
      ? allImages
      : allImages.filter((img) => img.category === activeCategory);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-black py-10 px-6 min-h-screen text-gray-800 dark:text-white">
      <SEO
        title="Our Event Gallery | Celebrate With Us"
        description="Browse our gallery to see stunning weddings, parties, and corporate events. Real stories, real celebrations."
        keywords="event gallery, wedding photos, birthday event, corporate event decor"
      />

      <motion.h2
        className="text-4xl font-extrabold text-center mb-8 text-purple-700 dark:text-purple-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore Our Event Gallery
      </motion.h2>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-8 flex-wrap gap-y-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
              activeCategory === cat
                ? "bg-purple-600 text-white border-purple-600"
                : "bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-300 border-purple-300 hover:bg-purple-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Image Grid with Lightbox */}
      <PhotoProvider>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {filteredImages.map((img, index) => (
            <motion.div
              key={index}
              className="rounded-lg overflow-hidden shadow-md cursor-pointer"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <PhotoView src={img.src}>
                <img
                  src={img.src}
                  alt={`Event ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </PhotoView>
            </motion.div>
          ))}
        </motion.div>
      </PhotoProvider>
    </div>
  );
}
