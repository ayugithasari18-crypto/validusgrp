import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const title = 'Frequently Asked Questions';
  const description = 'Common questions about working with our business consulting services.';
  
  const faqs = [
    {
      question: 'How do we get started with your services?',
      answer: 'Contact us for a free consultation where we\'ll discuss your business needs and objectives. We\'ll then propose a customized solution and project timeline.',
    },
    {
      question: 'What industries do you work with?',
      answer: 'We work with businesses across various industries including technology, healthcare, finance, manufacturing, and retail. Our expertise adapts to your specific sector needs.',
    },
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary based on scope and complexity. Strategic consulting projects typically range from 4-12 weeks, while implementation projects may take 3-6 months.',
    },
    {
      question: 'What kind of results can we expect?',
      answer: 'Our clients typically see measurable improvements in efficiency, revenue growth, and operational effectiveness. We provide clear metrics and regular progress reports throughout our engagement.',
    },
    {
      question: 'Do you provide ongoing support?',
      answer: 'Yes! We offer ongoing support and maintenance packages to ensure the continued success of implemented solutions. Our team remains available for consultation and adjustments.',
    },
  ];

  const [openItems, setOpenItems] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true });

  const toggleItem = (index: number) => {
    const itemId = index.toString();
    setOpenItems(prev =>
      prev.includes(itemId) ? prev.filter(item => item !== itemId) : [...prev, itemId]
    );
  };

  return (
    <section
      ref={containerRef}
      className="py-20 px-6 bg-white"
    >
      <div className="container mx-auto max-w-3xl">
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

          <motion.p
            className="text-xl text-zinc-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {description}
          </motion.p>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(index.toString());
            
            return (
              <motion.div
                key={index}
                className="group border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <motion.button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between transition-colors duration-200"
                >
                  <h3 className="text-lg font-semibold text-zinc-900 pr-4">
                    {faq.question}
                  </h3>
                  
                  <motion.div
                    animate={{ 
                      rotate: isOpen ? 180 : 0,
                      backgroundColor: isOpen ? '#27272a' : '#f4f4f5'
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  >
                    <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${
                      isOpen ? 'text-white' : 'text-zinc-600'
                    }`} />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <motion.div 
                        className="px-6 pb-6"
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <p className="text-zinc-800 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
