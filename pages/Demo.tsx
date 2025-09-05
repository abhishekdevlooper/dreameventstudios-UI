'use client';

import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import WhyChooseUs from "@/components/WhyChooseUs";
import EventTypes from "@/components/EventTypes";
import CallToAction from "@/components/CallToAction";
import Stats from "@/components/Stats";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import BlogPreview from "@/components/BlogPreview";
import { motion } from "framer-motion";
import WhatsAppButton from "@/components/WhatsAppButton";
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-white dark:from-gray-900 dark:to-black text-gray-800 dark:text-white p-6">
      <SEO
        title="Celebrate With Us | Expert Event Planners in India"
        description="Plan unforgettable weddings, parties, and corporate events with our expert team. Book a free consultation today."
        keywords="event planning, wedding planner, birthday party, corporate events, India"
      />

      <Hero />
      <Stats />

      {/* === WHO WE ARE Section with animation === */}
      <motion.section
        className="max-w-5xl mx-auto text-center my-12 px-4 bg-purple-50 dark:bg-gray-800 rounded-2xl shadow-lg p-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4 text-purple-700 dark:text-purple-300">
          Who We Are
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          We are a <strong>full-service event planning company</strong> dedicated to making your special moments truly unforgettable.
          With creativity, precision, and passion, we turn ideas into stunning events — from elegant weddings to lively parties and professional corporate functions.
        </p>
      </motion.section>

      {/* === Why Choose Us & Event Types Card Section === */}
      <section className="bg-gradient-to-r from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 py-12 px-6 rounded-2xl shadow-inner">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 text-left">
          <WhyChooseUs />
          <EventTypes />
        </div>
      </section>

      <TestimonialsCarousel />
      <BlogPreview />
      <CallToAction />
      <WhatsAppButton />
    </main>
  );
}
