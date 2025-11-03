import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1590650486895-79681b6f26a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NTAxMTZ8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nJTIwb2ZmaWNlfGVufDB8fHx8MTc1Njk1NjQwN3ww&ixlib=rb-4.1.0&q=80&w=1080')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 bg-clip-text text-transparent leading-tight md:leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform Your Business
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Professional solutions that drive growth and deliver exceptional results. Expert services tailored for your success.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.a
              href="#contact"
              className="flex items-center justify-center px-8 py-4 bg-zinc-900 text-white rounded-lg shadow-lg hover:bg-zinc-800 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span className="mr-2">Get Started</span>
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.a
              href="#features"
              className="flex items-center justify-center px-8 py-4 border-2 border-zinc-900 bg-white text-zinc-800 rounded-lg shadow-md hover:border-zinc-800 hover:text-zinc-900 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Learn More</span>
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            {[
              { number: '500+', label: 'Clients Served' },
              { number: '99%', label: 'Satisfaction Rate' },
              { number: '5+', label: 'Years Experience' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center hover:-translate-y-0.5 transition-transform duration-200"
              >
                <div className="text-3xl font-bold text-zinc-900">{stat.number}</div>
                <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-zinc-400" />
      </motion.div>
    </section>
  );
};
