"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ritika & Aakash",
    message:
      "From start to finish, the Celebrate With Us team was incredible. They planned our wedding with such care and creativity.",
    image: "/avatars/person4.jpg",
  },
  {
    name: "Rajiv Sharma",
    message:
      "The birthday party they organized was unforgettable. Professional, creative, and super easy to work with!",
    image: "/avatars/person5.jpg",
  },
  {
    name: "Sneha & Ramesh",
    message:
      "They transformed our engagement into a magical experience. The decor, flow, and music were spot on!",
    image: "/avatars/person6.jpg",
  },
];

export default function TestimonialsGridEnhanced() {
  const particles = Array.from({ length: 6 }); // 6 floating particles per testimonial

  return (
    <section className="bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4 text-center mb-12">
        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-300">
          What Our Clients Say
        </h2>
      </div>

      <div className="max-w-6xl mx-auto space-y-20 relative">
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            className={`flex flex-col md:flex-row items-center ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } gap-8 relative`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            {/* Floating Particles */}
            {particles.map((_, p) => (
              <motion.div
                key={p}
                className="absolute w-2 h-2 rounded-full bg-purple-400 opacity-50"
                style={{
                  top: `${Math.random() * 80 + 10}%`,
                  left: `${Math.random() * 80 + 10}%`,
                }}
                animate={{
                  y: [0, -15, 0],
                  x: [0, 10, -10, 0],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Client Image */}
            <div className="flex-shrink-0 w-40 h-40 rounded-full overflow-hidden border-4 border-purple-300 dark:border-purple-500 shadow-lg relative z-10">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Testimonial Text */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8 flex-1 relative z-10 overflow-hidden">
              <motion.div
                className="absolute w-32 h-32 bg-purple-200 dark:bg-purple-700 opacity-20 rounded-full -top-10 -right-10"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute w-24 h-24 bg-pink-200 dark:bg-pink-700 opacity-20 rounded-full -bottom-10 -left-10"
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              <p className="text-gray-700 dark:text-gray-300 italic text-lg mb-4">
                “{testimonial.message}”
              </p>
              <p className="text-purple-700 dark:text-purple-300 font-semibold text-right md:text-left">
                — {testimonial.name}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
