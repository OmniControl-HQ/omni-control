'use client'

import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: "01",
    title: "Download & Install",
    description: "Install the desktop app on your PC and the mobile app on your phone. Both are free."
  },
  {
    number: "02",
    title: "Connect WiFi",
    description: "Make sure both devices are on the same WiFi network for local connection."
  },
  {
    number: "03",
    title: "Scan QR Code",
    description: "Open the desktop app, scan the QR code with your mobile app to pair instantly."
  },
  {
    number: "04",
    title: "Start Controlling",
    description: "Use your phone as a mouse, keyboard, or media remote. It's that simple!"
  }
];

const Process: React.FC = () => {
  return (
    <section id="setup" className="py-32 px-6 bg-black relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white/40 mb-4">Simple Setup</h2>
            <p className="text-5xl md:text-7xl font-serif text-white">Get Started in Minutes</p>
          </div>
          <p className="text-white/40 max-w-sm text-lg">
            No complicated configuration. Just download, connect, and control.
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
