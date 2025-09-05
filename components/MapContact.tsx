"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export default function MapContact() {
  return (
    <motion.section
      className="max-w-6xl mx-auto my-20 p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 shadow-xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-700 dark:text-purple-300 mb-10">
        Contact Us
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition">
            <MapPin className="text-purple-600 dark:text-purple-400 w-6 h-6" />
            <p className="text-lg font-medium">
              <strong>Our Office:</strong> MG Road, Bengaluru, India
            </p>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition">
            <Phone className="text-purple-600 dark:text-purple-400 w-6 h-6" />
            <p className="text-lg font-medium">
              <strong>Phone:</strong> +91 98765 43210
            </p>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition">
            <Mail className="text-purple-600 dark:text-purple-400 w-6 h-6" />
            <p className="text-lg font-medium">
              <strong>Email:</strong> hello@yourevents.com
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Available <span className="font-semibold">7 days a week</span> — call us for urgent bookings!
          </p>
        </div>

        {/* Google Map */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg border border-purple-200 dark:border-gray-700"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.080258764214!2d77.5946!3d12.9716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c123456%3A0xabcdef!2sMG%20Road%2C%20Bengaluru!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </motion.div>
      </div>
    </motion.section>
  );
}
