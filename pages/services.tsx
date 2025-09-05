'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';
import SEO from '@/components/SEO';
import ServiceCard from '@/components/ServiceCard';

const Services = () => {
  const services = useMemo(() => [
    {
      title: 'Wedding Planning',
      slug: 'wedding-planning',
      description: 'End-to-end coordination, from venue to vows, ensuring a flawless celebration.',
      image: '/images/services/wedding.jpg',
    },
    {
      title: 'Party Management',
      slug: 'party-management',
      description: 'Whether birthdays or anniversaries, we add spark to your memorable moments.',
      image: '/images/services/party.jpg',
    },
    {
      title: 'Catering',
      slug: 'catering',
      description: 'Custom menus, expert chefs, and delightful presentation for every palate.',
      image: '/images/services/catering.jpg',
    },
    {
      title: 'Venue Booking',
      slug: 'venue-booking',
      description: 'Access to premium venues across the city to suit your occasion perfectly.',
      image: '/images/services/venue.jpg',
    },
  ], []);

  return (
    <div className="bg-gradient-to-tr from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 min-h-screen">
      <SEO
        title="Event Planning Services | Celebrate With Us"
        description="Explore our premium event services including weddings, parties, catering, and venue booking."
        keywords="event services, wedding planning, party management, catering, venue booking"
      />

      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-purple-700 dark:text-purple-300">Our Premium Services</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
          We turn your events into unforgettable memories with personalized services and attention to detail.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard key={index} service={service} index={index} />
        ))}
      </div>

      <div className="text-center mt-16">
        <motion.a
          href="/contact"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 transition inline-block cursor-pointer"
        >
          Book a Free Consultation
        </motion.a>
      </div>
    </div>
  );
};

export default Services;
