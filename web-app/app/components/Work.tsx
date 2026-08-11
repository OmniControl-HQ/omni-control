'use client'

import React from 'react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: "Lumina Essence",
    category: "Visual Identity",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200",
    year: "2024"
  },
  {
    title: "Obsidian Arch",
    category: "Digital Experience",
    image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&q=80&w=1200",
    year: "2023"
  },
  {
    title: "Velvet Void",
    category: "Motion Design",
    image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200",
    year: "2024"
  }
];

const Work: React.FC = () => {
  return (
    <section id="work" className="py-32 px-6 bg-black relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-24">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-[0.4em] text-white/40 mb-4">Selected Works</h2>
            <p className="text-5xl md:text-7xl font-serif text-white">The Portfolio</p>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-white/40 max-w-xs">A collection of projects where we pushed the boundaries of digital interaction.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className={`group cursor-pointer ${index === 1 ? 'md:mt-32' : ''}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500" />
                <div className="absolute bottom-8 left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <span className="px-4 py-2 bg-white text-black text-xs font-bold rounded-full uppercase tracking-widest">
                    View Project
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-serif text-white mb-2">{project.title}</h3>
                  <p className="text-white/40 uppercase tracking-widest text-xs">{project.category}</p>
                </div>
                <span className="text-white/20 font-mono text-sm">{project.year}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;