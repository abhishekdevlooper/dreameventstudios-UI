import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({
  title = "Celebrate With Us | Event Planning Services",
  description = "Book unforgettable events with expert wedding, birthday, and corporate event planning.",
  keywords = "event planning, event booking, birthday parties, weddings, corporate functions",
  image = "/images/event1.jpg",
  url = "https://yourdomain.com",
}: SEOProps) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default SEO;
