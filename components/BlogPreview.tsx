"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const blogs = [
  {
    title: "Top 5 Wedding Trends in 2025",
    snippet: "Discover the latest wedding trends, from eco-friendly décor to live guest experiences.",
    slug: "/blog/wedding-trends-2025",
  },
  {
    title: "How to Plan a Corporate Event That Impresses",
    snippet: "Your step-by-step guide to organizing impactful corporate events for your team and clients.",
    slug: "/blog/corporate-event-planning",
  },
  {
    title: "Creative Themes for Kids’ Birthday Parties",
    snippet: "Explore unique and colorful party ideas that kids will remember for a lifetime.",
    slug: "/blog/kids-party-themes",
  },
];

export default function BlogPreview() {
  return (
    <section className="bg-purple-50 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Animated heading with emoji */}
        <motion.h2
          className="text-3xl font-bold mb-10 text-purple-800 dark:text-purple-300"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="inline-block"
          >
            🎈
          </motion.span>{" "}
          From Our Blog
        </motion.h2>

        {/* Blog cards grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
          {blogs.map((blog, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 border border-purple-100 dark:border-gray-700 rounded-xl shadow-md p-6 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, boxShadow: "0 20px 30px rgba(0,0,0,0.1)" }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300">{blog.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 my-2">{blog.snippet}</p>
              <Link
                href={blog.slug}
                className="text-sm text-purple-600 dark:text-purple-400 hover:underline font-medium"
              >
                Read more →
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Blogs button */}
        <div className="mt-10 flex justify-center">
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05, rotate: [0, 2, -2, 0] }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-600 text-white px-8 py-3 rounded-full shadow-lg font-semibold hover:bg-purple-700"
            >
              View All Blogs
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
}
