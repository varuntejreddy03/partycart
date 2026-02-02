import React, { useState, useEffect } from 'react';

const testimonials = [
  { name: "Pranathi Iyengar", text: "The biryani was outstanding. Easily better than most restaurants. Perfectly cooked.", rating: 5 },
  { name: "Ayesha Fatima", text: "Ordered for a 20-people house party. The packing, taste, and hygiene were on point. Zero stress.", rating: 5 },
  { name: "Kavya Sharma", text: "Packaging was so neat. Every tray clearly labelled. Made serving so simple.", rating: 5 }
];

export const TestimonialsCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-surface/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
      <div className="text-center">
        <div className="flex justify-center mb-2">
          {[...Array(testimonials[current].rating)].map((_, i) => (
            <span key={i} className="material-icons-round text-yellow-400 text-sm">star</span>
          ))}
        </div>
        <p className="text-white text-sm mb-3">"{testimonials[current].text}"</p>
        <p className="text-gray-400 text-xs font-bold">- {testimonials[current].name}</p>
        <div className="flex justify-center gap-1 mt-3">
          {testimonials.map((_, i) => (
            <div key={i} className={`w-2 h-2 rounded-full ${i === current ? 'bg-primary' : 'bg-gray-600'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};