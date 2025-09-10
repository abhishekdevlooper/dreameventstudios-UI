'use client';

import dynamic from "next/dynamic";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Dynamically import Carousel to ensure client-side only
const Carousel = dynamic(
  () => import("react-responsive-carousel").then((mod) => mod.Carousel),
  { ssr: false }
);

type SlideshowProps = {
  images?: string[]; // accept optional images prop
};

const Slideshow = ({ images }: SlideshowProps) => {
  const slideImages = images || [
    "/images/event1.jpg",
    "/images/event2.jpg",
    "/images/event3.jpg",
    "/images/event4.jpg",
    "/images/event5.jpg",
    "/images/event6.jpg",
    "/images/event7.jpg",
    "/images/event8.jpg",
  ];

  return (
    <div className="shadow-lg rounded-2xl overflow-hidden ring-1 ring-purple-200 dark:ring-purple-800">
      <Carousel
        {...({} as any)} // bypass strict TS typing
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        swipeable
        emulateTouch
        transitionTime={1000}
        dynamicHeight
        stopOnHover
        useKeyboardArrows
      >
        {slideImages.map((src, idx) => (
          <div key={idx} className="relative">
            <img
              src={src}
              alt={`Event Slide ${idx + 1}`}
              className="w-full h-[auto] sm:h-[400px] md:h-[450px] lg:h-[500px] object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-xl"></div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slideshow;
