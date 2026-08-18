'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Mouse, Keyboard, Music, Shield } from 'lucide-react';

const services = [
  {
    title: "Wireless Mouse",
    description: "Smooth cursor control with multi-touch gestures, scroll, and all click actions from your phone's touchscreen.",
    icon: <Mouse className="text-[#c5ff4a]" size={32} />,
    tags: ["Gestures", "Scroll", "Multi-touch"]
  },
  {
    title: "Full Keyboard",
    description: "Type naturally with text input and 15+ keyboard shortcuts for maximum productivity on the go.",
    icon: <Keyboard className="text-[#c5ff4a]" size={32} />,
    tags: ["Text Input", "Shortcuts", "Fast Typing"]
  },
  {
    title: "Media Remote",
    description: "Control playback, volume, and tracks from your phone while watching movies or listening to music.",
    icon: <Music className="text-[#c5ff4a]" size={32} />,
    tags: ["Play/Pause", "Volume", "Track Control"]
  },
  {
    title: "Secure Connection",
    description: "PIN-protected authentication and local network communication ensure complete privacy and security.",
    icon: <Shield className="text-[#c5ff4a]" size={32} />,
    tags: ["PIN Auth", "Local Only", "Private"]
  }
];

const Services: React.FC = () => {
  return (
    <section id="features" className="py-32 px-6 bg-black relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
          <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white/40 mb-4">Powerful Features</h2>
          <p className="text-5xl md:text-7xl font-serif text-white">Everything You Need</p>
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