"use client";

import React from "react";
import { MotionArticle } from "./common/Motion"; // adjust path

interface Props {
  service: {
    title: string;
    description: string;
    image: string;
  };
  index: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

const ServiceCard = ({ service, index }: Props) => {
  return (
    <MotionArticle
      role="region"
      aria-label={service.title}
      custom={index}
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-900 border border-purple-100 dark:border-gray-700 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all"
    >
      <div className="relative mb-4">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-48 object-cover rounded-xl shadow-sm"
        />
      </div>
      <h3 className="text-2xl font-semibold text-purple-700 dark:text-purple-300 mb-2">
        {service.title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300">{service.description}</p>
    </MotionArticle>
  );
};

export default ServiceCard;
