'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Github } from 'lucide-react';

const downloads = [
  {
    title: "Windows",
    description: "Setup Installer & Portable",
    platform: "desktop",
    size: "~76 MB"
  },
  {
    title: "macOS",
    description: "Apple Silicon & Intel",
    platform: "desktop",
    size: "~85 MB"
  },
  {
    title: "Linux",
    description: "AppImage & DEB",
    platform: "desktop",
    size: "~90 MB"
  },
  {
    title: "Android",
    description: "APK Download",
    platform: "mobile",
    size: "~50 MB"
  }
];

const Work: React.FC = () => {
  return (
    <section id="download" className="py-32 px-6 bg-black relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-24">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white/40 mb-4">Get Started</h2>
            <p className="text-5xl md:text-7xl font-serif text-white">Download</p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-white/40 max-w-xs">Available for all major platforms. Free, open-source, no ads.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {downloads.map((item, index) => (
            <motion.a
              key={item.title}
              href="https://github.com/OmniControl-HQ/omni-control/releases/latest"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-8 bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <Download className="w-20 h-20 mx-auto mb-4 text-white/40 group-hover:text-[#c5ff4a] transition-colors duration-500" />
                  <p className="text-sm font-mono uppercase tracking-widest text-white/60">{item.platform}</p>
                </div>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full uppercase tracking-widest">
                    Download
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-serif text-white mb-2">{item.title}</h3>
                  <p className="text-white/40 uppercase tracking-widest text-xs">{item.description}</p>
                </div>
                <span className="text-white/20 font-mono text-sm">{item.size}</span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 text-center"
        >
          <a
            href="https://github.com/OmniControl-HQ/omni-control"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 px-8 py-4 border border-white/20 rounded-full text-sm font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
          >
            <Github size={20} />
            View on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Work;