'use client';

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Props {
  images: string[];
}

const Slideshow = ({ images }: Props) => (
  <div className="bg-gradient-to-r from-purple-100 via-white to-purple-100 dark:from-purple-900 dark:via-gray-900 dark:to-purple-900 shadow-lg rounded-2xl p-4 ring-1 ring-purple-200 dark:ring-purple-800">
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={4000}
      className="rounded-xl"
    >
      {images.map((img, idx) => (
        <div key={idx} className="relative">
          <img
            src={img}
            alt={`Slide ${idx + 1}`}
            className="h-[400px] w-full object-cover rounded-xl"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 rounded-xl"></div>
        </div>
      ))}
    </Carousel>
  </div>
);

export default Slideshow;
