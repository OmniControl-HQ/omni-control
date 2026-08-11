import React from 'react';
import { motion } from 'framer-motion';

const Studio: React.FC = () => {
  return (
    <section id="studio" className="py-32 px-6 bg-black relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200" 
                alt="Studio" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
            </div>
            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hidden md:flex flex-col justify-center">
              <span className="text-4xl font-serif text-white mb-2">12+</span>
              <span className="text-xs font-mono uppercase tracking-widest text-white/40">Global Awards</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white/40 mb-8">The Studio</h2>
            <p className="text-3xl md:text-5xl font-serif text-white leading-tight mb-8">
              We believe that every pixel should tell a story and every interaction should evoke a feeling.
            </p>
            <p className="text-white/60 text-lg leading-relaxed mb-12">
              Founded in 2020, Aetheric has been at the forefront of digital innovation, working with visionary brands to create experiences that are not just seen, but felt. Our approach combines rigorous strategy with unbridled creativity.
            </p>
            <button className="group flex items-center gap-4 text-white font-bold uppercase tracking-widest text-sm">
              Learn more about us
              <span className="w-12 h-px bg-white/20 group-hover:w-24 transition-all duration-500" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Studio;