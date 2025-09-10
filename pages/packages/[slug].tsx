"use client";

import { useMemo } from "react";
import packagesData from "@/public/data/packages.json"; // import local JSON
import Slideshow from "@/components/Slideshow";
import InclusionsList from "@/components/InclusionsList";
import ReviewList from "@/components/ReviewList";
import DetailsPanel from "@/components/DetailsPanel";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

type Review = {
  user: string;
  rating: number;
  comment: string;
};

type Package = {
  name: string;
  slug: string;
  description: string;
  price: string;
  category: string;
  popular: boolean;
  image_urls: string[];
  inclusions: string[];
  general_info: string; 
  reviews: Review[];
};

const PackageDetailPage = () => {
  const params = useParams();
  const slug = params?.slug as string;

  // Find package from local JSON
  const pkg: Package | null = useMemo(() => {
    return packagesData.find((p) => p.slug === slug) || null;
  }, [slug]);

  if (!pkg) {
    return <div className="text-center py-10 text-red-600">Package not found.</div>;
  }

  return (
    <div className="bg-gradient-to-tr from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title={`${pkg.name} | Event Package`}
        description={pkg.description}
        keywords={`${pkg.name}, ${pkg.category}, event package`}
      />

      <div className="max-w-5xl mx-auto space-y-10">
        {/* Slideshow */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Slideshow />
        </motion.div>

        {/* Details */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <DetailsPanel {...pkg} />
        </motion.div>

        {/* Inclusions */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <InclusionsList inclusions={pkg.inclusions} />
        </motion.div>

        {/* Reviews */}
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
          <ReviewList reviews={pkg.reviews} />
        </motion.div>

        {/* Book CTA */}
        <div className="sticky bottom-4 flex justify-center z-40">
          <a
            href="/contact"
            className="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700 transition"
          >
            Book This Package
          </a>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailPage;
