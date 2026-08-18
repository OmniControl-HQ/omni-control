'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Monitor, Smartphone, Shield, Zap } from 'lucide-react';

const stats = [
  { icon: <Monitor size={40} />, title: "Cross-Platform", description: "Windows, macOS, Linux", detail: "Desktop Support" },
  { icon: <Smartphone size={40} />, title: "Mobile Ready", description: "Android & iOS", detail: "Mobile Apps" },
  { icon: <Shield size={40} />, title: "100% Secure", description: "PIN Protected & Local", detail: "Privacy First" },
  { icon: <Zap size={40} />, title: "Ultra Fast", description: "Real-time Response", detail: "Low Latency" },
];

const Awards: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-black relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center">
          <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white/40 mb-4">Why Choose Us</h2>
          <p className="text-5xl md:text-7xl font-serif text-white">Built for Everyone</p>
        </div>

        <div className="border-t border-white/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between py-10 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-4"
            >
              <div className="flex items-center gap-8 mb-4 md:mb-0">
                <div className="text-[#c5ff4a] opacity-60 group-hover:opacity-100 transition-opacity">
                  {stat.icon}
                </div>
                <h3 className="text-2xl md:text-3xl font-serif text-white group-hover:translate-x-2 transition-transform duration-500">
                  {stat.title}
                </h3>
              </div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-12">
                <span className="text-xs font-mono uppercase tracking-widest text-white/40">{stat.detail}</span>
                <span className="text-sm italic text-white/60">{stat.description}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
