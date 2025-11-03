import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

export const TestimonialsSection: React.FC = () => {
  const title = 'What Our Customers Say';
  const [isHovered, setIsHovered] = useState(false);
  
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO',
      company: 'TechCorp',
      content: 'Exceptional service that delivered results beyond our expectations. Highly professional team.',
      avatar: 'SJ',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Operations Director',
      company: 'GrowthCo',
      content: 'Their strategic approach helped us increase efficiency by 40% within just three months.',
      avatar: 'MC',
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'Founder',
      company: 'InnovateLab',
      content: 'Outstanding consulting services. They truly understand business needs and deliver solutions.',
      avatar: 'ED',
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'Managing Partner',
      company: 'Success Ventures',
      content: 'Working with them was transformative for our business. Professional and results-driven.',
      avatar: 'DW',
    },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <section
      ref={containerRef}
      className="py-20 px-6 bg-white"
    >
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {title}
          </motion.h2>
        </motion.div>

        {/* Marquee Testimonials */}
        <div 
          className="relative overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <motion.div
            className="flex gap-2"
            animate={isHovered ? {} : {
              x: [0, -100 * testimonials.length],
            }}
            transition={isHovered ? {} : {
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            style={{
              width: `${200 * testimonials.length}%`,
            }}
          >
            {/* First set of testimonials */}
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                className="flex-shrink-0 w-80 bg-zinc-50 border border-zinc-200 rounded-lg p-6 mx-3"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-zinc-800 to-zinc-900 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-zinc-900 text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-zinc-600 text-xs">
                      {testimonial.role}
                    </div>
                    <div className="text-zinc-400 text-xs">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                <blockquote className="text-zinc-800 text-sm leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
              </motion.div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {testimonials.map((testimonial) => (
              <motion.div
                key={`duplicate-${testimonial.id}`}
                className="flex-shrink-0 w-80 bg-zinc-50 border border-zinc-200 rounded-lg p-6 mx-3"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-zinc-800 to-zinc-900 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold text-zinc-900 text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-zinc-600 text-xs">
                      {testimonial.role}
                    </div>
                    <div className="text-zinc-400 text-xs">
                      {testimonial.company}
                    </div>
                  </div>
                </div>
                <blockquote className="text-zinc-800 text-sm leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
