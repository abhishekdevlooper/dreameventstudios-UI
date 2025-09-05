'use client';

import SEO from "@/components/SEO";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ritika & Aakash",
    message:
      "From start to finish, the Celebrate With Us team was incredible. They planned our wedding with such care and creativity. Highly recommend them as the best wedding planners in town!",
    image: "/avatars/person1.png",
  },
  {
    name: "Megha Sharma",
    message:
      "My birthday party was a blast thanks to the amazing team! From decor to music, everything was perfect.",
    image: "/avatars/person2.png",
  },
  {
    name: "Arjun Verma",
    message:
      "We hosted a corporate event with them, and they exceeded expectations. Very professional and detail-oriented!",
    image: "/avatars/person3.png",
  },
];

export default function Testimonials() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4">
      <SEO
        title="Testimonials | Happy Clients | Celebrate With Us"
        description="See what our happy clients have to say about our expert wedding and event planning services."
        keywords="event planning reviews, wedding planner feedback, client testimonials"
      />

      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-purple-700 dark:text-purple-400">
          Happy Clients, Memorable Events
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Real words from real celebrations
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 text-left border border-purple-100 dark:border-gray-700 hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4 mb-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-300"
              />
              <h3 className="font-semibold text-lg text-purple-800 dark:text-purple-300">
                {testimonial.name}
              </h3>
            </div>
            <p className="italic text-gray-700 dark:text-gray-300">“{testimonial.message}”</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
