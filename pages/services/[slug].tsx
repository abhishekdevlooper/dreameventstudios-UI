import { GetServerSideProps } from "next";
import SEO from "@/components/SEO";

type Service = {
  slug: string;
  title: string;
  description: string;
  image_url: string;
  features: string[];
};

const ServiceDetailPage = ({ service }: { service: Service }) => {
  if (!service) return <div className="text-center py-20 text-red-500">Service not found.</div>;

  return (
    <div className="py-16 px-4 max-w-4xl mx-auto">
      <SEO title={`${service.title} | Service`} description={service.description} />
      <img src={service.image_url} className="w-full h-72 object-cover rounded-xl mb-6" />
      <h1 className="text-3xl font-bold text-purple-700 dark:text-purple-300 mb-4">{service.title}</h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{service.description}</p>

      {service.features?.length > 0 && (
        <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-200">
          {service.features.map((feature, index) => (
            <li key={index}>✨ {feature}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceDetailPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug;
  try {
    const res = await fetch(`http://localhost:8000/api/services/${slug}`);
    if (!res.ok) return { props: { service: null } };
    const data = await res.json();
    return { props: { service: data } };
  } catch (error) {
    return { props: { service: null } };
  }
};
