// components/TestimonialsCarousel.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const testimonials = [
  {
    name: "Jane Doe",
    feedback: "Absolutely love how simple and intuitive this platform is!",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "John Smith",
    feedback: "It made collecting anonymous feedback super easy for my team.",
    avatar:
      "https://tse3.mm.bing.net/th/id/OIP.YjJSBQVO5Cy9RBxwNqfj7AHaJ5?pid=Api&P=0&h=180",
  },
  {
    name: "Alex Johnson",
    feedback: "Highly recommend it to anyone looking for honest input.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

export default function TestimonialsCarousel() {
  const sliderRef = useRef(null);
  const [sliderInstanceRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
  });

  // Auto-scroll every 3 seconds
  useEffect(() => {
    if (!slider) return;

    const interval = setInterval(() => {
      slider.current?.next();
    }, 3000);

    return () => clearInterval(interval);
  }, [slider]);

  return (
    <section className="bg-gray-50 py-16 px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Testimonials</h2>
      <div ref={sliderInstanceRef} className="keen-slider max-w-xl mx-auto">
        {testimonials.map((t, i) => (
          <div key={i} className="keen-slider__slide">
            <div className="bg-white p-6 rounded-lg shadow-md border mx-4">
              <img
                src={t.avatar}
                alt={t.name}
                className="mx-auto rounded-full w-16 h-16 mb-4"
              />
              <p className="text-gray-600 italic">“{t.feedback}”</p>
              <h4 className="text-sm mt-4 font-semibold text-gray-800">
                {t.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
