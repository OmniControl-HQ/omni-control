'use client'

import React from 'react';
import { motion } from 'framer-motion';

const Studio: React.FC = () => {
  return (
    <section id="how-it-works" className="py-32 px-6 bg-black relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">📱</div>
                <div className="text-6xl">↔️</div>
                <div className="text-8xl mt-4">💻</div>
              </div>
            </div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hidden md:flex flex-col justify-center">
              <span className="text-4xl font-serif text-white mb-2">100%</span>
              <span className="text-xs font-mono uppercase tracking-widest text-white/40">Free & Open Source</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white/40 mb-8">How It Works</h2>
            <p className="text-3xl md:text-5xl font-serif text-white leading-tight mb-8">
              Connect your phone to your PC and control it wirelessly from anywhere in your home.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mb-12">
              OmniControl uses your local WiFi network to establish a secure connection between your devices. No internet required, no data collection, complete privacy. Simply install the desktop app, scan the QR code with your phone, and start controlling.
            </p>
            <a href="https://github.com/OmniControl-HQ/omni-control" className="group flex items-center gap-4 text-white font-bold uppercase tracking-widest text-sm">
              View on GitHub
              <span className="w-12 h-px bg-white/20 group-hover:w-24 transition-all duration-500" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Studio;