"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

// Types
interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface Package {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: string;
  image_urls: string[];
  popular: boolean;
  category: string;
  general_info: string;
  inclusions: string[];
  reviews: Review[];
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);

  useEffect(() => {
    async function fetchPackages() {
      try {
        const res = await fetch("http://localhost:8000/api/packages", {
          next: { revalidate: 60 }, // cache in Next.js
        });

        if (!res.ok) throw new Error("Backend not available");

        const data = await res.json();
        setPackages(data);
      } catch (err) {
        console.warn("⚠️ Backend not available, loading local data instead.");

        // fallback: load JSON from public/data/packages.json
        const fallbackRes = await fetch("/data/packages.json");
        const fallbackData = await fallbackRes.json();
        setPackages(fallbackData);
      }
    }

    fetchPackages();
  }, []);

  return (
    <div className="bg-gradient-to-tr from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-purple-700 dark:text-purple-300">
          Our Event Packages
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-2xl mx-auto">
          Choose from our curated event packages designed to make your
          celebration effortless and memorable.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {packages.map((pkg) => {
          const averageRating =
            pkg.reviews.length > 0
              ? (
                  pkg.reviews.reduce((sum, r) => sum + r.rating, 0) /
                  pkg.reviews.length
                ).toFixed(1)
              : null;

          return (
            <div
              key={pkg.id}
              className="bg-white dark:bg-gray-900 border border-purple-100 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all overflow-hidden relative"
            >
              {/* Popular Badge */}
              {pkg.popular && (
                <span className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Popular
                </span>
              )}

              {/* Image */}
              <div className="relative group">
                <Image
                  src={pkg.image_urls?.[0] || "/placeholder.jpg"}
                  alt={pkg.name}
                  width={400}
                  height={250}
                  className="w-full h-56 object-cover rounded-t-2xl transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-300">
                  {pkg.name}
                </h2>

                {/* Category Tag */}
                <p className="inline-block text-xs bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-200 font-medium px-2 py-1 rounded mt-1">
                  {pkg.category}
                </p>

                <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm line-clamp-3">
                  {pkg.description}
                </p>

                {/* Price & Rating */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                    ₹ {pkg.price}
                  </p>

                  {averageRating && (
                    <div className="flex items-center gap-1 text-yellow-500 text-sm">
                      <Star size={16} fill="currentColor" stroke="none" />
                      <span>{averageRating}</span>
                    </div>
                  )}
                </div>

                {/* CTA Button */}
                <Link
                  href={`/packages/${pkg.slug}`}
                  className="mt-5 inline-block bg-purple-600 text-white px-4 py-2 rounded-full shadow hover:bg-purple-700 transition"
                >
                  Know More
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
