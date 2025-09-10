"use client";

import SEO from "@/components/SEO";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import WhyChooseUs from "@/components/WhyChooseUs";
import EventTypes from "@/components/EventTypes";
import GallerySection from "@/components/GallerySection";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import PackagesTeaser from "@/components/PackagesTeaser"; // ✅ New
import Team from "@/components/Team";
import OurPartners from "@/components/OurPartners";
import BlogPreview from "@/components/BlogPreview";
import CallToAction from "@/components/CallToAction";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import InquiryForm from "@/components/InquiryForm"; // ✅ New
import MapContact from "@/components/MapContact";   // ✅ New
import { motion } from "framer-motion";
import AwardsSection from "@/components/AwardSection";
import FAQSection from "@/components/FAQSection";
import dynamic from "next/dynamic";
// import WhoWeAre from "@/components/WhoWeAre";

const WhoWeAre = dynamic(() => import("@/components/WhoWeAre"), {
  ssr: false,
});


export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-100 to-white dark:from-gray-900 dark:to-black text-gray-800 dark:text-white p-6">
      <SEO
        title="Celebrate With Us | Expert Event Planners in India"
        description="Plan unforgettable weddings, parties, and corporate events with our expert team. Book a free consultation today."
        keywords="event planning, wedding planner, birthday party, corporate events, India"
      />

      {/* === Hero + CTA === */}
      <div><Hero /></div>

      {/* === Stats === */}
      <div>
      <Stats />
      </div>
     

      {/* === Who We Are === */}
      <div>
      {/* Other sections/components */}
      <WhoWeAre />
    </div>



      {/* === Why Choose Us & Event Types === */}
      <section className="bg-gradient-to-r from-purple-50 to-white dark:from-gray-800 dark:to-gray-900 py-12 px-6 rounded-2xl shadow-inner">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 text-left">
          <WhyChooseUs />
          <EventTypes />
        </div>
      </section>

      {/* === Event Gallery === */}
      <GallerySection />

      {/* === Testimonials === */}
      <TestimonialsCarousel />

      {/* === Awards & Certifications === */}
     <AwardsSection/>

      {/* === Pricing / Packages Teaser === */}
      <PackagesTeaser />

      {/* === FAQ === */}
      <FAQSection/>

      {/* === Meet Our Team === */}
      <Team />

      {/* === Our Partners === */}
      <OurPartners />

      {/* === Inquiry Form === */}
      {/* <InquiryForm /> */}

      {/* === Blog Preview (Optional for SEO) === */}
      <BlogPreview />

      {/* === Call to Action === */}
      <CallToAction />

      {/* === WhatsApp Floating Button === */}
      <WhatsAppButton />

      {/* === Map & Contact Info in Footer === */}
      <MapContact />
      <Footer />
    </main>
  );
}
