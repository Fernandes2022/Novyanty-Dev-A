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
            duration: 25,
            ease: "linear",
          },
        }}
        style={{
          willChange: 'transform',
          transform: 'translateZ(0)',
        }}
      >
        {duplicated.map((testimonial, i) => (
          <motion.div
            key={`${testimonial.id}-${i}`}
            className="relative flex-shrink-0 w-80 rounded-2xl overflow-hidden border border-white/30 shadow-2xl"
            whileHover={{ 
              scale: 1.05, 
              y: -5,
              boxShadow: '0 25px 50px -12px rgba(139, 92, 246, 0.5)'
            }}
            transition={{ 
              duration: 0.1,
              ease: [0.4, 0, 0.2, 1]
            }}
            style={{
              willChange: 'transform',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div className="relative h-72 sm:h-80 overflow-hidden bg-black">
              <img 
                src={testimonial.thumbnail} 
                alt={testimonial.author}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
                style={{
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                }}
              />
            </div>
            
            <div className="p-4 sm:p-6 bg-[#1a1d29] border-t border-white/10">
              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star 
                    key={idx} 
                    className={`w-4 h-4 transition-all duration-100 ${
                      idx < Math.floor(testimonial.rating) 
                        ? 'fill-yellow-400 text-yellow-400' 
                        : 'text-gray-400'
                    }`}
                  />
                ))}
                <span className="text-sm text-white/70 ml-2 font-semibold">{testimonial.rating}</span>
              </div>
              
              <p className="text-white text-sm mb-3 italic line-clamp-2 leading-relaxed">
                "{testimonial.quote}"
              </p>
              
              <div>
                <h4 className="text-white font-bold text-base">{testimonial.author}</h4>
                <p className="text-white/60 text-xs">{testimonial.role}, {testimonial.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#1a1d29] via-[#1a1d29]/50 to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1a1d29] via-[#1a1d29]/50 to-transparent pointer-events-none z-10" />
    </div>
  );
}

export default VideoTestimonials;
