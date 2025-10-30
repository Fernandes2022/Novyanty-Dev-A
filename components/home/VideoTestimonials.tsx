'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface VideoTestimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  thumbnail: string;
  rating: number;
  quote: string;
}

interface VideoTestimonialsProps {
  testimonials: VideoTestimonial[];
}

export function VideoTestimonials({ testimonials }: VideoTestimonialsProps) {
  // Duplicate for seamless loop
  const duplicated = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="relative overflow-hidden py-8">
      <motion.div
        className="flex gap-6"
        animate={{
          x: [0, -350 * testimonials.length],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        {duplicated.map((testimonial, i) => (
          <motion.div
            key={i}
            className="relative flex-shrink-0 w-80 rounded-2xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-white/10 backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {/* Headshot */}
            <div className="relative h-64 overflow-hidden">
              <img 
                src={testimonial.thumbnail} 
                alt={testimonial.author}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            
            {/* Content */}
            <div className="p-6">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    className={`w-4 h-4 ${idx < Math.floor(testimonial.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`}
                  />
                ))}
                <span className="text-sm text-white/70 ml-2">{testimonial.rating}</span>
              </div>
              
              {/* Quote */}
              <p className="text-white text-sm mb-4 italic">"{testimonial.quote}"</p>
              
              {/* Author */}
              <div>
                <h4 className="text-white font-bold text-base">{testimonial.author}</h4>
                <p className="text-white/70 text-xs">{testimonial.role}, {testimonial.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Gradient edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
}

export default VideoTestimonials;
