'use client'

import React from 'react';
    import { motion } from 'framer-motion';

    const steps = [
      {
        number: "01",
        title: "Discovery",
        description: "We dive deep into your brand, goals, and audience to build a solid foundation."
      },
      {
        number: "02",
        title: "Concept",
        description: "Translating insights into creative directions and visual metaphors."
      },
      {
        number: "03",
        title: "Execution",
        description: "Bringing the vision to life with meticulous attention to detail and performance."
      },
      {
        number: "04",
        title: "Evolution",
        description: "Continuous refinement and scaling to ensure long-term digital success."
      }
    ];

    const Process: React.FC = () => {
      return (
        <section id="process" className="py-32 px-6 bg-black relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white/40 mb-4">Methodology</h2>
                <p className="text-5xl md:text-7xl font-serif text-white">The Process</p>
              </div>
              <p className="text-white/40 max-w-sm text-lg">
                A structured approach to creativity that ensures every project exceeds expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative"
                >
                  <div className="text-6xl font-serif italic text-white/10 mb-6">{step.number}</div>
                  <h3 className="text-2xl font-serif text-white mb-4">{step.title}</h3>
                  <p className="text-white/50 leading-relaxed">{step.description}</p>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-8 -right-6 w-12 h-px bg-white/10" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
    };

    export default Process;