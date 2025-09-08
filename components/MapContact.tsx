"use client";

import { MapPin, Phone, Mail } from "lucide-react";
import React from "react";
import { MotionDiv, MotionSection } from "./common/Motion";

export default function MapContact() {
  return (
    <MotionSection
      className="max-w-6xl mx-auto my-20 p-6 md:p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-gray-800 dark:to-gray-900 shadow-xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-700 dark:text-purple-300 mb-10">
        Contact Us
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
        {/* Contact Info */}
        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition break-words">
            <MapPin className="text-purple-600 dark:text-purple-400 w-6 h-6 flex-shrink-0" />
            <p className="text-base md:text-lg font-medium">
              <strong>Our Office:</strong> Aga layout, Ramadevara betta road, near MMU Pharmacy college, Vijayanagara, Ramanagara, Karnataka 562159
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition">
            <Phone className="text-purple-600 dark:text-purple-400 w-6 h-6 flex-shrink-0" />
            <p className="text-base md:text-lg font-medium">
              <strong>Phone:</strong> +91 88924 67800
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow hover:shadow-lg transition">
            <Mail className="text-purple-600 dark:text-purple-400 w-6 h-6 flex-shrink-0" />
            <p className="text-base md:text-lg font-medium">
              <strong>Email:</strong> dreameventstudios@gmail.com
            </p>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
            Available <span className="font-semibold">7 days a week</span> — call us for urgent bookings!
          </p>
        </div>

        {/* Google Map */}
        <MotionDiv
          className="rounded-2xl overflow-hidden shadow-lg border border-purple-200 dark:border-gray-700"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.6194939543234!2d77.29067647790987!3d12.738227955470313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae4fac78287165%3A0xf00a0ed60c708586!2sDream%20event%20studios!5e0!3m2!1sen!2sin!4v1757344600836!5m2!1sen!2sin"
            className="w-full h-64 md:h-80"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
          ></iframe>
        </MotionDiv>
      </div>
    </MotionSection>
  );
}
