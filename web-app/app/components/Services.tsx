'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Zap, Layers } from 'lucide-react';

const services = [
  {
    title: "Digital Strategy",
    description: "Defining the path to digital excellence through market research and brand positioning.",
    icon: <Zap className="text-accent" size={32} />,
    tags: ["Research", "Planning", "Growth"]
  },
  {
    title: "UI/UX Design",
    description: "Creating intuitive, aesthetically pleasing interfaces that prioritize user experience.",
    icon: <Monitor className="text-accent" size={32} />,
    tags: ["Interface", "Experience", "Prototyping"]
  },
  {
    title: "Development",
    description: "Building robust, scalable digital products using cutting-edge technologies.",
    icon: <Smartphone className="text-accent" size={32} />,
    tags: ["React", "Web3", "E-commerce"]
  },
  {
    title: "Brand Identity",
    description: "Crafting unique visual languages that resonate with your target audience.",
    icon: <Layers className="text-accent" size={32} />,
    tags: ["Logo", "Typography", "Motion"]
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 px-6 bg-black relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white/40 mb-4">Expertise</h2>
          <p className="text-5xl md:text-7xl font-serif text-white">Our Services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-black p-12 group hover:bg-white/5 transition-colors duration-500"
            >
              <div className="mb-8 opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                {service.icon}
              </div>
              <h3 className="text-3xl font-serif text-white mb-6">{service.title}</h3>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-3">
                {service.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 border border-white/10 rounded-full text-white/40">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;