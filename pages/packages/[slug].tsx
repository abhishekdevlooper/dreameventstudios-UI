import { GetServerSideProps } from "next";
import Slideshow from "@/components/Slideshow";
import InclusionsList from "@/components/InclusionsList";
import ReviewList from "@/components/ReviewList";
import DetailsPanel from "@/components/DetailsPanel";
import SEO from "@/components/SEO";
import { motion } from "framer-motion";

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
  general_info: string[];
  reviews: Review[];
};

type Props = {
  pkg: Package | null;
};

const PackageDetailPage = ({ pkg }: Props) => {
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Slideshow images={pkg.image_urls} />
        </motion.div>

        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <DetailsPanel {...pkg} />
        </motion.div>

        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
          <InclusionsList inclusions={pkg.inclusions} />
        </motion.div>

        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
          <ReviewList reviews={pkg.reviews} />
        </motion.div>

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.params?.slug;
  try {
    const res = await fetch(`http://localhost:8000/api/packages/${slug}`);
    if (!res.ok) return { props: { pkg: null } };
    const data = await res.json();
    return { props: { pkg: data } };
  } catch (error) {
    console.error("Error fetching package:", error);
    return { props: { pkg: null } };
  }
};
